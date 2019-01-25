/**
 * @file
 * This file provides the ecomma JQuery and JavaScript functions.
 *
 * This JQuery and JavaScript functions detect and capture user text selections and update the database tables through ajax calls.
 * The script also handles the formatting of the highlighted annotated text.
 * Written by COERLL and based on code from Travis Brown <travis.brown@mail.utexas.edu>.
 */

(function ($){
// Global variables.
var ec_tag_list = new Array();
var ec_comment_list = new Array();
var ec_tag_token_list = new Array();
var ec_tag_token_list_hover = new Array();
var ec_tag_name_list = new Array();
var ec_tag_name_list_hover = new Array();
var ec_stanza_beg = 1;
var ec_stanza_end = '';
var comment_list = Array();

  Drupal.behaviors.ecommaBehavior = {

  attach: function(context, settings) {

    var ec_comment_id = 0;
    var ec_tag_cnt = 0;
    var base_path;
    var user_role;
    var main_text;
    var ec_tag_id = 330;
    var start_tag_id = 330;
    var nid;
    var enabled = new Array();
    var beg = null;
    var end = null;
    var beg_id = null;
    var end_id = null;
    var comment_data = '';
    var comment_cnt = $('.comment', context).length;
    var selected_text = '';
    var isTouchSupported = "ontouchend" in document;
    var myDown = "touchstart mousedown";
    var myUp = "touchend mouseup";
    var myDown = "touchstart mousedown keydown";
    var myUp = "touchend mouseup keyup";
	var selectionEndTimeout;
	var word_count = 0;

	base_path = Drupal.settings.basePath;
    user_role = settings.ecomma.user_role;
    if($(".token:last", context).length > 0){
      ec_stanza_end = $(".token:last", context).attr('class').match(/ec-p([\d]+)/i,"")[1];
    }
    var node_count = 0;
    for(node_key in settings.communityTags){
      if(node_count == 0){
        nid = node_key.replace(/n_/g,"");
        node_count++;
      }
    }

    $('#tabs-icons li.tags a', context).append("<p class ='ec_tag_cnt'></p>");
    $('#tabs-icons li.comments a', context).append("<p class ='comment_cnt'></p>");

    $(".token", context).each(function(i){
      if($(this, context).text() != "undefined" && $(this, context).text() != ""){
        main_text += $(this, context).text() + " ";
      }
    });


    $(".ecomma_line", context).each(function(t){
      $(this, context).prepend('<span class ="line_number"><span class ="line_number_symbol" style ="display:none">#---ecomma_line_symbol</span>' + Drupal.t('@line_number', {'@line_number': (t + 1)}) + '</span>');
    });

    $(".line_number", context).each(function(t){
      $(this, context).css('height', $(this, context).parent().height() + 'px');
    });

    // Intercept community tags delete listenener to delete tags from ecomma table.
    document.onclick = deleteListener;
    function deleteListener(e){

      var deletedElement;
      if(e == null){
        // I.E.
        deletedElement = event.srcElement;
      }else{
        // Firefox.
        deletedElement = e.target;
      }

      if(deletedElement){
        if(deletedElement.tagName.toLowerCase() == "li" && deletedElement.getAttribute("key")){
          var tag = deletedElement.innerHTML;
          Drupal.detachBehaviors($(this));
          $.post(base_path + "tag_range_delete/" + tag + "/" + nid, {'from_js': true, 'ecomma_token': settings.ecomma.ecommaToken},
            function(data) {
              location.href = location.href.replace(/#(.*)/,'') + '#tags';
              location.reload();
          });
        }
      }
    }

    // Add selected text to comments through Ajax call.
    $('.comment', context).each(function(i){
      if(base_path){
        var bool_reply = false;
        var loc = location.toString().split("/");
        for(var i = 0; i < loc.length; i++){
          if(loc[i] == "reply"){
            bool_reply = true;
          }
        }

        if($(this, context).parent('.indented', context).length == 0 && !bool_reply){
          var someObj = new Object();
          someObj = $(this);
          var cid = parseInt($(this, context).prev()[0].id.replace(/comment-/,""));
          $.post(base_path + "comment_query/" + cid + "/" + nid, someObj, function(data) {
            var data_array = data.split(" ");
            var beg_range = parseInt(data_array[0]);
            var end_range = parseInt(data_array[1]);

            var comment_text = '';
            for(var t = beg_range; t < end_range; t++){
              comment_text += $('.ec-p' + t).text() + " ";
            }
            if(beg_range && end_range){
              someObj.prepend('<div class ="ec-comment-content">' + Drupal.t('@comment_text', {'@comment_text': comment_text}) + '<input id ="highlight_comment_' + cid + '" class ="highlight_comment_' + cid + ' form-submit" type ="button" value ="highlight" ></div>');
              $('.highlight_comment_' + cid).click(function(){
                ec_rh(beg_range , end_range, 'single');
              });
            }else{
              someObj.addClass("comment_hide");
              comment_cnt--;

            }

            ec_comment_list[ec_comment_id] = {'beg' : beg_range, 'end' : end_range};
            ec_comment_id++;
            $('.comment_cnt', context).text(Drupal.t('@comment_cnt', {'@comment_cnt': comment_cnt}));

            if($('.highlight_all_comments', context).length == 0){
              $('#pane-node-comments', context).prepend('<input id ="highlight_all_comments" class ="highlight_all_comments form-submit comment_off" type ="button" value ="" >');
              $('#highlight_all_comments', context).click(function(){
                var a = 0;
                if($('.comment_off', context).length > 0){
                  for(a in ec_comment_list){
                    ec_rh(ec_comment_list[a]['beg'],ec_comment_list[a]['end'], 'multiple');
                  }
                  $('#highlight_all_comments', context).addClass('comment_off');
                  $('#highlight_all_comments', context).removeClass('comment_on');
                }else{
                  $('#highlight_all_comments', context).addClass('comment_on');
                  $('#highlight_all_comments', context).removeClass('comment_off');
                }
              });
            }

            $('.highlight_all_comments', context).val(Drupal.t("Highlight all (@comment_cnt comments)", {"@comment_cnt": comment_cnt}));
          });
        }
      }
    });

    if(user_role != "anonymous"){
      $('body', context).prepend('<div class ="floating-box"  title ="Tag / Comment input"  />');
      $('body', context).prepend('<div class ="ec-warning-outside-box"  title ="eComma Warning">This text range is outside the annotation text area.<br /><b>Please try again.</b></div>');
      $(".floating-box", context).dialog();
      $(".floating-box", context).dialog('close');
      $('.ec-warning-outside-box', context).dialog();
      $('.ec-warning-outside-box', context).dialog('close');
      $('.floating-box', context).append('<p />');
      $('.floating-box p', context).append('<ul class ="ecomma_tabs" /><br />');
      $('.floating-box p', context).append('<div id ="selection" />');
      $('#community-tags-form', context).wrap('<div class ="original-community-tags-form" />');
      $('.floating-box p', context).append($('#community-tags-form'));
      $('.floating-box #community-tags-form').clone(false).attr('id', 'original-community-tags-form').appendTo('.original-community-tags-form');
      $('.floating-box #community-tags-form').addClass('tab_content');
      $('.original-community-tags-form #edit-tags-wrapper').attr('id','original-edit-tags-wrapper');
      $('.original-community-tags-form #edit-tags').remove();
      $('.original-community-tags-form .form-button').remove();
      $('.floating-box #community-tags-form #edit-cloud').remove();
      $('.floating-box #community-tags-form .form-item-tags label:first').text(Drupal.t('Add tag'));
      $('.floating-box #community-tags-form .form-item-tags .tag-widget ul.inline-tags').hide();

      // Prevent dialog popup from opening for comment editing and reply.
      if(!location.href.match(/\/comment\//)){
        $('.floating-box p', context).append($('.comment-form'));
      }
      $('.floating-box .comment-form label span', context).remove();
      $('.comment-form', context).addClass('tab_content');
      $('.comment-form', context).append('<div id ="comment_thread" />');
      $('.floating-box .ecomma_tabs', context).append('<li class ="active"><a href ="#community-tags-form">' + Drupal.t('Add Tag') + '</a></li><li><a href =".comment-form">' + Drupal.t('Add Comment') + '</a></li>');
      $('.floating-box #selection', context).append('<h3>' + Drupal.t('Your selection') + '</h3>');
      $('.floating-box #selection', context).append('<div class ="ec-warning">' + Drupal.t('eComma couldn\'t understand your selection. A selection should not start or end with a space.<br /><br /><b>Please try again.</b>') + '</div>');
      $('.floating-box #selection', context).append('<p id ="ec-selection-text" class ="ec-selection-text"></p>');
      $('.floating-box #community-tags-form', context).append('<input name ="tag-range-beg" id ="tag-range-beg"  type ="hidden" value ="' + beg_id + '">');
      $('.floating-box #community-tags-form', context).append('<input name ="tag-range-end" id ="tag-range-end"  type ="hidden" value ="' + end_id + '">');
      $('.floating-box #community-tags-form', context).append('<input name ="tag-value" id ="tag-value"  type ="hidden" value ="">');
      $('.comment-form .form-submit', context).before('<input name ="comment-range-beg" id ="comment-range-beg"  type ="hidden" value ="">');
      $('.comment-form .form-submit', context).before('<input name ="comment-range-end" id ="comment-range-end"  type ="hidden" value ="">');

      // Activate first tab.
      $("ul.ecomma_tabs li:first", context).addClass("active").show();
      // Show first tab content.
      $(".tab_content").hide();
      $(".tab_content:first", context).show();

      $("ul.ecomma_tabs li", context).click(function() {
        // Remove any "active" class.
        $("ul.ecomma_tabs li", context).removeClass("active");
        // Add "active" class to selected tab.
        $(this, context).addClass("active");
        if(!$('.ec-warning', context).is(":visible")){
          // Hide all tab content.
          $(".tab_content", context).hide();
          // Find the rel attribute value to identify the active tab + content.
          var activeTab = $(this, context).find("a").attr("href");
          // Fade in the active content.
          $('.floating-box ' + activeTab).fadeIn();
        }
        return false;
      });
    }else{
      $('#community-tags-form', context).wrap('<div class ="original-community-tags-form" />');
    }

    $('.comment-form .form-submit', context).click(function() {
      $('.comment', context).css('display','block');
    });

    $('input.form-tags', context).each(function () {
      var nid = $('input[name = nid]', this.form).val();
      var o = settings.communityTags['n_' + nid];
      var vid = $('input[name = vid]', this.form).val();
      var o = settings.communityTags['n_' + nid]['v_' + vid];
      var sequence = 0;

      // Show the textfield and empty its value.
      var deleteHandler = function () {
        // Remove tag from local list.
        var i = $(this, context).attr('key');
        o.tags.splice(i, 1);
        updateList();

        // Send new tag list.
        $.post(o.url, Drupal.communityTags.serialize({ sequence: ++sequence, tags: o.tags, add: '', token: o.token }), function (data) {
          data = Drupal.parseJson(data);
          if (data.status && sequence == data.sequence) {
            o.tags = data.tags;
            updateList();
          }
        });

        // Clear textfield and focus it.
        textfield.val('').focus();
      };
    });

    // Tag cloud - add mouseevent and create ec_tag_list.
    $('.original-community-tags-form .cloud a', context).each(function(i){
      var someObj = new Object();
      someObj = $(this);
      var tag = decodeEntities($(this, context).text());
	
	  //hide all tags
      someObj.addClass("not-ec");
		
      //hide non-eComma tags in delete tags section
      $('ul.inline-tags li', context).each(function(k){

        if(decodeEntities($(this, context).text()) != someObj.text()){
          $(this, context).addClass("not-ec");
        }
      });

      //check if tags are  eComma tags and then make them visible

      $.post(base_path + "tag_query/" + decodeEntities(tag) + "/" + nid, someObj, function(data) {
        if(data){
          for(var k in data){
            if(data[k].tid != undefined) {
            someObj.addClass("ec-tagged");
            someObj.attr('href', 'javascript:;');
            someObj.attr("id","ec-t" + data[k].tid);
            someObj.attr("rel","tag");
			someObj.text(decodeEntities(someObj.text()));
            someObj.removeClass("not-ec").addClass("ec-tagged");
            $('ul.inline-tags li', context).each(function(k){
              if(decodeEntities($(this, context).text()) == someObj.text()){
                $(this, context).removeClass("not-ec");
              }
            });

            if(data.length){
              someObj.attr("class","tagadelic level" + data.length);
              ec_tag_cnt++;
            }else{
              someObj.attr("class","tagadelic levelundefined");
            }

            someObj.unbind(myDown).bind(myDown, function(e){
              e.preventDefault();

              var tid = someObj.attr('id').replace(/ec-t/g,"");

              if($('.ec-hi', context).length > 0){
                someObj.removeClass(someObj.text());
              }else{
                someObj.addClass(someObj.text());
              }

              if($('.ec-hi').length <= 0){
                $('#pane-ecomma-1').toggle('show');
              }else if($('.ec-hi').length == 1 && someObj.attr('class').match(/ec-hi/)){
                $('#pane-ecomma-1').toggle('hide');
              }

              if($('.ec-hi', context).length > 0){
                someObj.removeClass(someObj.text());
              }else{
                someObj.addClass(someObj.text());
              }

              ec_th(tid);
			  
			  return false;
            });

            for(var j in data){
              ec_tag_list[ec_tag_id] = {'beg' : data[j].beg, 'end' : data[j].end, 'form_id' : data[j].tid, 'form' : data[j].name};
              ec_tag_id++;

              $('.user-data-term' + data[j].tid).each(function(i){
                var class_cul = $(this, context).attr('class').match(/user-data-term([\d]*)/i)[1];
                var id_cul = $(this, context).attr('id');
                var id_cul_array = id_cul.split(" ");
                var current_id;
                for (var t in ec_tag_list){
                  if(ec_tag_list[t].form_id == parseInt(class_cul) && ec_tag_list[t].beg == id_cul_array[1] && ec_tag_list[t].end == id_cul_array[2]){
                    current_id = t;
                    $(this, context).attr('id',id_cul_array[0].replace(/###(.*)/i,current_id));
                  }
                }

                $(this, context).mouseenter(function() {
                  if(current_id != undefined){
                    for (var t in ec_tag_list){
                      if(ec_tag_list[t].form_id == parseInt(class_cul) && ec_tag_list[t].beg == id_cul_array[1] && ec_tag_list[t].end == id_cul_array[2]){
                        ec_ts(current_id,id_cul_array[1],id_cul_array[2]);
                      }
                    }
                  }
                });

                $(this, context).mouseleave(function() {
                  for (var t in ec_tag_list){
                    if(ec_tag_list[t].form_id == parseInt(class_cul) && ec_tag_list[t].beg == id_cul_array[1] && ec_tag_list[t].end == id_cul_array[2]){
                      ec_tu(current_id,id_cul_array[1],id_cul_array[2]);
                    }
                  }
                });
              });
              }
            }//end for loop
        }//end if data

        $('.ec_tag_cnt', context).text(Drupal.t('@ec_tag_cnt', {'@ec_tag_cnt': ec_tag_cnt}));

        if($('.highlight_all_tags', context).length == 0){
          $('#pane-community-tags-0', context).prepend('<input id ="highlight_all_tags" class ="highlight_all_tags form-submit tags_off" type ="button" value ="" >');
          $('#highlight_all_tags', context).click(function(){
            var a = 0;

            if($('.tags_off', context).length > 0){
              for(a in ec_tag_list){
                ec_th_all(ec_tag_list[a]['form_id']);
              }
              $('#highlight_all_tags', context).addClass('tags_off');
              $('#highlight_all_tags', context).removeClass('tags_on');
            }else{
              $('#highlight_all_tags', context).addClass('comment_on');
              $('#highlight_all_tags', context).removeClass('tags_on');
            }

            $('#pane-ecomma-1', context).css('display','block');
          });
        }

        $('.highlight_all_tags', context).val(Drupal.t("Highlight all (@ec_tag_cnt tags)", {"@ec_tag_cnt": ec_tag_cnt}));
      }

      }, 'json');

    });


    $(".node-type-ecomma", context).bind('mouseup touchend', function(e){
    // there is selction?
		if(!window.getSelection().isCollapsed) {
			// find direction of selection
			var sel = window.getSelection();
			var range = document.createRange();
			range.setStart(sel.anchorNode, sel.anchorOffset);
			range.setEnd(sel.focusNode, sel.focusOffset);
			var backwards = range.collapsed;
			range.detach();
			
			var parentEl = sel.getRangeAt(0).commonAncestorContainer;
			var activeEl = document.activeElement;
			if (parentEl.nodeType != 1) {
				parentEl = parentEl.className;
			}
			if(typeof parentEl != "undefined"){
				parentElClass = parentEl.className;
				var match_result = parentElClass.match(/pane-node-field-annotation-text/);
				if(match_result)
				  match_result_flag = match_result[0];
				else
				  match_result_flag = "";
			}
			
			// get selection rects
			var rects = sel.getRangeAt(0).getClientRects();
			var n = rects.length - 1;
			
		}
		 
    });
	


	 // Function triggers annotation dialog on text selection 
    $(".ecomma_line", context).bind(myUp, function(e){
      e.preventDefault();
	  $('.ec-warning-outside-box', context).dialog('close');
      selectionEndTimeout = null;
			  
      $(".line_number_symbol", context).show();
      var text = "";
      var sel   = null;
      var range = null;

      if (window.getSelection){
        sel = window.getSelection();
        text = window.getSelection().toString();
      }else{
        // IE.
        sel = document.selection.createRange();
        text = sel.htmlText;
      }
      $(".line_number_symbol", context).hide();

      var ie = false;
      if (sel.getRangeAt){
        range = sel.getRangeAt(0);
      }else if (document.createRange){
        // Safari.
        range = document.createRange();
        range.setStart(sel.anchorNode, sel.anchorOffset);
        range.setEnd(sel.focusNode, sel.focusOffset);
      }else{
        ie = true;
      }

      if (ie){
        var beg_string = sel.htmlText.substring(sel.htmlText.indexOf('ec-p') + 4);
        var end_string = sel.htmlText.substring(sel.htmlText.lastIndexOf('ec-p') + 4);

        beg_id = parseInt(beg_string.substring(0, beg_string.search(/[^0-9]/)));
        end_id = parseInt(end_string.substring(0, end_string.search(/[^0-9]/))) + 1;

        beg = document.getElementById('ec-p' + beg_id);
        end = document.getElementById('ec-p' + end_id);
      }else{
        beg = range.startContainer;
        end = range.endContainer;

        if(beg.id != ("node-" + nid) && end.id != ("node-" + nid)){
          if (beg.parentNode.tagName == 'div'){
            beg = beg.nextSibling ? beg.nextSibling : beg.previousSibling;
          }else{
            beg = beg.parentNode;
          }

          if (end.parentNode.tagName == 'div'){
            end = end.previousSibling ? end.previousSibling : end.nextSibling;
          }else{
            end = end.parentNode;
          }
		  //element without id/text at beginning and end
		  if(beg.id == "" && end.id == ""){
		    end = end.previousSibling;
			beg = beg.nextSibling;

			if(typeof beg !== "undefined" && beg !== null && typeof end !== "undefined" && end !== null){
			  if(beg.id == "" && end.id != ""){
			    beg = beg.nextSibling;
			  }else if(beg.id != "" && end.id == ""){
			    end = end.nextSibling;
			  }

			  if(beg.id == "" || end.id == "" || typeof beg.id === "undefined" || typeof end.id === "undefined"){
			    beg.id == "";
			    end.id == "";
			  }
			}

		  }else if(beg.id == "" && end.id != ""){
            beg = beg.nextSibling;
		  }else if(beg.id != "" && end.id == ""){
            end = end.nextSibling;
		  }else if(beg.id == "" || end.id == "" || typeof beg.id === "undefined" || typeof end.id === "undefined"){
		      beg.id == "";
		      end.id == "";
		  }
		  
		  if(typeof beg !== "undefined" && beg !== null && typeof end !== "undefined" && end !== null){

		    if(beg.id != "" && end.id != "" && typeof beg.id !== "undefined" && typeof end.id !== "undefined"){
              if (beg.id.substring(0, 4) == 'ec-p'){
                beg_id = parseInt(beg.id.substring(4));
              }
		      //if selection starts accidentally with background div instead of text span
              else if (beg.id.substring(0, 6) == 'ec-bgr'){
                beg_id = parseInt(beg.id.substring(6));
              }
              if (end.id.substring(0, 4) == 'ec-p'){
                end_id = parseInt(end.id.substring(4)) + 1;
              }
		      //if selection ends accidentally with background div instead of text span
              else if (end.id.substring(0, 6) == 'ec-bgr'){
                end_id = parseInt(end.id.substring(6));
              }
		    }else{
		      beg_id = "";
			  end_id = "";
		    }
		  }else{
		    beg_id = "";
		    end_id = "";
		  }
        }
      }

      if (beg_id == null || isNaN(beg_id)){
        beg = document.getElementById('ec-p' + ec_stanza_beg);
        beg_id = ec_stanza_beg;
      }

      if (end_id == null || isNaN(end_id)){
        end = document.getElementById('ec-p' + ec_stanza_end);
        end_id = ec_stanza_end;
      }

      text = text.replace(/#---ecomma_line_symbol([^\d]*)\d(\d)?/g,'');

      var test_array = text.split(" ");

      if(range != "" && text != "" && beg_id != null || end_id != null){
        // Show first tab content.
        if(!$(".ecomma_tabs li.active").length){
          $(".tab_content", context).hide();
          $(".tab_content:first", context).show();
          $('.floating-box .comment-form #comment_thread .comment_wrapper', context).remove();
        }

        if($('#ec-bgr' + beg_id).attr('class') == "comment_token"){
          var someObj = new Object();
          var beg_id_hi;
          for(var i = beg_id; $('#ec-bgr' + i, context).css('display') != "none"; i--){
            beg_id_hi = i;
          }

          $.post(base_path + "comments_active_text/" + beg_id_hi + "/" + nid, someObj,
          function(data) {
            for(var v = beg_id_hi; v < data.end; v++){
              selected_text += $('#ec-p' + v).text() + " ";
            }
            $('#ec-selection-text', context).text(Drupal.t('@selected_text', {'@selected_text': selected_text.substring(9)}));
            $('#comment-range-beg', context).val(beg_id_hi);
            $('#comment-range-end', context).val(data.end);

            comment_data = "";
            for(var i = 0; i < data_meta.length; i++){
              comment_data += "<div class ='ec-comment-item'>" + Drupal.t('@data_name', {'@data_name': data.name}) + "   <span class ='ec-comment-date'>" + Drupal.t('@data_timestamp', {'@data_timestamp': data.timestamp}) + "</span></div>";
              comment_data += "<div class ='comment_text'>" + Drupal.t('@data_comment', {'@data_comment': data.comment}) + "</div>";
            }
          });

          $('.comment_wrapper', context).remove();
          $('.floating-box .comment-form #comment_thread', context).html("<div class ='comment_wrapper'><h2>Previous Comments</h2>" + Drupal.t('@comment_data', {'@comment_data': comment_data}) + "</div>");
          $('.ec-warning', context).hide();
          $('.floating-box', context).show();
          $('.floating-box', context).css('left', $('.floating-box', context).css('left') - 200 + 'px');
        }

        if($('#ec-bgr' + beg_id).attr('class') != "comment_token"){
          if(!isNaN(beg_id) && !isNaN(end_id)
          && beg_id != "" && end_id != ""
          && test_array[test_array.length - 1] != "undefined" && test_array[0] != "undefined"){
            if(end_id-beg_id == 1){
              sel.text = $('#ec-p' + beg_id).text();
              text = $('#ec-p' + beg_id).text();
            }

            // Add tag/comment box to body.
            // Activate first tab.
            $("ul.ecomma_tabs li:first", context).addClass("active").show();
            // Activate first tab.
            $("ul.ecomma_tabs li:last", context).removeClass("active");
            $('.floating-box', context).show();
            $(".floating-box", context).dialog('open');

            if (ie){
              $('#ec-selection-text', context).text(decodeEntities(Drupal.t('@sel_text', {'@sel_text': sel.text})));
            }else{
              $('#ec-selection-text', context).text(decodeEntities(Drupal.t('@text', {'@text': text})));
            }

            $('#ec-selection-text', context).text(decodeEntities(Drupal.t('@text', {'@text': text})));
            $('.floating-box #community-tags-form', context).show();
            $(".floating-box", context).dialog('open');
			if(!$('.floating-box .form-item-tags', context).is(":visible")){
              $('.floating-box .form-item-tags', context).show();
			}
            $('.ec-warning', context).hide();

            $('#tag-range-beg', context).val(beg_id);
            $('#tag-range-end', context).val(end_id);
            $('#comment-range-beg', context).val(beg_id);
            $('#comment-range-end', context).val(end_id);

          }else{
            // Activate first tab.
            $("ul.ecomma_tabs li:first", context).addClass("active").show();
            // Activate first tab.
            $("ul.ecomma_tabs li:last", context).removeClass("active");
			$(".tab_content", context).hide();
			$(".tab_content:first", context).show();
            $('.floating-box', context).show();
            $(".floating-box", context).dialog('open');
            $('#ec-selection-text', context).text("");
            $('.floating-box .form-item-tags', context).hide();
            $(".floating-box", context).dialog('open');
            $('.ec-warning', context).show();
          }
        }
      }
	  
	  if($("ul.ecomma_tabs li:first", context).hasClass("active")) {
        $(".tab_content").hide();
        $(".tab_content:first", context).show();
	  }
	  
	  if($("ul.ecomma_tabs li:last", context).hasClass("active")) {
        $(".tab_content").hide();
        $(".tab_content:last", context).show();
	  }
	  
	  return false;
    });
   //end - Function triggers annotation dialog on text selection 
	
	$(".ui-dialog-titlebar-close", context).click(function() {
      $("ul.ecomma_tabs li:first", context).removeClass("active");
      $("ul.ecomma_tabs li:last", context).removeClass("active");
      $(".tab_content").hide();
      $(".tab_content:first", context).show();
	});

    // Submitting tag input by clicking on Add button through Ajax call.
    $(".floating-box #community-tags-form .form-button", context).click(function() {
      var selection = $("#ec-selection-text", context).text().replace(/\s\s+/g," ").replace(/(\n|\r)/g," ").replace(/<br \/>/g," ").replace(/<br>/g," ").replace(/<\/?[^>]+>/gi, '');

      var tag = $('#tag-value', context).val();
      var beg = $('#tag-range-beg', context).val();
      var end = $('#tag-range-end', context).val();
      $.post(base_path + "tag_range/" + tag + "/" + nid + "/" + beg + "/" + end, {'from_js': true, 'ecomma_token': settings.ecomma.ecommaToken},
      function(data) {
        location.href = location.href.replace(/#(.*)/,'') + '#tags';
        location.reload();
      });
    });

    $(".floating-box .form-tags", context).blur(function() {
      $('#tag-value', context).val($('.tag-widget #edit-tags', context).val());
    });

    // Submitting tag input by hitting return through Ajax call.
    $(".floating-box #community-tags-form .form-tags", context).keypress(function(e) {
      if(e.keyCode == 13) {
        $('#tag-value', context).val($('.tag-widget #edit-tags', context).val());
        var selection = $("#ec-selection-text", context).html().replace(/\s\s+/g," ").replace(/(\n|\r)/g," ").replace(/<br \/>/g," ").replace(/<br>/g," ").replace(/<\/?[^>]+>/gi, '');

        var tag = $('#tag-value', context).val();
        var beg = $('#tag-range-beg', context).val();
        var end = $('#tag-range-end', context).val();

        $.post(base_path + "tag_range/" + escape(tag) + "/" + nid + "/" + beg + "/" + end, {'from_js': true, 'ecomma_token': settings.ecomma.ecommaToken},
        function(data) {
          location.href = location.href.replace(/#(.*)/,'') + '#tags';
          location.reload();
        });
      }
      $('#original-community-tags-form', context).css('display','block');
    });

    $(".word_cloud a", context).each(function(i){
      var class_value = 'ec-f' + (i + 1);
      $(this, context).attr('id', class_value);
      $(this, context).attr('href', 'javascript:;');
      $(this, context).bind(myDown, function(e){
		e.preventDefault();
		ec_fh((i + 1));
		return false;
      });
      var someObj2 = new Object();
      someObj2 = $(this);
      $(".ecomma_line span", context).each(function(t){
        if($(this, context).text().toLowerCase() == someObj2.text()){
          $(this, context).addClass(class_value);
        }
      });
    });

    $('.pane-ecomma-ecomma-tag-details', context).attr('id','pane-ecomma-1');
    $('.pane-ecomma-ecomma-word-cloud', context).attr('id','pane-ecomma-0');
    $('.pane-ecomma-ecomma-comment-cloud', context).attr('id','pane-ecomma-2');
    $('.pane-ecomma-ecomma-user-annotation-total', context).attr('id','pane-ecomma-3');
    $('.pane-node-comments', context).attr('id','pane-node-comments');
    $('.pane-community-tags-0', context).attr('id','pane-community-tags-0');
    $('.pane-node-comments', context).prepend('<input type ="button" class="form-submit comment_export" value ="Download comments" />');
    $('.comment_export').click(function(){
      window.location = base_path + '/ecomma_comments_export/' + nid;
    });
    $("#tabs-icons").tabs();

    // Has to be called before var url_current.
    $('.ui-tabs-nav a').click(function(){
      if($(this).parent().attr('class').match(/tags/)){
        if($('.ec-hi').length > 0){
          $('.pane-ecomma-ecomma-tag-details').css('display','block');
        }
      }else{
        $('.pane-ecomma-ecomma-tag-details').css('display','none');
      }
    });
	
	  //RTL text direction support for comment form field.
	  
	  $("#edit-rtl").click(function() {
	    if($("#edit-rtl").is(':checked')) { 
	      $("#comment-form .form-textarea-wrapper textarea").addClass("rtl_dir");
	    }
	    else{
	      $("#comment-form .form-textarea-wrapper textarea").removeClass("rtl_dir");
	    }
	  });
	

    var url_current = window.location.href;
	if(url_current.match(/([^#]*)#(.*)/)){
		var url_obj = url_current.match(/([^#]*)#(.*)/);
		var hashtag = url_obj[2];
		if(hashtag.match(/([^-]*)-([\d]*)/)){
		  var url_comm_obj = url_obj[1].match(/([^-]*)-([\d]*)/);
		  $("#tabs-icons", context).tabs("select", 2);
		}else{
		  $("#tabs-icons", context).tabs("select", 1);
		}
	}
	
	 $('.ecomma-pane').once('ecomma-pane-processed', function() {

        var element = jQuery(this);
        var url = element.attr('src');

        jQuery.ajax({
          url: url,
          type: 'GET',
          dataType: 'html',
          success: function (response) {
            element.replaceWith(response);
          }
        });
      });

	  
	$('.field-name-comment-body .field-item').each(function(i){
		
		if($(this).text().match(/youtube\-player/)){
			var yt_id = $(this).text().match(/data\-id\=\"([^"]*)/)[1];
			
			$(this).parent().append('<div class="yt_vid" data-id='+yt_id+'><iframe width="300" height="180" src="https://www.youtube.com/embed/'+yt_id+'?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>');
			$(this).text($(this).text().replace(/\<div[^>]*\>[^<]*\<[^>]*\>/g,''));
		}
		
		if($(this).text().match(/vimeo\-player/)){
			var yt_id = $(this).text().match(/data\-id\=\"([^"]*)/)[1];
			
			$(this).parent().append('<div class="yt_vid" data-id='+yt_id+'><iframe src="https://player.vimeo.com/video/'+yt_id+'" width="300" height="180" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>');
			$(this).text($(this).text().replace(/\<div[^>]*\>[^<]*\<[^>]*\>/g,''));
		}
		
		if($(this).text().match(/soundcloud\-player/)){
			var yt_id = $(this).text().match(/data\-id\=\"([^"]*)/)[1];
			
			$(this).parent().append('<iframe width="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/'+yt_id+'&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>');
			$(this).text($(this).text().replace(/\<div[^>]*\>[^<]*\<[^>]*\>/g,''));

		}
		if($(this).text().match(/\<audio/)){console.log("audio");
			var audio_url = $(this).html().match(/audio[^=]*="([^>]*)"/)[1];
			$(this).parent().append('<iframe width="300" height="100" frameborder="no" allow="autoplay" src="'+audio_url+'"></iframe>');
			$(this).parent().append('<audio> <source src="'+audio_url+'" type="audio/mpeg"></audio>');
			$(this).html($(this).html().replace(/audio[^=]*="([^&]*)/g,''));
		}
		
		if($(this).text().match(/\<image/)){
			var img_url = $(this).html().match(/image[^=]*="([^>]*)"/)[1];
			$(this).parent().append('<iframe width="300" height="100" frameborder="no" allow="autoplay" src="'+img_url+'"></iframe>');
			$(this).html($(this).html().replace(/img[^=]*="([^&]*)/g,''));
		}
		
		
	});
	  
	function decodeEntities(encodedString) {
	   var textArea = document.createElement('textarea');
	   textArea.innerHTML = encodedString;
	   return textArea.value;
	}
	  


  }
};


function ec_max(a) {
  var b = 0;
  var c = 0;
  while(c < a.length)
  {
    if (!isNaN(a[c]))
    {
      b = Math.max(b, a[c]);
    }
    c++;
  }
  return b;
}

/* Highlight form. */
function ec_fh(form_id){
  $('#ec-f' + form_id).toggleClass('ec-hi-wcloud');
  $('.ec-f' + form_id).toggleClass('ec-hi-wcloud');
}

/* Highlight tag. */
function ec_th(form_id){
  $('#ec-t' + form_id).toggleClass('ec-hi');
  if ($('#ec-t' + form_id).attr('class').match(/ec-hi/)){
    ec_tag_select(form_id);
  }else{
    ec_tag_unselect(form_id);
  }

    ec_token_color(ec_tag_token_list, ec_tag_name_list, 172, 26, 47);
}

function ec_th_all(form_id){
  if(!$('#ec-t' + form_id).hasClass('ec-hi')){
    $('#ec-t' + form_id).addClass('ec-hi');
	ec_clear_color(ec_tag_token_list, ec_tag_name_list);
    ec_tag_select(form_id);
    ec_token_color(ec_tag_token_list, ec_tag_name_list, 172, 26, 47);
  }
}

/* Highlight range. */
function ec_rh(beg, end, type){
  ec_comment_select(beg, end, type, '#e0edf6');
}

/* Hover/show tag. */
function ec_ts(tag_id, beg, end){
  $('#ec-tag-e' + tag_id).css('background-color', '#ccff99');
  ec_tag_select_hover(tag_id, beg, end);
  ec_tag_token_list_hover[ec_tag_token_list_hover.length - 1] = "hover_green";
  ec_token_color(ec_tag_token_list_hover, ec_tag_name_list_hover, 204, 255, 153);
}

/* Don't hover/show tag. */
function ec_tu(tag_id, beg, end){
  $('#ec-tag-e' + tag_id).css('background-color', '#e3e1d1');
  $('#ec-tag-e' + tag_id).css('background-color', 'transparent');
  ec_token_color(ec_tag_token_list_hover, ec_tag_name_list_hover, 204, 255, 153);
}

function ec_comment_select(beg, end, type, color){
    for (var i = ec_stanza_beg; i < ec_stanza_end; i++){
    token_css_wipe =
    {
      'font-size'        : null,
      'margin'           : null,
      'padding'          : null
    };

    token_bgr_css_wipe =
    {
      'display'          : 'none',
      'top'              : null,
      'margin'           : null,
      'padding'          : null,
      'opacity'          : null,
      'filter'           : null
    };

    if(type == "single"){
        $('#ec-bgr' + i).removeClass("not_FE");
        $('.cloud a').each(function(i){
          $('#ec-bgr' + i).removeClass($(this).text());
        });
        $('#ec-bgr' + i).removeClass('Partner-all');
        $('#ec-p' + i).css(token_css_wipe);
        $('#ec-bgr' + i).css(token_bgr_css_wipe);
        $('#ec-bgr' + i).parent().children('.line_number').css('height', $('#ec-bgr' + i).parent().height() + 'px');
    }

    if (i >= beg && i < end && $('#ec-p' + i).position() != null){
      $('#ec-bgr' + i).addClass("comment_token");

      var max_count = ec_max_comment_token_count();
      var weight = Math.min(7, Math.ceil(comment_list[i] * 8 / max_count));
      if(type == "single"){
        token_css =
          {
            'position'         : 'relative',
            'margin'           : '0px -2px 0px -1px',
            'padding'          : '4px 2px 4px 2px',
            'z-index'          : '100'
          };
      }else{
        token_css =
          {
            'position'         : 'relative',
            'font-size'        : 1 + (weight / 16) + 'em',
            'z-index'          : '100'
          };
      }
      if(type == "single"){
        token_bgr_css =
          {
            'position'         : 'absolute',
            'display'          : 'block',
            'z-index'           : '0',
            'height'           : $('#ec-p' + i).height() + 'px',
            'left'             : Math.round($('#ec-p' + i).position().left) + 'px',
            'top'              : Math.round($('#ec-p' + i).position().top) + 'px',
            'padding'          : '1px 3px 1px 3px',
            'opacity'          : '0.5',
            'filter'           :'alpha(opacity =50)'
          };
      }else{
        token_bgr_css =
          {
            'position'         : 'absolute',
            'display'          : 'block',
            'z-index'          : '0',
            'height'           : $('#ec-p' + i).height() + 'px',
            'padding'          : '1px 3px 1px 3px',
            'opacity'          : weight / 8,
            'filter'           :'alpha(opacity =' + weight * 10 + 5 + ')'
          };
      }
      $('#ec-p' + i).css(token_css);
      $('#ec-bgr' + i).css(token_bgr_css);
      $('#ec-bgr' + i).css('width',($('#ec-p' + i).width()) + 'px');
      $('#ec-bgr' + i).css('top',(Math.round($('#ec-p' + i).position().top)) + 'px');
      $('#ec-bgr' + i).css('left',(Math.round($('#ec-p' + i).position().left)) + 'px');
      $('#ec-bgr' + i).parent().children('.line_number').css('height',$('#ec-bgr' + i).parent().height() + 'px');
    }

  }

  $('.cloud a').each(function(i){
    $(this).removeClass('ec-hi')
  });
  $('#pane-ecomma-1').hide();
  ec_tag_token_list.length = 0;
  ec_tag_name_list.length = 0;
}


function ec_clear_color(token_list, ec_tag_list){
  for (var i = ec_stanza_beg; i < ec_stanza_end; i++)
  {
		remove_token_css =
			{
				'font-size'        : null,
				'margin'           : null,
				'padding'          : null
			};

		remove_token_bgr_css =
			{
				'display'          : 'none',
				'margin'           : null,
				'padding'          : null,
				'opacity'          : null,
				'filter'           : null
			};
			
			$('#ec-p' + i).css(remove_token_css);
			$('#ec-bgr' + i).css(remove_token_bgr_css);
			$('#ec-bgr' + i).removeClass('comment_token');
			$('#ec-bgr' + i).parent().children('.line_number').css('height', $('#ec-bgr' + i).parent().height() + 'px');
	}
}


function ec_token_color(token_list, ec_tag_list, r, g, b){
  var max_count = ec_max_tag_token_count();
  var tag_name = token_list.pop();
  for (var i = ec_stanza_beg; i < ec_stanza_end; i++)
  {
    var weight = 0;
    var token_css;

    if($('.comment_token').length > 0){
      if($('#ec-bgr' + i).attr('class').match(/comment_token/)){
        remove_token_css =
          {
            'font-size'        : null,
            'margin'           : null,
            'padding'          : null
          };

        remove_token_bgr_css =
          {
            'display'          : 'none',
            'margin'           : null,
            'padding'          : null,
            'opacity'          : null,
            'filter'           : null
          };

        $('#ec-p' + i).css(remove_token_css);
        $('#ec-bgr' + i).css(remove_token_bgr_css);
        $('#ec-bgr' + i).removeClass('comment_token');
        $('#ec-bgr' + i).parent().children('.line_number').css('height', $('#ec-bgr' + i).parent().height() + 'px');
      }
    }

    if ((i in ec_tag_list) && (ec_tag_list[i] == tag_name || tag_name != "hover_green")){
      if(tag_name != "Partner1" && tag_name != "Partner2" && tag_name != "Partners" && tag_name != "hover_green" && $('#ec-p' + i).position() != null){
        weight = Math.min(7, Math.ceil(token_list[i] * 30 / max_count));

        token_css =
          {
            'position'        : 'relative',
            'font-size'        : 1 + (weight / 16) + 'em',
            'margin'           : '0px -2px 0px -1px',
            'padding'          : '4px 2px 4px 2px',
            'z-index'           : '100'
          };

        token_bgr_css =
          {
            'position'         : 'absolute',
            'display'          : 'block',
            'z-index'           : '0',
            'left'             : Math.round($('#ec-p' + i).position().left) + 'px',
            'top'              : Math.round($('#ec-p' + i).position().top) + 'px',
            'height'           : $('#ec-p' + i).height() + 'px',
            'padding'          : '1px 3px 1px 3px',
            'opacity'          : ((weight / 16) * token_list[i] / 2.5),
            'filter'           :'alpha(opacity =' + (weight / 16) * token_list[i] / 2.5 + ')'
          };
        }//end if

        if(tag_name != "Partner1" && tag_name != "Partner2" && tag_name != "Partners" && tag_name != "hover_green" && $('#ec-p' + i).position() != null){
          $('#ec-bgr' + i).removeClass("FE");
          $('#ec-bgr' + i).addClass("not_FE");
          if(r != 204 && g != 255 && b != 153){
            $('#ec-p' + i).css(token_css);
            $('#ec-bgr' + i).css(token_bgr_css);
            $('#ec-bgr' + i).css('width',$('#ec-p' + i).width() + 'px');
            $('#ec-bgr' + i).css('left', Math.round($('#ec-p' + i).position().left) + 'px');
          }
        }

        $('#ec-bgr' + i).parent().children('.line_number').css('height',$('#ec-bgr' + i).parent().height() + 'px');

      } //end if

      else if ((i in ec_tag_list) && tag_name == "hover_green"){

        $('#ec-bgr' + i).removeClass("not_FE");
        $('#ec-bgr' + i).addClass("FE");
        $('#ec-p' + i).css('font-size',$('#ec-p' + i).css('font-size'));
        $('#ec-p' + i).css('margin',$('#ec-p' + i).css('margin'));
        $('#ec-p' + i).css('padding',$('#ec-p' + i).css('padding'));
      } //end else if

      else if(ec_tag_list[i] == "empty_"  || token_list[i] == "0"  || tag_name == "wipe" && tag_name != "hover_green")
      {
          token_css =
          {
            'font-size'        : null,
            'margin'           : null,
            'padding'          : null
          };

          token_bgr_css =
          {
            'display'          : 'none',
            'top'              : null,
            'margin'           : null,
            'padding'          : null,
            'opacity'          : null,
            'filter'           : null
          };

          if(tag_name != "Partner1" && tag_name != "Partner2" && tag_name != "Partners"){
            $('#ec-bgr' + i).removeClass("not_FE");
            $('#ec-bgr' + i).removeClass("hover_green");
          }else{
            $('#ec-bgr' + i).removeClass(tag_name);
          }

          $('#ec-bgr' + i).removeClass('Partner-all');
          $('#ec-p' + i).css(token_css);
          $('#ec-bgr' + i).css(token_bgr_css);
      }

  }// End for loop.
}

function ec_tag_select(form_id){
    for (var tag_id in ec_tag_list){
    if (ec_tag_list[tag_id]['form_id'] == form_id){
      var tag_name = ec_tag_list[tag_id]['form'];
      var tag = ec_tag_list[tag_id];
      var beg = parseInt(tag.beg);
      var end = parseInt(tag.end);

      for (var i = beg; i < end; i++){
        if (i in ec_tag_token_list){
          ec_tag_token_list[i]++;
          ec_tag_name_list[i] = tag_name;
        }else{
          ec_tag_token_list[i] = 1;
          ec_tag_name_list[i] = tag_name;
        }
      }
    ec_tag_token_list[ec_tag_token_list.length + 100] = tag_name;
      $(".user-data-term" + (form_id)).show();
    }
  }

 }

function ec_tag_select_all(form_id){
    for (var tag_id in ec_tag_list){
    if (ec_tag_list[tag_id]['form_id'] == form_id){
    var tag_name = ec_tag_list[tag_id]['form'];
      var tag = ec_tag_list[tag_id];
      var beg = parseInt(tag.beg);
      var end = parseInt(tag.end);
      for (var i = beg; i < end; i++){
        if (i in ec_tag_token_list){
          ec_tag_token_list[i]++;
          ec_tag_name_list[i] = tag_name;
        }
        else
        {
          ec_tag_token_list[i] = 1;
          ec_tag_name_list[i] = tag_name;
        }
      }
    }
  }
}

function ec_tag_select_hover(tag_id, beg, end){
    ec_tag_token_list_hover.length = 0;
    ec_tag_name_list_hover.length = 0;
    var tag_name = ec_tag_list[tag_id]['form'];
    // Had to add bizarre hack for hover to work.
    end--;
    end++;
    for (var i = beg; i < end; i++){
        if (i in ec_tag_token_list_hover){
            ec_tag_token_list_hover[i]++;
            ec_tag_name_list_hover[i] = tag_name;
        }
        else{
            ec_tag_token_list_hover[i] = 1;
            ec_tag_name_list_hover[i] = tag_name;
        }
    }
    ec_tag_token_list_hover[ec_tag_token_list_hover.length] = tag_name;
}

function ec_tag_unselect(form_id){
  for (var tag_id in ec_tag_list){
    if (ec_tag_list[tag_id]['form_id'] == form_id){
    var tag_name = ec_tag_list[tag_id]['form'];
      var beg = parseInt(ec_tag_list[tag_id]['beg']);
      var end = parseInt(ec_tag_list[tag_id]['end']);
      for (var i = beg; i < end; i++){
        if (i in ec_tag_token_list){
          ec_tag_token_list[i]--;
          ec_tag_name_list[i] = "empty_";
        }
      }
    ec_tag_token_list[ec_tag_token_list.length] = tag_name;
      $(".user-data-term" + (form_id)).hide();
    }
  }
}

function ec_max_tag_token_count(){
  var token_list = Array();
  for (var tag_id in ec_tag_list){
    var beg = parseInt(ec_tag_list[tag_id].beg);
    var end = parseInt(ec_tag_list[tag_id].end);
    for (var i = beg; i < end; i++){
      if (i in token_list){
        token_list[i]++;
      }else{
        token_list[i] = 1;
      }
    }
  }
  return ec_max(token_list);
}

function ec_max_comment_token_count(){
  for (var ec_comment_id in ec_comment_list){
    var beg = parseInt(ec_comment_list[ec_comment_id].beg);
    var end = parseInt(ec_comment_list[ec_comment_id].end);
    for (var i = beg; i < end; i++){
      if (i in comment_list){
        comment_list[i]++;
      }else{
        comment_list[i] = 1;
      }
    }
  }
  return ec_max(comment_list);
}


})(jQuery);
