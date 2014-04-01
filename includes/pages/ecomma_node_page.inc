<?php
/**
 * @file
 * This file provides the panel page for the ecomma node_view page
 */

$handler = new stdClass();
$handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
$handler->api_version = 1;
$handler->name = 'node_view_panel_context';
$handler->task = 'node_view';
$handler->subtask = '';
$handler->handler = 'panel_context';
$handler->weight = 0;
$handler->conf = array(
  'title' => 'ecomma',
  'no_blocks' => 0,
  'pipeline' => 'standard',
  'body_classes_to_remove' => '',
  'body_classes_to_add' => '',
  'css_id' => '',
  'css' => '',
  'contexts' => array(),
  'relationships' => array(),
  'access' => array(
    'logic' => 'and',
    'plugins' => array(
      0 => array(
        'name' => 'node_type',
        'settings' => array(
          'type' => array(
            'ecomma' => 'ecomma',
          ),
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
    ),
  ),
);
$display = new panels_display();
$display->layout = 'ecomma_45_10_45';
$display->layout_settings = array();
$display->panel_settings = array(
  'style_settings' => array(
    'default' => NULL,
    'header' => NULL,
    'left' => NULL,
    'middle' => NULL,
    'right' => NULL,
    'footer' => NULL,
  ),
);
$display->cache = array();
$display->title = '';
$display->uuid = '6818de8d-2055-45ee-aa0b-67ef35ca8bd5';
$display->content = array();
$display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-74bd5a4f-bf3a-42f0-813d-e5c4149f2dda';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'ecomma-ecomma_word_cloud';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '74bd5a4f-bf3a-42f0-813d-e5c4149f2dda';
  $display->content['new-74bd5a4f-bf3a-42f0-813d-e5c4149f2dda'] = $pane;
  $display->panels['right'][0] = 'new-74bd5a4f-bf3a-42f0-813d-e5c4149f2dda';
  $pane = new stdClass();
  $pane->pid = 'new-5a61c093-ed23-499a-8374-5f2264bf3e13';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'community_tags-0';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '5a61c093-ed23-499a-8374-5f2264bf3e13';
  $display->content['new-5a61c093-ed23-499a-8374-5f2264bf3e13'] = $pane;
  $display->panels['right'][1] = 'new-5a61c093-ed23-499a-8374-5f2264bf3e13';
  $pane = new stdClass();
  $pane->pid = 'new-aa6ed732-6e12-4ff6-a849-dfd4570a82a4';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'ecomma-ecomma_tag_details';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = 'aa6ed732-6e12-4ff6-a849-dfd4570a82a4';
  $display->content['new-aa6ed732-6e12-4ff6-a849-dfd4570a82a4'] = $pane;
  $display->panels['right'][2] = 'new-aa6ed732-6e12-4ff6-a849-dfd4570a82a4';
  $pane = new stdClass();
  $pane->pid = 'new-ad857d8c-d560-4f54-b7ef-9b6e259057a2';
  $pane->panel = 'right';
  $pane->type = 'node_comment_form';
  $pane->subtype = 'node_comment_form';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'anon_links' => 0,
    'context' => 'argument_entity_id:node_1',
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = 'ad857d8c-d560-4f54-b7ef-9b6e259057a2';
  $display->content['new-ad857d8c-d560-4f54-b7ef-9b6e259057a2'] = $pane;
  $display->panels['right'][3] = 'new-ad857d8c-d560-4f54-b7ef-9b6e259057a2';
  $pane = new stdClass();
  $pane->pid = 'new-f03424ef-47be-49c0-8a4d-16e687516800';
  $pane->panel = 'right';
  $pane->type = 'node_comments';
  $pane->subtype = 'node_comments';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'mode' => '1',
    'comments_per_page' => '300',
    'context' => 'argument_entity_id:node_1',
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = 'f03424ef-47be-49c0-8a4d-16e687516800';
  $display->content['new-f03424ef-47be-49c0-8a4d-16e687516800'] = $pane;
  $display->panels['right'][4] = 'new-f03424ef-47be-49c0-8a4d-16e687516800';
  $pane = new stdClass();
  $pane->pid = 'new-7c242ab3-c052-41fe-b925-73902cdbbfad';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'ecomma-ecomma_comment_cloud';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 5;
  $pane->locks = array();
  $pane->uuid = '7c242ab3-c052-41fe-b925-73902cdbbfad';
  $display->content['new-7c242ab3-c052-41fe-b925-73902cdbbfad'] = $pane;
  $display->panels['right'][5] = 'new-7c242ab3-c052-41fe-b925-73902cdbbfad';
  $pane = new stdClass();
  $pane->pid = 'new-1dfec19f-401d-4c3c-86f5-780fea5d48bb';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'ecomma-ecomma_user_annotation_total';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 6;
  $pane->locks = array();
  $pane->uuid = '1dfec19f-401d-4c3c-86f5-780fea5d48bb';
  $display->content['new-1dfec19f-401d-4c3c-86f5-780fea5d48bb'] = $pane;
  $display->panels['right'][6] = 'new-1dfec19f-401d-4c3c-86f5-780fea5d48bb';
$display->hide_title = PANELS_TITLE_FIXED;
$display->title_pane = '0';
$handler->conf['display'] = $display;
