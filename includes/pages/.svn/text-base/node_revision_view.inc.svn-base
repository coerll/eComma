<?php

function ecomma_node_revision_view_page_manager_tasks(){

$handler = new stdClass;
$handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
$handler->api_version = 1;
$handler->name = 'node_view_panel_context';
$handler->task = 'node_view';
$handler->subtask = '';
$handler->handler = 'panel_context';
$handler->weight = 0;
$handler->conf = array(
  'title' => 'ecomma node',
  'no_blocks' => 0,
  'pipeline' => 'standard',
  'css_id' => 'ecomma',
  'css' => '',
  'contexts' => array(),
  'relationships' => array(),
  'access' => array(
    'logic' => 'and',
    'plugins' => array(),
  ),
);
$display = new panels_display;
$display->layout = 'flexible:ecomm';
$display->layout_settings = array();
$display->panel_settings = array(
  'style_settings' => array(
    'default' => array(),
    'ecomma_menu_region' => array(),
    'ecomma_tag' => array(),
    'ecomma_help' => array(),
    'ecomma_main' => array(),
    'ecomma_left' => array(),
    'ecomma_comments' => array(),
    'ecomma_footer' => array(),
  ),
  'style' => 'stylizer',
  'ecomma_menu_region' => array(
    'style' => 'stylizer',
  ),
  'ecomma_tag' => array(
    'style' => 'stylizer',
  ),
  'ecomma_help' => array(
    'style' => 'stylizer',
  ),
  'ecomma_main' => array(
    'style' => 'stylizer',
  ),
  'ecomma_left' => array(
    'style' => 'stylizer',
  ),
  'ecomma_comments' => array(
    'style' => 'stylizer',
  ),
  'ecomma_footer' => array(
    'style' => 'stylizer',
  ),
);
$display->cache = array();
$display->title = 'ecomma paragraph';
$display->content = array();
$display->panels = array();
  $pane = new stdClass;
  $pane->pid = 'new-1';
  $pane->panel = 'ecomma_comments';
  $pane->type = 'node_comment_form';
  $pane->subtype = 'node_comment_form';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'anon_links' => 1,
    'context' => 'argument_nid_1',
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => array(),
    'style' => 'stylizer',
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $display->content['new-1'] = $pane;
  $display->panels['ecomma_comments'][0] = 'new-1';
  $pane = new stdClass;
  $pane->pid = 'new-2';
  $pane->panel = 'ecomma_comments';
  $pane->type = 'node_comments';
  $pane->subtype = 'node_comments';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'mode' => '4',
    'order' => '1',
    'comments_per_page' => '50',
    'anchor' => 1,
    'context' => 'argument_nid_1',
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => array(),
    'style' => 'stylizer',
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $display->content['new-2'] = $pane;
  $display->panels['ecomma_comments'][1] = 'new-2';
  $pane = new stdClass;
  $pane->pid = 'new-3';
  $pane->panel = 'ecomma_main';
  $pane->type = 'node_content';
  $pane->subtype = 'node_content';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'links' => 0,
    'page' => 0,
    'no_extras' => 0,
    'override_title' => 0,
    'override_title_text' => '',
    'identifier' => '',
    'link' => 0,
    'leave_node_title' => 0,
    'build_mode' => 'full',
    'context' => 'argument_nid_1',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => array(),
    'style' => 'stylizer',
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $display->content['new-3'] = $pane;
  $display->panels['ecomma_main'][0] = 'new-3';
  $pane = new stdClass;
  $pane->pid = 'new-4';
  $pane->panel = 'ecomma_tag';
  $pane->type = 'block';
  $pane->subtype = 'community_tags-0';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Tag form',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => array(),
    'style' => 'stylizer',
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $display->content['new-4'] = $pane;
  $display->panels['ecomma_tag'][0] = 'new-4';
  $pane = new stdClass;
  $pane->pid = 'new-5';
  $pane->panel = 'ecomma_tag';
  $pane->type = 'block';
  $pane->subtype = 'tagadelic-0';
  $pane->shown = TRUE;
  $pane->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'role',
        'settings' => array(
          'rids' => array(
            0 => 1,
          ),
        ),
        'context' => 'logged-in-user',
        'not' => FALSE,
      ),
    ),
  );
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Tag cloud',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => array(),
    'style' => 'stylizer',
  );
  $pane->css = array(
    'css_id' => 'tags-ecomma-anonym',
    'css_class' => 'tags-ecomma-anonym',
  );
  $pane->extras = array();
  $pane->position = 1;
  $display->content['new-5'] = $pane;
  $display->panels['ecomma_tag'][1] = 'new-5';
$display->hide_title = PANELS_TITLE_FIXED;
$display->title_pane = '0';
$handler->conf['display'] = $display;
}