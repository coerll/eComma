<?php
/**
 * @file
 * This file provides the view to query and display child comments.
 */

$view = new view();
$view->name = 'ecomma_user_child_comments';
$view->description = 'Display child comments.';
$view->tag = 'ecomma_user_child_comments';
$view->base_table = 'comment';
$view->human_name = 'ecomma_user_child_comments';
$view->core = 7;
$view->api_version = '3.0';
$view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

/* Display: Master */
$handler = $view->new_display('default', 'Master', 'default');
$handler->display->display_options['use_more_always'] = FALSE;
$handler->display->display_options['access']['type'] = 'perm';
$handler->display->display_options['access']['perm'] = 'access comments';
$handler->display->display_options['cache']['type'] = 'none';
$handler->display->display_options['query']['type'] = 'views_query';
$handler->display->display_options['exposed_form']['type'] = 'basic';
$handler->display->display_options['pager']['type'] = 'full';
$handler->display->display_options['pager']['options']['items_per_page'] = '0';
$handler->display->display_options['pager']['options']['offset'] = '0';
$handler->display->display_options['pager']['options']['id'] = '0';
$handler->display->display_options['pager']['options']['quantity'] = '9';
$handler->display->display_options['style_plugin'] = 'default';
$handler->display->display_options['row_plugin'] = 'fields';
/* Relationship: Comment: Content */
$handler->display->display_options['relationships']['nid']['id'] = 'nid';
$handler->display->display_options['relationships']['nid']['table'] = 'comment';
$handler->display->display_options['relationships']['nid']['field'] = 'nid';
$handler->display->display_options['relationships']['nid']['required'] = TRUE;
/* Relationship: Comment: Parent comment */
$handler->display->display_options['relationships']['pid']['id'] = 'pid';
$handler->display->display_options['relationships']['pid']['table'] = 'comment';
$handler->display->display_options['relationships']['pid']['field'] = 'pid';
/* Field: Comment: Rendered Comment */
$handler->display->display_options['fields']['rendered_entity']['id'] = 'rendered_entity';
$handler->display->display_options['fields']['rendered_entity']['table'] = 'views_entity_comment';
$handler->display->display_options['fields']['rendered_entity']['field'] = 'rendered_entity';
$handler->display->display_options['fields']['rendered_entity']['link_to_entity'] = 1;
$handler->display->display_options['fields']['rendered_entity']['view_mode'] = 'full';
$handler->display->display_options['fields']['rendered_entity']['bypass_access'] = 0;
/* Field: Comment: Author uid */
$handler->display->display_options['fields']['uid_1']['id'] = 'uid_1';
$handler->display->display_options['fields']['uid_1']['table'] = 'comment';
$handler->display->display_options['fields']['uid_1']['field'] = 'uid';
/* Field: Comment: ID */
$handler->display->display_options['fields']['cid']['id'] = 'cid';
$handler->display->display_options['fields']['cid']['table'] = 'comment';
$handler->display->display_options['fields']['cid']['field'] = 'cid';
/* Field: Comment: Post date */
$handler->display->display_options['fields']['created']['id'] = 'created';
$handler->display->display_options['fields']['created']['table'] = 'comment';
$handler->display->display_options['fields']['created']['field'] = 'created';
$handler->display->display_options['fields']['created']['date_format'] = 'long';
$handler->display->display_options['fields']['created']['second_date_format'] = 'long';
/* Field: Comment: Title */
$handler->display->display_options['fields']['subject']['id'] = 'subject';
$handler->display->display_options['fields']['subject']['table'] = 'comment';
$handler->display->display_options['fields']['subject']['field'] = 'subject';
/* Sort criterion: Comment: Post date */
$handler->display->display_options['sorts']['created']['id'] = 'created';
$handler->display->display_options['sorts']['created']['table'] = 'comment';
$handler->display->display_options['sorts']['created']['field'] = 'created';
$handler->display->display_options['sorts']['created']['order'] = 'DESC';
/* Contextual filter: Content: Nid */
$handler->display->display_options['arguments']['nid']['id'] = 'nid';
$handler->display->display_options['arguments']['nid']['table'] = 'node';
$handler->display->display_options['arguments']['nid']['field'] = 'nid';
$handler->display->display_options['arguments']['nid']['relationship'] = 'nid';
$handler->display->display_options['arguments']['nid']['default_argument_type'] = 'fixed';
$handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
$handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
$handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';
/* Contextual filter: Comment: Author uid */
$handler->display->display_options['arguments']['uid']['id'] = 'uid';
$handler->display->display_options['arguments']['uid']['table'] = 'comment';
$handler->display->display_options['arguments']['uid']['field'] = 'uid';
$handler->display->display_options['arguments']['uid']['default_action'] = 'empty';
$handler->display->display_options['arguments']['uid']['default_argument_type'] = 'fixed';
$handler->display->display_options['arguments']['uid']['summary']['number_of_records'] = '0';
$handler->display->display_options['arguments']['uid']['summary']['format'] = 'default_summary';
$handler->display->display_options['arguments']['uid']['summary_options']['items_per_page'] = '25';
$handler->display->display_options['arguments']['uid']['break_phrase'] = TRUE;
/* Filter criterion: Comment: Approved */
$handler->display->display_options['filters']['status']['id'] = 'status';
$handler->display->display_options['filters']['status']['table'] = 'comment';
$handler->display->display_options['filters']['status']['field'] = 'status';
$handler->display->display_options['filters']['status']['value'] = 1;
$handler->display->display_options['filters']['status']['group'] = 1;
$handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
/* Filter criterion: Content: Published */
$handler->display->display_options['filters']['status_node']['id'] = 'status_node';
$handler->display->display_options['filters']['status_node']['table'] = 'node';
$handler->display->display_options['filters']['status_node']['field'] = 'status';
$handler->display->display_options['filters']['status_node']['relationship'] = 'nid';
$handler->display->display_options['filters']['status_node']['value'] = 1;
$handler->display->display_options['filters']['status_node']['group'] = 1;
$handler->display->display_options['filters']['status_node']['expose']['operator'] = FALSE;
/* Filter criterion: Comment: Nid */
$handler->display->display_options['filters']['nid']['id'] = 'nid';
$handler->display->display_options['filters']['nid']['table'] = 'comment';
$handler->display->display_options['filters']['nid']['field'] = 'nid';
$handler->display->display_options['filters']['nid']['relationship'] = 'pid';
$handler->display->display_options['filters']['nid']['operator'] = 'not empty';
