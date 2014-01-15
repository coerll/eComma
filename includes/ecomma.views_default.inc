<?php
/**
 * @file
 * This file will list the included view files with extension .view
 */

/**
 * Implements hook_views_default_views().
 */
function ecomma_views_default_views() {
  $path = drupal_get_path('module', 'ecomma') . '/includes/views';
  $files = drupal_system_listing('.view$', $path, 'name', 0);
  foreach ($files as $absolute => $file) {
    include_once $absolute;
    $views[$file->name] = $view;
  }
  return $views;
}
