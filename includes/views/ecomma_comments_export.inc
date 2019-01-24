<?php
/**
 * @file
 * This file provides the view to export ecomma comments to xml.
 */

$view = new view();
$view->name = 'ecomma_comments_export';
$view->description = 'Export ecomma comments to xml.';
$view->tag = 'ecomma_comments_export';
$view->base_table = 'node';
$view->human_name = '';
$view->core = 6;
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
/* No results behavior: Global: Text area */
$handler->display->display_options['empty']['area']['id'] = 'area';
$handler->display->display_options['empty']['area']['table'] = 'views';
$handler->display->display_options['empty']['area']['field'] = 'area';
$handler->display->display_options['empty']['area']['empty'] = TRUE;
$handler->display->display_options['empty']['area']['content'] = 'No comments available.';
$handler->display->display_options['empty']['area']['format'] = 'filtered_html';
/* Relationship: Comment: Comments of the node */
$handler->display->display_options['relationships']['cid']['id'] = 'cid';
$handler->display->display_options['relationships']['cid']['table'] = 'node';
$handler->display->display_options['relationships']['cid']['field'] = 'cid';
/* Field: Comment: ID */
$handler->display->display_options['fields']['cid']['id'] = 'cid';
$handler->display->display_options['fields']['cid']['table'] = 'comment';
$handler->display->display_options['fields']['cid']['field'] = 'cid';
$handler->display->display_options['fields']['cid']['relationship'] = 'cid';
$handler->display->display_options['fields']['cid']['alter']['word_boundary'] = FALSE;
$handler->display->display_options['fields']['cid']['alter']['ellipsis'] = FALSE;
$handler->display->display_options['fields']['cid']['link_to_comment'] = FALSE;
/* Field: Comment: Parent CID */
$handler->display->display_options['fields']['pid']['id'] = 'pid';
$handler->display->display_options['fields']['pid']['table'] = 'comment';
$handler->display->display_options['fields']['pid']['field'] = 'pid';
$handler->display->display_options['fields']['pid']['relationship'] = 'cid';
$handler->display->display_options['fields']['pid']['label'] = 'Parent';
/* Field: Comment: Updated date */
$handler->display->display_options['fields']['changed']['id'] = 'changed';
$handler->display->display_options['fields']['changed']['table'] = 'comment';
$handler->display->display_options['fields']['changed']['field'] = 'changed';
$handler->display->display_options['fields']['changed']['relationship'] = 'cid';
$handler->display->display_options['fields']['changed']['date_format'] = 'short';
$handler->display->display_options['fields']['changed']['second_date_format'] = 'long';
/* Field: Comment: Author */
$handler->display->display_options['fields']['name']['id'] = 'name';
$handler->display->display_options['fields']['name']['table'] = 'comment';
$handler->display->display_options['fields']['name']['field'] = 'name';
$handler->display->display_options['fields']['name']['relationship'] = 'cid';
$handler->display->display_options['fields']['name']['link_to_user'] = FALSE;
/* Field: Comment: Comment */
$handler->display->display_options['fields']['comment_body']['id'] = 'comment_body';
$handler->display->display_options['fields']['comment_body']['table'] = 'field_data_comment_body';
$handler->display->display_options['fields']['comment_body']['field'] = 'comment_body';
$handler->display->display_options['fields']['comment_body']['relationship'] = 'cid';
/* Field: Comment: Depth */
$handler->display->display_options['fields']['thread']['id'] = 'thread';
$handler->display->display_options['fields']['thread']['table'] = 'comment';
$handler->display->display_options['fields']['thread']['field'] = 'thread';
$handler->display->display_options['fields']['thread']['relationship'] = 'cid';
$handler->display->display_options['fields']['thread']['alter']['word_boundary'] = FALSE;
$handler->display->display_options['fields']['thread']['alter']['ellipsis'] = FALSE;
/* Contextual filter: Content: Nid */
$handler->display->display_options['arguments']['nid']['id'] = 'nid';
$handler->display->display_options['arguments']['nid']['table'] = 'node';
$handler->display->display_options['arguments']['nid']['field'] = 'nid';
$handler->display->display_options['arguments']['nid']['default_argument_type'] = 'fixed';
$handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';

/* Display: Data export */
$handler = $view->new_display('views_data_export', 'Data export', 'views_data_export_1');
$handler->display->display_options['pager']['type'] = 'none';
$handler->display->display_options['style_plugin'] = 'views_data_export_xml';
$handler->display->display_options['style_options']['provide_file'] = 1;
$handler->display->display_options['style_options']['parent_sort'] = 0;
$handler->display->display_options['style_options']['transform'] = 1;
$handler->display->display_options['style_options']['root_node'] = 'nodes';
$handler->display->display_options['style_options']['item_node'] = 'node';
$handler->display->display_options['path'] = 'ecomma_comments_export';
