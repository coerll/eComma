/**
 * This file provides the ecomma JQuery and JavaScript functions.
 *
 * @author COERLL with the help of Travis Brown <travis.brown@mail.utexas.edu>
 * @license http://www.gnu.org/licenses/agpl-3.0.html GNU Affero GPLv3
 * @version 1.0
 * @package ecomma
 * @subpackage js
 */
 
//Global variables
var ec_tag_list = new Array();
var ec_comment_list = new Array();
var ec_tag_token_list = new Array();
var ec_tag_token_list_hover = new Array();
var ec_tag_name_list = new Array();
var ec_tag_name_list_hover = new Array();
var ec_stanza_beg = 1;
var ec_stanza_end = '';
var ec_tag_cnt = 0;
//var ec_max_tag_token_count = '';
var base_url;
var user_role;
var main_text;
var ec_tag_id = 330;
var start_tag_id = 330;
var ec_comment_id = 0;
var nid;
var enabled = new Array();
var beg    = null;
var end    = null;
var beg_id = null;
var end_id = null;
var comment_list = Array();
var comment_data = '';
var comment_cnt = 0;
var selected_text= '';

//var current_font_size;




$(document).ready(function() {
//Drupal.behaviors.ecomma_behavior = function (context) {
//set global variables	
		base_url = Drupal.settings.ecomma.base_url_var;
		user_role = Drupal.settings.ecomma.user_role;
		if($(".token:last").length>0){
			ec_stanza_end = $(".token:last").attr('class').match(/ec-p([\d]+)/i,"")[1];
		}
		//ec_max_tag_token_count = ec_max_tag_token_count(ec_tag_list) -0;
		var node_count = 0;
		for(node_key in Drupal.settings.communityTags){
			if(node_count==0){
				nid = node_key.replace(/n_/g,"");
				node_count++;
			}
		}		
		
		$('#tabs-icons li.tags a').append("<p class='ec_tag_cnt'></p>");
		$('#tabs-icons li.comments a').append("<p class='comment_cnt'></p>");

		
		//main text variable
		$(".token").each(function(i){	
			if($(this).text()!= "undefined" && $(this).text()!= ""){
				main_text += $(this).text()+" ";
			}
		});	
		
		$(".ecomma_line").each(function(t){
			$(this).prepend('<span class="line_number"><span class="line_number_symbol" style="display:none">#---ecomma_line_symbol</span>'+(t+1)+'</span>');
		});
		
		
		$(".line_number").each(function(t){
			$(this).css('height', $(this).parent().height() +'px' );
		});
		
		
		
		
		
		//intercept community tags delete listenener to delete tags from ecomma table
		document.onclick = deleteListener;
		function deleteListener(e){
			
			var deletedElement;
			if(e==null){
			// I.E.
				deletedElement = event.srcElement;
			}else{
				// Firefox
				deletedElement = e.target;
			}
			
			if(deletedElement){
				if(deletedElement.tagName.toLowerCase()=="li" && deletedElement.getAttribute("key")){// && deletedElement.className=="hover"
					var tag = deletedElement.innerHTML;
					$.post(base_url+"/tag_range_delete/"+ tag +"/"+ nid, { },
						 function(data) {
								//location.reload();	
								location.href=location.href.replace(/#(.*)/,'')+'#tags';	
								location.reload();	
					});

				}
				//updateList();
			}
		}	



		//add selection to comments
		$('.comment').each(function(i){
			if(base_url){													 
					 var bool_reply=false; 
					 var loc=location.toString().split("/");
					 for(var i=0;i<loc.length;i++){
						 if(loc[i]=="reply"){
							 bool_reply=true;
							}
					 }
																			 
					if($(this).parent('.indented').length==0 && !bool_reply){
					var someObj = new Object();
					someObj= $(this);
					
						var cid=parseInt($(this).prev()[0].id.replace(/comment-/,""));
						$.post(base_url+"/comment_query/"+ cid +"/"+ nid, someObj, function(data) {
																																							
							var data_array = data.split(" ");
							var beg_range = parseInt(data_array[0]);
							var end_range = parseInt(data_array[1]);
							
							var comment_text = '';
							for(var t = beg_range; t < end_range; t++){
								comment_text += $('.ec-p'+t).text() + " ";
							}
							if(beg_range && end_range){
								//ec_comment_list.length=0;
								someObj.prepend('<div class="ec-comment-content">'+comment_text+'<input id="highlight_comment" class="highlight_comment" type="button" onclick="javascript:ec_rh('+beg_range+','+end_range+',\'single\')" value="highlight" ></div>');
								//someObj.prepend('<div class="ec-comment-content">'+comment_text+'<input id="highlight_comment" class="highlight_comment" type="button" onclick="javascript:ec_rh('+beg_range+','+end_range+', single)" value="highlight" ></div>');
								comment_cnt++;
							}else{
								someObj.addClass("comment_hide");
							}
							
								ec_comment_list[ec_comment_id] = {'beg' : beg_range, 'end' : end_range};
								ec_comment_id++;
								$('.comment_cnt').text(comment_cnt);
								
								/*if($('.highlight_all_comments').length==0){		
									$('#pane-node-comments').prepend('<input id="highlight_all_comments" class="highlight_all_comments comment_off" type="button" value="" >');
									$('#highlight_all_comments').click(function(){
										var a=0;
										if($('.comment_off').length >0){
												for(a in ec_comment_list){
														ec_rh(ec_comment_list[a]['beg'],ec_comment_list[a]['end'], 'multiple');
												}
												$('#highlight_all_comments').addClass('comment_off');
												$('#highlight_all_comments').removeClass('comment_on');
										}else{
												$('#highlight_all_comments').addClass('comment_on');
												$('#highlight_all_comments').removeClass('comment_off');
										}
								 });

								}*/
								
								$('.highlight_all_comments').val("Highlight all ("+comment_cnt+" comments)");
						});	
						
						
					}
			}
		});
		
		if(user_role!= "anonymous"){
			$('body').prepend('<div class="floating-box"  title="Tag / Comment input"  />');
			$(".floating-box").dialog();
			$(".floating-box").dialog('close');
			$('.floating-box').append('<p />');
			$('.floating-box p').append('<ul class="ecomma_tabs" /><br />');
			$('.floating-box p').append('<div id="selection" />');
			$('#community-tags-form').wrap('<div class="original-community-tags-form" />');
			$('.floating-box p').append($('#community-tags-form'));
			$('.floating-box #community-tags-form').clone(false).attr('id', 'original-community-tags-form').appendTo('.original-community-tags-form');//.find("#community-tags-form").addClass('tab_content')
			$('.floating-box #community-tags-form').addClass('tab_content');
			
			$('.original-community-tags-form #edit-tags-wrapper').attr('id','original-edit-tags-wrapper');
			
			$('.original-community-tags-form #edit-tags').remove();
			$('.original-community-tags-form .form-button').remove();
			$('.floating-box #community-tags-form .form-item:first').remove();
			$('.floating-box #community-tags-form #edit-tags-wrapper label:first').text('Add tag');
			$('.floating-box #community-tags-form #edit-tags-wrapper .tag-widget ul.inline-tags').hide();
			 
			//don't use dialog popup for comment editing and reply
			if(!location.href.match(/\/comment\//)){
				$('.floating-box p').append($('#comment-form'));
			}
			$('.floating-box #comment-form label span').remove();
			$('#comment-form').addClass('tab_content');
			$('#comment-form').append('<div id="comment_thread" />');
			$('.floating-box .ecomma_tabs').append('<li class="active"><a href="#community-tags-form">Add Tag</a></li><li><a href="#comment-form">Add Comment</a></li>');
			$('.floating-box #selection').append('<h3>Your selection</h3>');
			$('.floating-box #selection').append('<div class="ec-warning">eComma couldn\'t understand your selection.<br /><b>Please try again.</b></div>');
			$('.floating-box #selection').append('<p id="ec-selection-text" class="ec-selection-text"></p>');
			$('.floating-box #community-tags-form').append('<input name="tag-range-beg" id="tag-range-beg"  type="hidden" value="'+beg_id+'">');
			$('.floating-box #community-tags-form').append('<input name="tag-range-end" id="tag-range-end"  type="hidden" value="'+end_id+'">');
			$('.floating-box #community-tags-form').append('<input name="tag-value" id="tag-value"  type="hidden" value="">');
			$('#comment-form .form-submit').before('<input name="comment-range-beg" id="comment-range-beg"  type="hidden" value="">');
			$('#comment-form .form-submit').before('<input name="comment-range-end" id="comment-range-end"  type="hidden" value="">');
			
			$("ul.ecomma_tabs li:first").addClass("active").show(); //Activate first tab
			$(".tab_content:first").show(); //Show first tab content
			
			$("ul.ecomma_tabs li").click(function() {
						$("ul.ecomma_tabs li").removeClass("active"); //Remove any "active" class
						$(this).addClass("active"); //Add "active" class to selected tab
					if(!$('.ec-warning').is(":visible")){
						$(".tab_content").hide(); //Hide all tab content
						var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
						$('.floating-box '+ activeTab).fadeIn(); //Fade in the active content
					}
					return false;
			});
		}else{
			$('#community-tags-form').wrap('<div class="original-community-tags-form" />');
		}
		
		
		$('#comment-form .form-submit').click(function() {
					$('.comment').css('display','block');
		});
		

		
	$('input.form-tags').each(function () {
		
      // Hide submit buttons.
      $('input[type=submit]', this.form).hide();

      // Fetch settings.
      var nid = $('input[name=nid]', this.form).val();
      var o = Drupal.settings.communityTags['n_' + nid];
      var vid = $('input[name=vid]', this.form).val();
      var o = Drupal.settings.communityTags['n_' + nid]['v_' + vid];

      var sequence = 0;

      // Show the textfield and empty its value.
      var textfield = $(this).val('').css('display', 'inline');
      var deleteHandler = function () {
        // Remove tag from local list.
        var i = $(this).attr('key');
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
		
		
				//tag cloud - add mouseevent and create ec_tag_list
		$('.original-community-tags-form .cloud a').each(function(i){
			var someObj = new Object();
			someObj= $(this);
			var tag=$(this).text();
				$.post(base_url+"/tag_query/"+ tag +"/"+ nid, someObj, function(data) {
					var data_meta = data.substring(1).split("---");
																																			
					var data_array_all = data_meta[0].split(":");
					var data_array = new Array();
					
					for(var i=0; i<data_array_all.length; i++){
						data_array[i] = data_array_all[i].split(" ");
					}
					if(data_array_all.length>0){
						someObj.addClass("ec-tagged");
					}
					someObj.attr('href', 'javascript:;');
					someObj.mousedown(function() {
						if($('.ec-hi').length > 0){
							someObj.removeClass(someObj.text());
						}else{
							someObj.addClass(someObj.text());
						}
						
						
						
						if($('.ec-hi').length <= 0){
							$('.pane-ecomma-1').toggle();
						}else if($('.ec-hi').length == 1 && someObj.attr('class').match(/ec-hi/)){
							$('.pane-ecomma-1').hide();
						}
						
						if($('.ec-hi').length > 0){
							someObj.removeClass(someObj.text());
						}else{
							someObj.addClass(someObj.text());
						}
						
						ec_th(data_array[0][0]);
					});


					someObj.attr("id","ec-t"+ data_array[0][0]);
					if(data_meta[1]){
						someObj.attr("class","tagadelic level"+ data_meta[1]);
						ec_tag_cnt++;
					}else{
						someObj.attr("class","tagadelic levelundefined");
					}

					for(var j=0; j<data_array.length; j++){
						ec_tag_list[ec_tag_id] = {'beg' : data_array[j][1], 'end' : data_array[j][2], 'form_id' : data_array[j][0], 'form' : someObj.text()};
						$('.user-data-term'+ data_array[0][0]).each(function(i){
							var id_cul=$(this).attr('id');
							var id_cul_array = id_cul.split(" ");
							$(this).attr('id',id_cul_array[0].replace(/###(.*)/i,ec_tag_id));
							var beg = id_cul_array[1];
							var end = id_cul_array[2]
							
							$(this).mouseenter(function() {
								var id_current;
								for (var t in ec_tag_list){
									if(ec_tag_list[t]['beg']==id_cul_array[1] && ec_tag_list[t]['end']==id_cul_array[2]){
										id_current = t;
									}
								}	

								ec_ts(id_current,id_cul_array[1],id_cul_array[2]);
							});
							
							$(this).mouseleave(function() {
								var id_current;
								for (var t in ec_tag_list){
									if(ec_tag_list[t]['beg']==id_cul_array[1] && ec_tag_list[t]['end']==id_cul_array[2]){
										id_current = t;
									}
								}
								ec_tu(id_current,id_cul_array[1],id_cul_array[2]);
							});
							
						});
						ec_tag_id++;
					}
					

					
					
					$('.ec_tag_cnt').text(ec_tag_cnt);
					
					if($('.highlight_all_tags').length==0){		
						$('#pane-community-tags-0').prepend('<input id="highlight_all_tags" class="highlight_all_tags tags_off" type="button" value="" >');
						$('#highlight_all_tags').click(function(){
									var a=0;
									if($('.tags_off').length >0){
											for(a in ec_tag_list){
													ec_th_all(ec_tag_list[a]['form_id']);
											}
											$('#highlight_all_tags').addClass('tags_off');
											$('#highlight_all_tags').removeClass('tags_on');
									}else{
											$('#highlight_all_tags').addClass('comment_on');
											$('#highlight_all_tags').removeClass('tags_on');
									}
									
									$('#pane-ecomma-1').css('display','block');
						 });/**/
					}
					
					$('.highlight_all_tags').val("Highlight all ("+ec_tag_cnt+" tags)");

			});	
			
			
		});
		
		
				
		//text selection function
		$(".ecomma_line").mouseup(function() {
			$(".line_number_symbol").css("display","block");
			var text = "";
				
			var sel   = null;
			var range = null;
			
			if (window.getSelection){
				sel = window.getSelection();
				text = window.getSelection().toString();
			}
			else{
				// IE.
				sel = document.selection.createRange();
				text = sel.htmlText;
				//text = document.selection.createRange().toString();
			}
			
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
				end_id = parseInt(end_string.substring(0, end_string.search(/[^0-9]/)))+1;
		
				beg = document.getElementById('ec-p' + beg_id);
				end = document.getElementById('ec-p' + end_id);
			}else{
				beg = range.startContainer;
				end = range.endContainer;
					
				if(beg.id != ("node-"+ nid) && end.id != ("node-"+ nid)){
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
					if (beg.id.substring(0, 4) == 'ec-p'){
						beg_id = parseInt(beg.id.substring(4));
					}
					if (end.id.substring(0, 4) == 'ec-p'){
						end_id = parseInt(end.id.substring(4))+1;
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
				//end_id = ec_stanza_end - 1;
			}
			
			var stanza = beg.parentNode.parentNode;
			if (beg.parentNode.tagName.toLowerCase() == 'span'){
				stanza = stanza.parentNode;
			}		
			
			$(".line_number_symbol").css("display","none");
			text =text.replace(/#---ecomma_line_symbol([^\d]*)\d(\d)?/g,'');
				
			var test_array = text.split(" ");
				
							
				if(range!= "" && text!="" && beg_id!=null || end_id!=null){
							$(".tab_content:first").show(); //Show first tab content
							$(".tab_content:second").hide(); 
							$('.floating-box #comment-form #comment_thread .comment_wrapper').remove();
							
								if($('#ec-bgr' + beg_id).attr('class')=="comment_token"){
								
									var someObj = new Object();
									var beg_id_hi;
									for(var i=beg_id; $('#ec-bgr' + i).css('display') != "none"; i--){
											beg_id_hi = i;
									}
									
									$.post(base_url+"/comments_active_text/"+ beg_id_hi +"/"+ nid, someObj, 
										 function(data) {
												//alert(data);
												var data_meta;
												var data_array;
												var selected_text;
												var data_array = new Array();
												var j ;
												var data_meta = data.split(":");
												for(var t=1; t<data_meta.length; t++){
													j = t-1;
													data_array[j] = data_meta[t].split("---");
												}
												
												for(var v = beg_id_hi; v < data_array[0][3]; v++){
													selected_text += $('#ec-p' + v).text()+" ";
												}
												$('#ec-selection-text').text(selected_text.substring(9));
												$('#comment-range-beg').val(beg_id_hi);
												$('#comment-range-end').val(data_array[0][3]);
												
												comment_data =""
												for(var i=0; i<data_meta.length; i++){
													comment_data += "<div class='ec-comment-item'>"+data_array[i][0]+"   <span class='ec-comment-date'>"+data_array[i][1]+"</span></div>";
													comment_data += "<div class='comment_text'>"+data_array[i][2]+"</div>";
												}
												
									});	
									$('.comment_wrapper').remove();
									$('.floating-box #comment-form #comment_thread').html("<div class='comment_wrapper'><h2>Previous Comments</h2>"+comment_data+"</div>");
									$("ul.ecomma_tabs li:last").addClass("active").show();
									$("ul.ecomma_tabs li:first").removeClass("active");
									$(".tab_content:last").show(); //Show first tab content
									$(".tab_content:first").hide(); 
									$('.ec-warning').hide();
									$('.floating-box').show();
									$('.floating-box').css('left', $('.floating-box').css('left')-200  +'px');
								}
								//}

									
									
									if($('#ec-bgr' + beg_id).attr('class') != "comment_token"){
										if(!isNaN(beg_id) && !isNaN(end_id) 
											&& beg_id !="" && end_id !="" 
											&& test_array[test_array.length-1]!="" && test_array[0]!="" 
											&& test_array[test_array.length-1]!="undefined" && test_array[0]!="undefined"){
													//add tag/comment box to body
														$("ul.ecomma_tabs li:first").addClass("active").show(); //Activate first tab
														$("ul.ecomma_tabs li:last").removeClass("active"); //Activate first tab
														$('.floating-box').show();
														$(".floating-box").dialog('open');

														if (ie){
															$('#ec-selection-text').text(sel.text);
														}else{
															$('#ec-selection-text').text(text);
														}

														
														$('#ec-selection-text').text(text);
														$('.floating-box #community-tags-form').show();
														$(".floating-box").dialog('open');
														$('.ec-warning').hide();
														
														$('#tag-range-beg').val(beg_id);
														$('#tag-range-end').val(end_id);
														$('#comment-range-beg').val(beg_id);
														$('#comment-range-end').val(end_id);
														
										}else{
														$("ul.ecomma_tabs li:first").addClass("active").show(); //Activate first tab
														$("ul.ecomma_tabs li:last").removeClass("active"); //Activate first tab
														$('.floating-box').show();
														$(".floating-box").dialog('open');
														
														$('#ec-selection-text').text("");
														$('.floating-box #community-tags-form').hide();
														$('.ec-warning').show();
										}
									}
									
							}
							
				//}				

					
		});
					


		
		
		//submitting tag input
		$(".floating-box .form-button").click(function() {			 
				var selection = $("#ec-selection-text").html().replace(/\s\s+/g," ").replace(/(\n|\r)/g," ").replace(/<br \/>/g," ").replace(/<br>/g," ").replace(/<\/?[^>]+>/gi, '');
								
				if(main_text.indexOf(selection) != -1){	
						var tag = $('#tag-value').val();
						var beg = $('#tag-range-beg').val();
						var end = $('#tag-range-end').val();
						$.post(base_url+"/tag_range/"+ tag +"/"+ nid +"/"+ beg +"/"+ end, { },
						 function(data) {
								//location.reload(base_url +"/"+ nid +"#tags");
								location.href=location.href.replace(/#(.*)/,'')+'#tags';	
								location.reload();	
						});
				}//endif found selection
		});
		
		
		$(".floating-box .form-tags").blur(function() {
				$('#tag-value').val($('.tag-widget #edit-tags').val());
		});
		
		
		
		//submitting tag input by hitting return	
		$(".floating-box .form-tags").keypress(function(e) {
				if(e.keyCode == 13) {
				$('#tag-value').val($('.tag-widget #edit-tags').val());
				var selection = $("#ec-selection-text").html().replace(/\s\s+/g," ").replace(/(\n|\r)/g," ").replace(/<br \/>/g," ").replace(/<br>/g," ").replace(/<\/?[^>]+>/gi, '');
								
				if(main_text.indexOf(selection) != -1){
					var tag = $('#tag-value').val();
					var beg = $('#tag-range-beg').val();
					var end = $('#tag-range-end').val();
					$.post(base_url+"/tag_range/"+ tag +"/"+ nid +"/"+ beg +"/"+ end, { },
						 function(data) {
								//location.reload(base_url +"/"+ nid +"#tags");		
								location.href=location.href.replace(/#(.*)/,'')+'#tags';	
								location.reload();	
					});
				}//endif found selection

			}//endif enter key pressed 
					$('#original-community-tags-form').css('display','block');

		});
		
		
				
				
		$(".word_cloud").tagCloud({randomize: false,separator: ' '});	
		
		
		$(".word_cloud a").each(function(i){
				var class_value = 'ec-f'+(i+1);
				$(this).attr('id', class_value);
				$(this).attr('href', 'javascript:;');
				$(this).mousedown(function() {
					ec_fh((i+1));
				});
				var someObj2 = new Object();
				someObj2= $(this);
				$(".ecomma_line span").each(function(t){
					if($(this).text().toLowerCase() == someObj2.text()){
						$(this).addClass(class_value);					
					}
				});
		});
		
		$(".comment_cloud").tagCloud({randomize: false,separator: ' '});	

		var html = [];
		html.push('<div class="comment_cloud">');
		$(".comment_cloud").find('a').each(function(i){
			 html.push('<span style="'+$(this).attr('style')+'">' + $(this).text() + '</span>');
		});
		html.push('</div>');
		$(".comment_cloud").replaceWith(html.join(''));




//}//end ecomma_behavior
});
//end document.ready



function ec_max(a){
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
  if ($('#ec-t' + form_id).hasClass('ec-hi')){
    ec_tag_select(form_id);
  }else{
    ec_tag_unselect(form_id);
  }
	ec_token_color(ec_tag_token_list, ec_tag_name_list, 172, 26, 47);
}


function ec_th_all(form_id){
	if(!$('#ec-t' + form_id).hasClass('ec-hi')){
		$('#ec-t' + form_id).addClass('ec-hi');
		ec_tag_select(form_id);
		ec_token_color(ec_tag_token_list, ec_tag_name_list, 172, 26, 47);
	}
}


/* Highlight range. */
function ec_rh(beg, end, type){
	ec_comment_select(beg, end, type, '#e0edf6');
  //window.location.hash = 'top';
}


/* Hover/show tag. */
function ec_ts(tag_id, beg, end){
		$('#ec-tag-e' + tag_id).css('background-color', '#ccff99');
		ec_tag_select_hover(tag_id, beg, end);
		ec_tag_token_list_hover[ec_tag_token_list_hover.length-1] = "hover_green";
		ec_token_color(ec_tag_token_list_hover, ec_tag_name_list_hover, 204, 255, 153);
}

/* Don't hover/show tag. */
function ec_tu(tag_id, beg, end){
		//$('#ec-tag-e' + tag_id).css('background-color', '#e3e1d1');
		$('#ec-tag-e' + tag_id).css('background-color', 'transparent');
		ec_token_color(ec_tag_token_list_hover, ec_tag_name_list_hover, 204, 255, 153);
}


function ec_comment_select(beg, end, type, color){
	/*for ( e in ec_comment_list){
		if((ec_comment_list[e]['beg'] == beg) && (ec_comment_list[e]['end'] == end)){
			var comment_id = e;
		}
	}*/
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
			
			if(type == "single"){//!$('#ec-bgr' + i).attr('class').match(/comment_token/)
					$('#ec-bgr' + i).removeClass("not_FE");
					$('.cloud a').each(function(i){
						$('#ec-bgr' + i).removeClass($(this).text());
					});
					$('#ec-bgr' + i).removeClass('Partner-all');
					$('#ec-p' + i).css(token_css_wipe);
					$('#ec-bgr' + i).css(token_bgr_css_wipe);
					$('#ec-bgr' + i).parent().children('.line_number').css('height', $('#ec-bgr' + i).parent().height() +'px' );
			}
			
			if(type == "multiple"){//!$('#ec-bgr' + i).attr('class').match(/comment_token/)
					$('#ec-bgr' + i).removeClass("not_FE");
					$('.cloud a').each(function(i){
						$('#ec-bgr' + i).removeClass($(this).text());
					});
					$('#ec-bgr' + i).removeClass('Partner-all');
					$('#ec-p' + i).css(token_css_wipe);
					//$('#ec-bgr' + i).css(token_bgr_css_wipe);
					$('#ec-bgr' + i).parent().children('.line_number').css('height', $('#ec-bgr' + i).parent().height() +'px' );
			}
			
			
			if (i >= beg && i < end){// && (!$('#ec-bgr' + i).attr('class').match(/comment_token/))
				$('#ec-bgr' + i).addClass("comment_token");
				
				var max_count = ec_max_comment_token_count();
				var weight = 	Math.min(7, Math.ceil(comment_list[i] * 8 / max_count));
				//var width_factor = 1 + (1 + (weight / 16) *10) / $('#ec-p' + i).css('font-size').replace(/px/,'');
				if(type == "single"){
						token_css =
						{
							'position'         : 'relative',
							//'font-size'        : 1 + (weight / 16) + 'em',
							'margin'           : '0px -2px 0px -1px',
							'padding'          : '4px 2px 4px 2px',
							'z-index'					 : '100'
						};
				}else{
						token_css =
						{
							'position'         : 'relative',
							'font-size'        : 1 + (weight / 16) + 'em',
							//'margin'           : '0px -2px 0px -1px',
							//'padding'          : '4px 2px 4px 2px',
							'z-index'					 : '100'
						};
				}
				if(type == "single"){
						token_bgr_css =
						{
							'position'         : 'absolute',
							'display'          : 'block',
							'z-index'					 : '0',
							'height'           : $('#ec-p' + i).height() +'px',
							//'width'            : width needs to be set later,
							//'width'            : ($('#ec-p' + i).width() * width_factor)+'px',
							'left'             : $('#ec-p' + i).position().left+'px', //document.getElementById('ec-p' + i).position().left+'px',//
							'top'              : $('#ec-p' + i).position().top+'px', //document.getElementById('ec-p' + i).position().top+'px',//
							'padding'          : '1px 0px 1px 0px',
							'opacity'          : '0.5',
							//'filter'           :'alpha(opacity=' + weight/10*10 + ')'
							'filter'           :'alpha(opacity=50)'
							/*'opacity'          : weight*2.5/10,
							'filter'           :'alpha(opacity=' + weight*2.5/10*10 + ')'*/
						};
				}else{
						token_bgr_css =
						{
							'position'         : 'absolute',
							'display'          : 'block',
							'z-index'					 : '0',
							'height'           : $('#ec-p' + i).height() +'px',
							//'width'            : width needs to be set later,
							//'width'            : ($('#ec-p' + i).width() * width_factor)+'px',
							'left'             : $('#ec-p' + i).position().left+'px', //document.getElementById('ec-p' + i).position().left+'px',//
							'top'              : $('#ec-p' + i).position().top+'px', //document.getElementById('ec-p' + i).position().top+'px',//
							'padding'          : '1px 0px 1px 0px',
							'opacity'          : weight/4,
							//'filter'           :'alpha(opacity=' + weight/10*10 + ')'
							'filter'           :'alpha(opacity=' + weight*10+5 + ')'
							/*'opacity'          : weight*2.5/10,
							'filter'           :'alpha(opacity=' + weight*2.5/10*10 + ')'*/
						};
				}
				$('#ec-p' + i).css(token_css);
				$('#ec-bgr' + i).css(token_bgr_css);
				$('#ec-bgr' + i).css('width',($('#ec-p' + i).width())+'px');
				$('#ec-bgr' + i).css('top',($('#ec-p' + i).position().top) +'px');
				$('#ec-bgr' + i).css('left',($('#ec-p' + i).position().left) +'px');
				$('#ec-bgr' + i).parent().children('.line_number').css('height',$('#ec-bgr' + i).parent().height() +'px');
				$('#ec-bgr' + i).parent().children('.line_number').css('height',$('#ec-bgr' + i).parent().height() +'px');
				/*if(type == "multiple"){//!$('#ec-bgr' + i).attr('class').match(/comment_token/)
					$('#ec-bgr' + i).parent().children('.line_number').css('height',$('#ec-bgr' + i).parent().height() +'px');
				}*/
				//$('#ec-bgr' + i).css('top',$('#ec-p' + i).position().top+'px');
				//$('#ec-bgr' + i).css('left',$('#ec-p' + i).position().left+'px');
			}
			
			/*if($('#ec-bgr' + i).attr('class').match(/comment_token/)){
				//(font_size > 13? font_size-13: 13 - font_size) + (comment_id*8)
				$('#ec-bgr' + i).css('top',$('#ec-bgr' + i).css('top')+ (comment_id*8.2));
			}*/

	}
		
	$('.cloud a').each(function(i){
		$(this).removeClass('ec-hi')
	});
	$('.pane-ecomma-1').hide();
	ec_tag_token_list.length =0;
	ec_tag_name_list.length= 0;
}


function ec_token_color(token_list, ec_tag_list, r, g, b){
	var max_count = ec_max_tag_token_count();
	var tag_name = token_list.pop();
  for (var i = ec_stanza_beg; i < ec_stanza_end; i++)
  {
		//if(!isNaN(token_list[i]) && token_list[i]!=""){
				var weight = 0;
				//var width_factor = 0;
				var token_css;
				
				
				if($('#ec-bgr' + i).attr('class').match(/comment_token/)){
					remove_token_css =
					{
						'font-size'        : null,
						'margin'           : null,
						'padding'          : null
						//'background-color' : null
					};


					remove_token_bgr_css =
					{
						'display'          : 'none',
						'margin'           : null,
						'padding'          : null,
						'opacity'          : null,
						'filter'           : null
						//'background-color' : null
					};
					
					$('#ec-p' + i).css(remove_token_css);
					$('#ec-bgr' + i).css(remove_token_bgr_css);
					$('#ec-bgr' + i).removeClass('comment_token');
					$('#ec-bgr' + i).parent().children('.line_number').css('height', $('#ec-bgr' + i).parent().height() +'px' );
				}
				
				
			 if ((i in ec_tag_list) && (ec_tag_list[i] == tag_name || tag_name != "hover_green" )){ 

				 if(tag_name != "Partner1" && tag_name != "Partner2" && tag_name != "Partners" && tag_name != "hover_green"){
						weight = Math.min(7, Math.ceil(token_list[i] * 8 / max_count));
						//width_factor = 1 + (1 + (weight / 16) *10) / $('#ec-p' + i).css('font-size').replace(/px/,'');
						//current_font_size = width_factor;
						//current_font_size = $('#ec-p36').width();


						token_css =
						{
							'position'        : 'relative',
							'font-size'        : 1 + (weight / 16) + 'em',
							'margin'           : '0px -2px 0px -1px',
							'padding'          : '4px 2px 4px 2px',
							'z-index'					 : '100'
						};
						
						token_bgr_css =
						{
							'position'         : 'absolute',
							'display'          : 'block',
							'z-index'					 : '0',
							'left'             : $('#ec-p' + i).position().left+'px',
							'top'             :  $('#ec-p' + i).position().top+'px',
							//'top'             :  $('#ec-p' + i).parent().position().top+'px',
							'height'           : $('#ec-p' + i).height() +'px',
							//'width'            : width needs to be set later,
							//'width'            : ($('#ec-p' + i).width()	* width_factor)+'px',
							//'margin'           : '0px -2px 0px -1px',
							'padding'          : '1px 2px 1px 2px',
							/*'margin'           : '0px 0px 0px  -'+($('#ec-p' + i).width()+10)+'px',
							'padding'          : '1px 1px 1px 1px',*/
							'opacity'          : weight/8, 
							//'filter'           :'alpha(opacity=' + weight/10*10 + ')'
							'filter'           :'alpha(opacity=' + weight*10+5 + ')' //4//5
						};
					 }//end if

			
					if(tag_name != "Partner1" && tag_name != "Partner2" && tag_name != "Partners" && tag_name != "hover_green"){
						$('#ec-bgr' + i).removeClass("FE"); 
						$('#ec-bgr' + i).addClass("not_FE");
						if(r != 204 && g != 255 && b != 153){
							$('#ec-p' + i).css(token_css);
							$('#ec-bgr' + i).css(token_bgr_css);
							//have to apply background width after font has been enlarged or it will be the old width
							$('#ec-bgr' + i).css('width',$('#ec-p' + i).width()+'px');
							$('#ec-bgr' + i).css('left',$('#ec-p' + i).position().left+'px');
						}
					}/*else if(tag_name == "hover_green"){
						$('#ec-bgr' + i).removeClass("not_FE");
						$('#ec-bgr' + i).addClass("FE");
						$('#ec-p' + i).css('font-size',$('#ec-p' + i).css('font-size'));
						$('#ec-p' + i).css('margin',$('#ec-p' + i).css('margin'));
						$('#ec-p' + i).css('padding',$('#ec-p' + i).css('padding'));
					}*/else{
						$('#ec-bgr' + i).addClass(tag_name);
						$('#ec-p' + i).css(token_css);
						$('#ec-bgr' + i).css(token_bgr_css);
						$('#ec-bgr' + i).css('width',$('#ec-p' + i).width()+'px');
						$('#ec-bgr' + i).css('left',$('#ec-p' + i).position().left+'px');
					}
					
					$('#ec-bgr' + i).parent().children('.line_number').css('height',$('#ec-bgr' + i).parent().height() +'px');
					
				}		//end if	 
				
				else if ((i in ec_tag_list) && tag_name == "hover_green"){
				 
					/*weight = Math.min(7, Math.ceil(token_list[i] * 8 / max_count));
					nr = 256 - Math.ceil((256 - r)  * (0.125 + weight / 32));
					ng = 256 - Math.ceil((256 - g)  * (0.125 + weight / 32));
					nb = 256 - Math.ceil((256 - b)  * (0.125 + weight / 32));
					token_css =
					{
						//'font-size'        : 1 + (weight / 16) + 'em',
						//'margin'           : '0px -2px 0px -1px',
						//'padding'          : '4px 2px 4px 2px',
						'z-index'					 : '100',
					};
					
					token_bgr_css =
					{
					  'position'         : 'absolute',
						'z-index'					 : '0',
						'height'           : $('#ec-p' + i).height() +'px',
						'width'            : ($('#ec-p' + i).width()+10	)+'px',
						//'margin'           : '0px 0px 0px  -'+($('#ec-p' + i).width()+10)+'px',
						//'padding'          : '1px 1px 1px 1px',
						'opacity'          : weight/10,
						'filter'           :'alpha(opacity=' + weight*10+10 + ')'
					};*/
			
					$('#ec-bgr' + i).removeClass("not_FE");
					$('#ec-bgr' + i).addClass("FE");
					$('#ec-p' + i).css('font-size',$('#ec-p' + i).css('font-size'));
					$('#ec-p' + i).css('margin',$('#ec-p' + i).css('margin'));
					$('#ec-p' + i).css('padding',$('#ec-p' + i).css('padding'));
					//$('#ec-bgr' + i).css($('#ec-bgr' + i).css());
				}//end else if

				else if(ec_tag_list[i] == "empty_"  || token_list[i] =="0"  || tag_name == "wipe" && tag_name != "hover_green")
				{		// || tag_name == "green"|| token_list[i] =="yes"
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
							//'background-color' : null
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
				}//end else if
				
	}//end for loop
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
			ec_tag_token_list[ec_tag_token_list.length] = tag_name;
      $("#ec-tag-e" + (tag_id)).show();
    }
  }
}



function ec_tag_select_all(form_id){
	for (var tag_id in ec_tag_list){
    if (ec_tag_list[tag_id]['form_id'] == form_id){
			//var tag_name_previous = ec_tag_token_list.pop();
			//if(tag_name_previous && tag_name_previous.isNaN()){keeper = tag_name_previous}
			
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
			//ec_tag_token_list[ec_tag_token_list.length] = tag_name;
      //$("#ec-tag-e" + tag_id-1).show();
    }
  }
}


function ec_tag_select_hover(tag_id, beg, end){
			ec_tag_token_list_hover.length =0;
			ec_tag_name_list_hover.length= 0;
			var tag_name = ec_tag_list[tag_id]['form'];
			end--;//had to add bizarre hack for hover to work
			end++;//had to add bizarre hack for hover to work
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
      $("#ec-tag-e" + (tag_id)).hide();
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