<?php
/**
 * @file
 * This file will list the included variants for the node_view panel page
 */

/**
* Implementation of hook_default_page_manager_handlers().
*/
function ecomma_default_page_manager_handlers() {
  $handlers = array();
  $files = file_scan_directory(drupal_get_path('module', 'ecomma') . '/includes/pages', '.inc');
  foreach ($files as $absolute => $file) {
    require $absolute;
    if (isset($handler)) {
      $handlers[$handler->name] = $handler;
    }
  }

  return $handlers;
}

