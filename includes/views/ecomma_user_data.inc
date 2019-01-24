<?php
/**
 * @file
 * This file provides the view to query and display user annotation data.
 */

$view = new view();
$view->name = 'ecomma_user_data';
$view->description = 'Display eComma annotation data for a user.';
$view->tag = 'ecomma_user_data';
$view->base_table = 'ecomma_range';
$view->human_name = 'ecomma_user_data';
$view->core = 7;
$view->api_version = '3.0';
$view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

/* Display: Defaults */
$handler = $view->new_display('default', 'Defaults', 'default');
$handler->display->display_options['use_more_always'] = FALSE;
$handler->display->display_options['access']['type'] = 'none';
$handler->display->display_options['cache']['type'] = 'none';
$handler->display->display_options['query']['type'] = 'views_query';
$handler->display->display_options['exposed_form']['type'] = 'basic';
$handler->display->display_options['pager']['type'] = 'none';
$handler->display->display_options['style_plugin'] = 'default';
$handler->display->display_options['row_plugin'] = 'fields';
/* Relationship: comment data */
$handler->display->display_options['relationships']['cid']['id'] = 'cid';
$handler->display->display_options['relationships']['cid']['table'] = 'ecomma_range';
$handler->display->display_options['relationships']['cid']['field'] = 'cid';
$handler->display->display_options['relationships']['cid']['ui_name'] = 'comment data';
$handler->display->display_options['relationships']['cid']['label'] = 'comment data';
/* Field: Global: View result counter */
$handler->display->display_options['fields']['counter']['id'] = 'counter';
$handler->display->display_options['fields']['counter']['table'] = 'views';
$handler->display->display_options['fields']['counter']['field'] = 'counter';
$handler->display->display_options['fields']['counter']['label'] = '';
$handler->display->display_options['fields']['counter']['counter_start'] = '1';
/* Field: eComma: rid */
$handler->display->display_options['fields']['rid']['id'] = 'rid';
$handler->display->display_options['fields']['rid']['table'] = 'ecomma_range';
$handler->display->display_options['fields']['rid']['field'] = 'rid';
$handler->display->display_options['fields']['rid']['label'] = '';
/* Field: eComma: nid */
$handler->display->display_options['fields']['nid']['id'] = 'nid';
$handler->display->display_options['fields']['nid']['table'] = 'ecomma_range';
$handler->display->display_options['fields']['nid']['field'] = 'nid';
$handler->display->display_options['fields']['nid']['label'] = '';
/* Field: eComma: uid */
$handler->display->display_options['fields']['uid']['id'] = 'uid';
$handler->display->display_options['fields']['uid']['table'] = 'ecomma_range';
$handler->display->display_options['fields']['uid']['field'] = 'uid';
$handler->display->display_options['fields']['uid']['label'] = '';
/* Field: eComma: tid */
$handler->display->display_options['fields']['tid']['id'] = 'tid';
$handler->display->display_options['fields']['tid']['table'] = 'ecomma_range';
$handler->display->display_options['fields']['tid']['field'] = 'tid';
$handler->display->display_options['fields']['tid']['label'] = '';
/* Field: eComma: cid */
$handler->display->display_options['fields']['cid']['id'] = 'cid';
$handler->display->display_options['fields']['cid']['table'] = 'ecomma_range';
$handler->display->display_options['fields']['cid']['field'] = 'cid';
$handler->display->display_options['fields']['cid']['label'] = '';
/* Field: eComma: beg */
$handler->display->display_options['fields']['beg']['id'] = 'beg';
$handler->display->display_options['fields']['beg']['table'] = 'ecomma_range';
$handler->display->display_options['fields']['beg']['field'] = 'beg';
$handler->display->display_options['fields']['beg']['label'] = '';
/* Field: eComma: end */
$handler->display->display_options['fields']['end']['id'] = 'end';
$handler->display->display_options['fields']['end']['table'] = 'ecomma_range';
$handler->display->display_options['fields']['end']['field'] = 'end';
$handler->display->display_options['fields']['end']['label'] = '';
/* Field: eComma: created */
$handler->display->display_options['fields']['created']['id'] = 'created';
$handler->display->display_options['fields']['created']['table'] = 'ecomma_range';
$handler->display->display_options['fields']['created']['field'] = 'created';
$handler->display->display_options['fields']['created']['label'] = '';
/* Field: Comment: Title */
$handler->display->display_options['fields']['subject']['id'] = 'subject';
$handler->display->display_options['fields']['subject']['table'] = 'comment';
$handler->display->display_options['fields']['subject']['field'] = 'subject';
$handler->display->display_options['fields']['subject']['relationship'] = 'cid';
$handler->display->display_options['fields']['subject']['label'] = '';
$handler->display->display_options['fields']['subject']['element_label_colon'] = FALSE;
/* Contextual filter: eComma: nid */
$handler->display->display_options['arguments']['nid']['id'] = 'nid';
$handler->display->display_options['arguments']['nid']['table'] = 'ecomma_range';
$handler->display->display_options['arguments']['nid']['field'] = 'nid';
$handler->display->display_options['arguments']['nid']['default_argument_type'] = 'fixed';
$handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
/* Contextual filter: eComma: uid */
$handler->display->display_options['arguments']['uid']['id'] = 'uid';
$handler->display->display_options['arguments']['uid']['table'] = 'ecomma_range';
$handler->display->display_options['arguments']['uid']['field'] = 'uid';
$handler->display->display_options['arguments']['uid']['default_action'] = 'empty';
$handler->display->display_options['arguments']['uid']['default_argument_type'] = 'fixed';
$handler->display->display_options['arguments']['uid']['summary']['format'] = 'default_summary';
$handler->display->display_options['arguments']['uid']['break_phrase'] = TRUE;

/* Display: Page */
$handler = $view->new_display('page', 'Page', 'page_1');
$handler->display->display_options['path'] = 'ecomma_user_data';

/* Display: Block */
$handler = $view->new_display('block', 'Block', 'block_1');
