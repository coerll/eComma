<?php
/**
 * @file
 * Renders the output of the list for of annotations for a specific user.
 */
  global $base_url;

  $view_name2 = 'ecomma_user_child_comments';
  $view2 = views_get_view($view_name2);

  if($view2):
    $view2->set_arguments(array(arg(1), arg(2)));
    $view2->execute_display('default');
  endif;

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
    $comment_subject = $user_data->comment_ecomma_range_subject;
    $date = date('d M Y gA', $created);

    if ($cid == 0):
      $term = taxonomy_term_load($tid);
      if(is_object($term)):
        $term_name = $term->name;
      endif;

      $content_array[$created] = '<tr class="ec-note-active"><td class="ec-note-date"><a href="' . $base_url . '/node/' . $nid . '#tags">' . check_plain($term_name) . '</a></td><td>' . check_plain($date) . '</td><td>(tag)</td></tr>';

      $tag_counter++;
    else:

      $content_array[$created] = '<tr class="ec-note-active"><td class="ec-note-date"><a href="' . $base_url . '/node/' . $nid . '#comment-' . $cid . '" class="ec-comment-title">' . check_plain($comment_subject) . '</a></td><td>' . check_plain($date) . '</td><td>(comment)</td></tr>';

      $comment_counter++;
    endif;
  endforeach;

  if ($view2):

    foreach ($view2->result as $user_data2):
      $nid2 = $user_data2->comment_nid;
      $cid2 = $user_data2->cid;
      $comment_subject2 = $user_data2->comment_subject;
      $created2 = $user_data2->comment_created;
      $date2 = date('d M Y gA', $created2);

      $content_array[$created2] = '<tr class="ec-note-active"><td class="ec-note-date"><a href="' . $base_url . '/node/' . $nid2 . '#comment-' . $cid2 . '" class="ec-comment-title">' . check_plain($comment_subject2) . '</a></td><td>' . check_plain($date2) . '</td><td>(comment)</td></tr>';
      $comment_counter++;
    endforeach;
  endif;

  sort($content_array);

  if($comment_counter == 1):
    $comment_label = "comment";
  else:
    $comment_label = "comments";
  endif;

  if($tag_counter == 1):
      $tag_label = "tag";
  else:
    $tag_label = "tags";
  endif;

  print '<div class="white-box">';
  print '<div class="ecomma_breadcrumb"><a href="' . $base_url . '/node/' . arg(1) . '">Back to text</a></div>';
  print '<h3>' . check_plain(ecomma_display_username()) . '</h3>';
  print '<h6>(' . check_plain($comment_counter) . ' ' . check_plain($comment_label) . ', ' . check_plain($tag_counter) . ' ' . check_plain($tag_label) . ')</h6>';
  print '<table class="ec-item-list">';

  foreach ($content_array as $annotation):
    print $annotation;
  endforeach;

  print '</table></div>';

?>