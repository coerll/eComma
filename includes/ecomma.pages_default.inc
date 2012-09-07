<?php
/**
 * Implementation of hook_default_page_manager_pages().
 */
function ecomma_default_page_manager_pages() {
  $files = file_scan_directory(drupal_get_path('module', 'ecomma'). '/includes/pages', '.inc');
  foreach ($files as $absolute => $file) {
    require $absolute;
    if (isset($page)) {
      $pages[$file->name] = $page;
			
    }   
  }
  return $pages;
}