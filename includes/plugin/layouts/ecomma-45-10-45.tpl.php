<!-- -*-html-helper-*- -->

<script>

	$(function() {
						
		/*if(ec_tag_cnt == 0){
			$('.original-community-tags-form').css('display','none');
		}else{
			$('.original-community-tags-form').css('display','block');
		}
		
		if(comment_cnt == 0){
			$('.comment').css('display','none');
		}*/

		<?php global $base_url; ?>
		$('.pane-ecomma-0').attr('id','pane-ecomma-0');
		$('.pane-ecomma-1').attr('id','pane-ecomma-1');
		$('.pane-ecomma-2').attr('id','pane-ecomma-2');
		$('.pane-ecomma-3').attr('id','pane-ecomma-3');
		$('.pane-node-comments').attr('id','pane-node-comments');
		$('.pane-community-tags-0').attr('id','pane-community-tags-0');
		$('.pane-node-comments').prepend('<input type="button" onclick="javascript:window.location=\'<?php echo $base_url; ?>/ecomma_comments_export/<?php echo arg(1); ?>\'" value="Download comments" />');
		
		$( "#tabs-icons" ).tabs();
		
		//has to be called before var url_current
		$('.ui-tabs-nav a').click(function(){
			if($('#pane-community-tags-0').attr('class').match(/ui-tabs-hide/)){
						$('#pane-ecomma-1').css('display','none');
			}else{
				if($('.ec-hi').length >0){
						$('#pane-ecomma-1').css('display','block');
				}
			}
		});

		var url_current = window.location.href;
		var url_tags_obj = url_current.match(/([^#]*)#(.*)/);
		var url_comm_obj = url_current.match(/([^#]*)#([^-]*)(-\d\d)?/);
		if((url_tags_obj[2] != '' || url_comm_obj[2] != '') && (url_tags_obj[2] != null && url_comm_obj[2] != null)){
			/*if(url_current.match(/([^#]*)#(.*)/)[2] == "tags"){
				$( "#tabs-icons" ).tabs({ selected: 1 });
			}else if(url_current.match(/([^#]*)#([^-]*)(-\d\d)?/)[2] == "comment"){
				$( "#tabs-icons" ).tabs({ selected: 2 });
			}*/
			if(url_tags_obj[2] == "tags"){
				$( "#tabs-icons" ).tabs({ selected: 1 });
			}else if(url_comm_obj[2] == "comment"){
				$( "#tabs-icons" ).tabs({ selected: 2 });
			}		
		}


		
		if($('#pane-community-tags-0').attr('class').match(/ui-tabs-hide/)){
					$('#pane-ecomma-1').css('display','none');
		}else{
			if($('.ec-hi').length >0){
					$('#pane-ecomma-1').css('display','block');
			}
		}

	
		//add number of tags to icon
		/*if($('.original-community-tags-form .cloud a').length > 0){
		if($('.original-community-tags-form .cloud a').id.match(/ec-\d\d\d/)){
			alert($('.original-community-tags-form .cloud a').id.match(/ec-\d\d\d/));
		}
		}*/
			
		/*$('.original-community-tags-form .cloud a').length
		if($('.original-community-tags-form .cloud a').length>1){
			$('#tabs-icons li.tags a').append("<p>"+$('.original-community-tags-form .cloud a').length+" tags</p>");
		}else{
			$('#tabs-icons li.tags a').append("<p>"+$('.original-community-tags-form .cloud a').length+" tag</p>");
		}*/
		
		//add number of comments to icon
		/*if(comment_cnt > 1){
			$('#tabs-icons li.comments a').append("<p>"+$('.original-community-tags-form .cloud a').length+" comments</p>");
		}else{
			$('#tabs-icons li.comments a').append("<p>"+$('.original-community-tags-form .cloud a').length+" comment</p>");
		}*/
		//$('.annotation_count a').append("<p>user<br>list</p>");
		

		
	});
</script>

<div class="panel-display panel-ecomma-45-10-45-stacked clear-block" <?php if (!empty($css_id)) { print "id=\"$css_id\""; } ?>>
  <div class="panel-panel line">
    <div class="panel-panel unit panel-header lastUnit">
      <?php print $content['header']; ?>
    </div>
  </div>

  <div class="panel-panel line">
    <div class="panel-panel unit panel-col-fourtyfive firstUnit">
      <div class="inside">
        <?php print $content['left']; ?>
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
          <?php //if(comment_cnt != 0){ ?>
            <li class="comments_all_cloud"><a href="#pane-ecomma-2" title="comment cloud"></a></li>
          <?php //} ?>
          <?php //if(comment_cnt != 0 && ec_tag_cnt != 0){ ?>
            <li class="annotation_count"><a href="#pane-ecomma-3" title="list of users with annotation count"></a></li>
          <?php //} ?>
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
           <!-- | <br />-->
           <!-- please do not remove this. respect the authors :) -->
           <a href="http://www.coerll.utexas.edu/coerll/" title="COERLL"><span class="coerll_logo"><span class="coerll_name">COERLL</span></span></a>
           <a href="http://www.coerll.utexas.edu/coerll/taxonomy/term/624" title="eComma project"><span class="ecomma_logo"><span class="ecomma_name">eComma</span></span></a> 
           <a href="http://www.utexas.edu"><span class="ut_logo" title="University of Texas at Austin"><span class="ut_name">UT Austin</span></span></a>
         </p>
      </div>
    </div>
  </div>
</div>
