<?php
/**
 * @file
 * This file will list the included view files with extension .inc.
 */

/**
 * Implements hook_views_default_views().
 */
function ecomma_views_default_views() {
  $files = file_scan_directory(drupal_get_path('module', 'ecomma') . '/includes/views', '/\.inc/');
  foreach ($files as $absolute => $file) {
    require $absolute;
    if (isset($view)) {
      $views[$file->name] = $view;
    }
  }
  return $views;
}
