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

  $tid_existing = db_select('taxonomy_term_data', 't')
  ->fields('t', array('tid'))
  ->condition('t.name', $tag)
  ->execute()
  ->fetchField();

  if ($tid_existing == '') {
    $query = 'SELECT MAX(t.tid) from {taxonomy_term_data} t';
    $tid = db_query($query)->fetchField() + 1;
  }
  else {
    $tid = $tid_existing;
  }

  $timestamp = strtotime('now');
  $cid = 0;

  $vid = db_select('node', 'n')
  ->fields('n', array('vid'))
  ->condition('n.nid', $nid)
  ->execute()
  ->fetchField();

  db_insert('ecomma_range')
    ->fields(array(
      'rid' => NULL,
      'nid' => $nid,
      'vid' => $vid,
      'uid' => $uid,
      'tid' => $tid,
      'cid' => $cid,
      'beg' => $beg,
      'end' => $end,
      'created' => $timestamp,
    ))->execute();
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
  $tid_existing = db_query("SELECT tid FROM {taxonomy_term_data} WHERE name=:tag", array(":tag" => $tag))->fetchField();
  $record_uid = db_query("SELECT uid FROM {ecomma_range} WHERE  tid = :tid_existing AND nid = :nid", array(":tid_existing" => $tid_existing, ":nid" => $nid))->fetchField();
  if ($uid == $record_uid && isset($_POST['ecomma_token']) && drupal_valid_token($_POST['ecomma_token'])) {
    $num_deleted = db_delete('ecomma_range')
      ->condition('uid', $uid)
      ->condition('tid', $tid_existing)
      ->condition('nid', $nid)
      ->execute();
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

  $tid_existing = db_select('taxonomy_term_data', 'x')
  ->fields('x', array('tid'))
  ->condition('x.name', $tag)
  ->orderBy('tid', 'ASC')
  ->execute()
  ->fetchField();

  $query = db_select('ecomma_range', 'e');
  $query->join('taxonomy_term_data', 't', 'e.tid = t.tid');
  $result = $query->fields('e', array('beg', 'end', 'tid'))
  ->fields('t', array('name'))
  ->condition('e.tid', $tid_existing)
  ->condition('e.nid', $nid)
  ->orderBy('tid', 'ASC')
  ->execute();

  while ($results_all[] = $result->fetchAssoc()) {
  }

  drupal_add_http_header('Content-Type', 'application/json');
  drupal_json_output($results_all);
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
  $query = db_select('ecomma_range', 'e');
  $result = $query->fields('e', array('beg', 'end'))
  ->condition('e.cid', $cid)
  ->condition('e.nid', $nid)
  ->execute()
  ->fetchAssoc();

  $range = $result['beg'] . " " . $result['end'];

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
  $query = db_select('ecomma_range', 'e');
  $query->leftJoin('users', 'u', 'e.uid = u.uid');
  $query->leftJoin('comments', 'c', 'c.cid = e.cid');
  $result = $query->fields('e', array(
    'cid',
    'end',
    'uid',
    'name',
    'timestamp',
    'comment',
   ))
  ->condition('e.beg', $beg)
  ->condition('e.nid', $nid)
  ->execute();

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

  $query = db_select('ecomma_field_enabled', 'f');
  $query->join('node', 'n', 'f.content_type_name = n.type');
  $ecomma_enabled = $query->fields('f', array('ecomma_enabled'))
  ->condition('n.nid', $nid, '=')
  ->execute()
  ->fetchField();

  print $ecomma_enabled;
}

/**
 * @}
 */
