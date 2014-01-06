<?php

/**
 * @file
 * ecomma.ajax.inc
 *
 * Handles the server side Ajax interactions of ecomma.
 *
 * @defgroup ecomma_ajax ecomma server side Ajax interactions.
 * @{
 */

/**
 * Callback for term submission.
 *
 * This function is called after a term is submitted to community tags module
 * function. Updates the ecomma_range table with information about the selected
 * text range in the node view of the ecomma CCK textfield.
 *
 * @param string $tag
 *   The term name gets entered into the new database record.
 * @param int $nid
 *   The node id gets entered into the new database record.
 * @param int $beg
 *   The id number of the first word of the text range gets entered into the new
 *   database record.
 * @param int $end
 *   The id number of the last word of the text range gets entered into the new
 *   database record.
 */
function ecomma_tag_range_function($tag, $nid, $beg, $end) {
  if (empty($_POST["from_js"])) {
    return;
  }

  global $user;
  $uid = $user->uid;

  $tid_existing = taxonomy_get_term_by_name($tag);
  $vid = db_result(db_query("SELECT vid FROM {node} WHERE nid='%d'", $nid));

  if ($vid == "") {
    $result = db_query("SELECT vid FROM {node} WHERE nid='%d'", $nid);
    while ($data = db_fetch_object($result)) {
      $vid = $data->vid;
    }
  }

  if ($tid_existing[0]->tid == "") {
    $tid = db_result(db_query("SELECT MAX(tid) FROM { term_data}")) + 1;
  }
  else {
    $tid = $tid_existing[0]->tid;
  }

  $cid = 0;

  $timestamp = strtotime('now');
  if (isset($_POST['ecomma_token']) && drupal_valid_token($_POST['ecomma_token'])) {
    db_query("INSERT INTO {ecomma_range} (rid, nid, vid, uid, tid, cid, beg, end, created) VALUES (NULL, %d, %d, %d, %d, %d, %d, %d, %d);", $nid, $vid, $uid, $tid, $cid, $beg, $end, $timestamp);
  }
}

/**
 * Callback for term deletion.
 *
 * This function is called after a term is deleted from to community terms.
 * Updates the ecomma_range table with information about the deleted tag term.
 *
 * @param string $tag
 *   The term name of the ecomma_range database table record that needs to be
 *   deleted.
 * @param int $nid
 *   The node id of the ecomma_range database table record that needs to be
 *   deleted.
 */
function ecomma_tag_range_delete_function($tag, $nid) {
  if (empty($_POST["from_js"])) {
    $message = 'eComma tag delete function was not evoked by ajax call';
    ecomma_watchdog($message);
    return;
  }

  global $user;
  $uid = $user->uid;

  // Still to decide: maybe need to delete from Community tags tables?
  $tid_existing = db_result(db_query("SELECT tid FROM { term_data} WHERE name='%s'", $tag));
  $record_uid = db_result(db_query("SELECT uid FROM {ecomma_range} WHERE  tid ='%d' AND nid ='%d'", $tid_existing, $nid));
  if ($uid == $record_uid && isset($_POST['ecomma_token']) && drupal_valid_token($_POST['ecomma_token'])) {
    db_query("DELETE FROM {ecomma_range} WHERE uid ='%d' AND tid ='%d' AND nid ='%d'", $uid, $tid_existing, $nid);
    _community_tags_delete_tag($nid, $tid_existing, $uid);
  }
}


/**
 * Callback to store tag information in JavaScript array.
 *
 * This function is called on page load to save tag info in JS arrays.
 *
 * @param string $tag
 *   The term name of the returned ecomma_range database table records.
 * @param int $nid
 *   The node id of the ecomma_range database table record that needs
 *   to be deleted.
 *
 * drupal_json()
 *   a json array with element 'beg' giving the id number of the first
 *   word of the text range, 'end' giving the id number of the last word
 *   of the text range, 'tid' giving the term id number of the ecomma_range
 *   table record, and 'totals' counting the number of records which are
 *   expected to be returned from the ecomma_range table
 */
function ecomma_tag_query_function($tag, $nid) {
  $tid_existing = db_result(db_query("SELECT tid FROM {term_data} WHERE  name='%s'", $tag));
  $result = db_query("SELECT e.beg, e.end, e.tid, t.name FROM {ecomma_range} e JOIN {term_data} t ON e.tid = t.tid AND e.tid='%d' AND e.nid ='%d' ORDER BY e.tid ASC", $tid_existing, $nid);
  drupal_set_header('Content-Type: application/json');
  while ($row = db_fetch_array($result)) {
    $results[] = $row;
  }
  drupal_json($results);
}

/**
 * Callback to store comment information in JavaScript array.
 *
 * This function is called on page load to save the comment info in JS arrays.
 *
 * @param int $cid
 *   The comment id of the returned ecomma_range database table records.
 * @param int $nid
 *   The node id of the ecomma_range database table record that needs to
 *   be deleted.
 */
function ecomma_comment_query_function($cid, $nid) {
  $range = "";
  $result = db_query("SELECT beg, end FROM {ecomma_range} WHERE cid='%d'AND nid='%d'", $cid, $nid);
  while ($data = db_fetch_object($result)) {
    $range = $data->beg . " " . $data->end;
  }

  print $range;
}

/**
 * Callback for highlighting a comment.
 *
 * This function is called when a comment text is highlighted.
 *
 * @param int $beg
 *   The id number of the first word of the text range that is
 *   related to the comment content to be displayed.
 * @param int $nid
 *   The node id of the ecomma_range database table record that
 *   is related to the comment content to be displayed.
 */
function ecomma_comments_active_text_function($beg, $nid) {
  $result = db_query("SELECT r.cid, r.end, r.uid, u.name, c.timestamp, c.comment FROM {ecomma_range} r LEFT JOIN {users} u ON r.uid = u.uid LEFT JOIN {comments} c ON c.cid = r.cid WHERE r.beg='%d' AND r.nid='%d' AND r.tid='0'", $beg, $nid);
  drupal_json(db_fetch_object($result));
}

/**
 * Callback for textfield ecomma status verification.
 *
 * This function is called to check if ecomma textfield was enabled.
 *
 * @param int $nid
 *   The node id of the ecomma_enabled database table record that checks
 *   if the node contains an ecomma activated/enabled textfield.
 */
function ecomma_enabled_query_function($nid) {
  $content_type = db_result(db_query("SELECT type FROM {node} WHERE nid='%d'", $nid));
  $ecomma_enabled = db_result(db_query("SELECT ecomma_enabled FROM {ecomma_field_enabled} WHERE content_type_name='%s'", $content_type));
  print $ecomma_enabled;
}


/**
 * @}
 */
