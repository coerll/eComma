<?php 
/**
 * @file
 * Panel template layout for the ecomma module. This layout has three columns.
 * The left column is intended for text in a text field that will be annotated.
 * The tabs to hide/view the different ecomma blocks are in the middle column,
 * and the right column should hold the ecomma blocks.
 */

?>

<div class="panel-display panel-ecomma-45-10-45-stacked clear-block">
  <div class="panel-panel line">
    <div class="panel-panel unit panel-header lastUnit">
      <?php print $content['header'];  ?>
    </div>
  </div>

  <div class="panel-panel line">
    <div class="panel-panel unit panel-col-fourtyfive firstUnit">
      <div class="inside">
        <?php print $content['left'];?>
      </div>
    </div>

    <div class="panel-panel unit panel-col-ten">
      <div class="inside">
          <?php print $content['middle']; ?>
      </div>
    </div>

    <div class="panel-panel panel-col-fourtyfive lastUnit">
      <div class="inside">
        <div id="tabs-icons">
      		<ul>
          <li class="words"><a href="#pane-ecomma-0" title="word cloud"></a></li>
          <li class="tags"><a href="#pane-community-tags-0" title="tag cloud"></a></li>
          <li class="comments"><a href="#pane-node-comments" title="comment thread"></a></li>
            <li class="comments_all_cloud"><a href="#pane-ecomma-2" title="comment cloud"></a></li>
            <li class="annotation_count"><a href="#pane-ecomma-3" title="list of users with annotation count"></a></li>
          </ul>
					<?php print $content['right']; ?>
        </div>
      </div>
    </div>
  </div>

  <div class="panel-panel panel-line">
    <div class="panel-panel unit panel-footer lastUnit" style="margin:0px auto;">
      <?php print $content['footer']; ?>
      <div id="footer" class="copyright">
         <p>

           <a href="http://www.coerll.utexas.edu/coerll/" title="COERLL"><span class="coerll_logo"><span class="coerll_name">COERLL</span></span></a>
           <a href="http://www.coerll.utexas.edu/coerll/taxonomy/term/624" title="eComma project"><span class="ecomma_logo"><span class="ecomma_name">eComma</span></span></a> 
           <a href="http://www.utexas.edu"><span class="ut_logo" title="University of Texas at Austin"><span class="ut_name">UT Austin</span></span></a>
         </p>
      </div>
    </div>
  </div>
</div>
