<?php
/**
 * @file
 * This file will list the included view files with extension .view
 */

/**
 * Implements hook_default_page_manager_pages().
 */
function ecomma_default_page_manager_pages() {
  $pages = array();
  $files = file_scan_directory(drupal_get_path('module', 'ecomma') . '/includes/pages', '/(.*)\.inc$/');
  foreach($files as $absolute => $file) {
    require $absolute;
    $pages[$handler->name] = $handler;
  }
  return $pages;
}
