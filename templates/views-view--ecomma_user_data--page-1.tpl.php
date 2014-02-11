<?php
/**
 * @file
 * Renders the output of the list for of annotations for a specific user.
 */
  //print_r($view);exit();
  global $base_url;

  $uid = arg(2);
  $user = user_load($uid);
  $tag_counter = 0;
  $comment_counter = 0;
  $content = '';
  foreach($view->result as $key => $user_data):
    if($user_data->ecomma_range_created):
      $created = $user_data->ecomma_range_created;
    else:
      $created = NULL;
    endif;
    $nid = $user_data->ecomma_range_nid;
    $cid = $user_data->ecomma_range_cid;
    $tid = $user_data->ecomma_range_tid;
    //$comment_subject = $user_data['comment'];
    $date = date('d M Y gA', $created);

    if ($cid == 0):
      $term = taxonomy_term_load($tid);
      if(is_object($term)):
        $term_name = $term->name;
      endif;
      $content .= '<tr class="ec-note-active"><td class="ec-note-date">';
      $content .= '<a href="' . $base_url . '/node/' . $nid . '#tags">' . check_plain($term_name) . '</a></td><td>' . $date . '</td><td>(tag)</td>';
      $content .= '</tr>';
      $tag_counter++;
    else:
      $content .= '<tr class="ec-note-active"><td class="ec-note-date">';
      $content .= '<a href="' . $base_url . '/node/' . $nid . '#comment-' . $cid . '" class="ec-comment-title">' . 'subject'. '</a></td><td>' . $date . '</td><td>(comment)</td>';
      $content .= '</tr>';
      $comment_counter++;
    endif;
  endforeach;
  $content .= '</table></div>';

  if($comment_counter > 1):
    $comment_label = "comments";
  else:
    $comment_label = "comment";
  endif;

  if($tag_counter > 1):
    $tag_label = "tags";
  else:
      $tag_label = "tag";
  endif;

  print '<div class="white-box">';
  print '<div class="ecomma_breadcrumb"><a href="' . $base_url . '/node/' . arg(1) . '">Back to text</a></div>';
  print '<h3>' . $user->name . ' (' . $comment_counter . ' ' . $comment_label . ', ' . $tag_counter . ' ' . $tag_label . ')</h3>';
  print '<table class="ec-item-list">';
  print '<tr class="user_data_sorting">';
  print '<td></td>';
  print '<td><a href="' . $base_url . '/ecomma_user_data/' . arg(1) . '/' . arg(2) . '/dt">Sort by date</a></td>';
  print '<td></td>';
  print '</tr>';
  print $content;

?>
