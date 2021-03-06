<?php
/**
 * @file
 * Make ecomma database table and ecomma data visible to views module.
 */

/**
 * Implements hook_views_data().
 */
function ecomma_views_data() {
  // Define the base group of this table. Fields that don't
  // have a group defined will go into this field by default.
  $data['ecomma_range']['table']['group']  = t('eComma');
  $data['ecomma_range']['table']['base'] = array(
    'title' => t('eComma range data'),
    'help' => t('Data from annotation range'),
  );

  $data['ecomma_range']['rid'] = array(
    'title' => t('rid'),
    'help' => t("Range id of the annotated text"),
    'field' => array(
      'handler' => 'views_handler_field_numeric',
    ),
    'argument' => array(
      'handler' => 'views_handler_argument_numeric',
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_numeric',
    ),
    'sort' => array(
      'handler' => 'views_handler_sort',
    ),
  );

  $data['ecomma_range']['nid'] = array(
    'title' => t('nid'),
    'help' => t("Node id in which the annotation was made"),
    'field' => array(
      'handler' => 'views_handler_field_numeric',
    ),
    'argument' => array(
      'handler' => 'views_handler_argument_numeric',
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_numeric',
    ),
    'sort' => array(
      'handler' => 'views_handler_sort',
    ),
  );

  $data['ecomma_range']['vid'] = array(
    'title' => t('vid'),
    'help' => t("Node version id in which the annotation was made"),
    'field' => array(
      'handler' => 'views_handler_field_numeric',
    ),
    'argument' => array(
      'handler' => 'views_handler_argument_numeric',
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_numeric',
    ),
    'sort' => array(
      'handler' => 'views_handler_sort',
    ),
  );

  $data['ecomma_range']['uid'] = array(
    'title' => t('uid'),
    'help' => t("User id by who the annotation was made"),
    'field' => array(
      'handler' => 'views_handler_field_numeric',
    ),
    'argument' => array(
      'handler' => 'views_handler_argument_numeric',
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_numeric',
    ),
    'sort' => array(
      'handler' => 'views_handler_sort',
    ),
  );

  $data['ecomma_range']['tid'] = array(
    'title' => t('tid'),
    'help' => t("Term id of the annotation term"),
    'field' => array(
      'handler' => 'views_handler_field_numeric',
    ),
    'argument' => array(
      'handler' => 'views_handler_argument_numeric',
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_numeric',
    ),
    'sort' => array(
      'handler' => 'views_handler_sort',
    ),
  );

  $data['ecomma_range']['cid'] = array(
    'title' => t('cid'),
    'help' => t("Comment id of the annotated comment"),
    'relationship' => array(
      'base' => 'comment',
      'base field' => 'cid',
      'relationship field' => 'cid',
      'handler' => 'views_handler_relationship',
      'label' => t('responses'),
    ),
    'field' => array(
      'handler' => 'views_handler_field_numeric',
    ),
    'argument' => array(
      'handler' => 'views_handler_argument_numeric',
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_numeric',
    ),
    'sort' => array(
      'handler' => 'views_handler_sort',
    ),
  );

  $data['ecomma_range']['beg'] = array(
    'title' => t('beg'),
    'help' => t("Beginning position of the annotated text"),
    'field' => array(
      'handler' => 'views_handler_field_numeric',
    ),
    'argument' => array(
      'handler' => 'views_handler_argument_numeric',
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_numeric',
    ),
    'sort' => array(
      'handler' => 'views_handler_sort',
    ),
  );

  $data['ecomma_range']['end'] = array(
    'title' => t('end'),
    'help' => t("End position of the annotated text"),
    'field' => array(
      'handler' => 'views_handler_field_numeric',
    ),
    'argument' => array(
      'handler' => 'views_handler_argument_numeric',
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_numeric',
    ),
    'sort' => array(
      'handler' => 'views_handler_sort',
    ),
  );

  $data['ecomma_range']['created'] = array(
    'title' => t('created'),
    'help' => t("The timestamp of the creation time and date of the annotation"),
    'field' => array(
      'handler' => 'views_handler_field',
      'click sortable' => TRUE,
    ),
    'argument' => array(
      'handler' => 'views_handler_argument_string',
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_string',
    ),
    'sort' => array(
      'handler' => 'views_handler_sort',
    ),
  );

  return $data;
}
