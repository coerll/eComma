<?php 
/**
 * @file
 * Help page for eComma module.
 */
?>
  <p><h4 id="ec-annotate-view-header"><u>Module dependencies:</u></h4></p>
  <ul class="list_indent">
   <li>content</li>
   <li>text</li>
   <li>tagadelic</li>
   <li>taxonomy</li>
   <li>community_tags</li>
   <li>page_manager</li>
   <li>jquery_update</li>
   <li>jquery_ui (with latest jQuery UI 1.7 release)</li>
   <li>views_bonus_export</li>
   <li>comment_delete</li>
  </ul>

  <p>&nbsp;</p>

  <p><h4 id="ec-annotate-view-header"><u>Installation:</u></h4></p>
  (Navigation paths/breadcrumbs are based on Administration menu module navigation bar)<br />
  <ol>
   <li>Go to Site building > Modules: enable eComma module and dependencies</li>
   <li>
    <ul>As Described in the jquery_ui module: 
     <li>Download the latest jQuery UI 1.7 release from:
     http://code.google.com/p/jquery-ui/downloads/list?q=1.7</li>
     <li>Put the downloaded archive into the directory:
     /sites/all/libraries/jquery.ui-1.7.zip</li>
     <li>Extract the archive.  This will create the following sub-directory:
     /sites/all/libraries/jquery.ui-1.7/</li>
     <li>Rename the sub-directory into "jquery.ui":
     /sites/all/libraries/jquery.ui/</li>
    </ul>
   </li>
   <li>Go to Content management > Content types > Add Content type: Add custom content typ</li>
   <li>Go to Content management > Content types > Edit Your_custom_content_type > Workflow settings > Community tagging form: Select Block</li>
   <li>Go to Content management > Content types > Edit Your_custom_content_type > Comment settings > Preview comment: Optional</li>
   <li>Go to Content management > Content types > Edit Your_custom_content_type > Manage fields > Add a new text area field with unlimited values</li>
   <li>Enable ecomma commentary features for that text area field in field settings</li>
   <li>Go to Content management > Taxonomy: Add Vocabulary, enable Vocabulary for the content type you created, and check Tags checkbox (from Tags, Multiple select, Required)</li>
   <li>Go to Site Configurations > Community tags: Enable community tagging for the vocabulary you created.</li>
   <li>Go to User Management > Permissions > community_tags module: Enable "tag comment" for authenticated and anonymous users. (This will just enable unauthenticated users to see the tags, but not to tag.)</li>
   <li>Go to User Management > Permissions > community_tags module: Enable "edit tag" for authenticated.</li>
   <li>Go to User Management > Permissions > comment module: Enable "access comments" for authenticated and anonymous users. (This will just enable unauthenticated users to see the comments, but not to comment.)</li>
   <li>Go to User Management > Permissions > comment_delete module: Enable "delete own comments" for authenticated  users. </li>
   <li>Go to Site building > Pages > List: </li>
     <ul class="list_indent">
       <li class="nested_list_indent">Enable node_view and click on edit. </li>
       <li class="nested_list_indent">Add variant</li>
       <li class="nested_list_indent">call it ecomma </li>
       <li class="nested_list_indent">create variant and enalbe selection rules</li>
       <li class="nested_list_indent">In the selection rules make sure to select the content type you created for the ecomma module</li>
       <li class="nested_list_indent">choose miscellaneous layout: enable eComma column 45/10/45 </li>
       <li class="nested_list_indent">create variant</li>
       <li class="nested_list_indent">Add content to Left (click wheel icon): Node > Node content > Node being viewed (deselect everything else), build mode > Full node</li>
       <li class="nested_list_indent">Add content to Right:  Miscellaneous > Community tagging form</li>
       <li class="nested_list_indent">Add content to Right:  Miscellaneous > eComma Tag details</li>
       <li class="nested_list_indent">Add content to Right: Miscellaneous > eComma Word Cloud</li>
       <li class="nested_list_indent">Add content to Right: Miscellaneous > eComma User Annotation Total</li>
       <li class="nested_list_indent">Add content to Right: Node > Comment form > Node being viewed</li>
       <li class="nested_list_indent">Add content to Right: Node > Comment form > Node Comments</li>
       <li class="nested_list_indent">Add content to Right: Miscellaneous > eComma Comment Cloud</li>
    </ul>
    <li>Go to Content management > Create content: Create a node for your collaborative text. Don\'t put anything in the body text just in the text area that you added.</li>
  </ol>

  <p>&nbsp;</p>

<p><h4 id="ec-annotate-view-header"><u>Current restrictions:</u></h4></p>
<ul>
 <li>System requirements: </li>
  <ul>
   <li class="nested_list_indent">OSX 10.6 with Safari 5, Firefox 10, Chrome 17.</li>
   <li class="nested_list_indent">Windows 7 with Firefox 10.</li>
  </ul>
 <li class="nested_list_indent">Once a group/class has started to tag or comment on a text the text cannot be changed in any way or the annotations will be off.</li>
</ul>

  <p>&nbsp;</p>

 <p><h4 id="ec-annotate-view-header"><u>Using eComma:</u></h4></p>
 <div class="ec-about">
  <ol>
   <!--<li><a class="related" href="#ec-stanza-compare-header">Compare the same stanza across different editions</a></li>-->
   <li><a class="related" href="#ec-tags-comments">Tags and Comments</a></li>
   <li><a class="related" href="#ec-annotate-add-header">Add your own comments and tags to the document</a></li>
   <li><a class="related" href="#ec-ecomma-interface">The eComma interface</a></li>
  </ol>

  <p>&nbsp;</p>
  <h3 id="ec-tags-comments">1. Tags and Comments</h3>

  <p>
   A &ldquo;tag&rdquo; is a label that you can use to mark a word or series of words that interest you.
   A &ldquo;comment&rdquo; is a remark on passage of a text.
   A user might mark an instance of metaphor with &ldquo;metaphor,&rdquo; or tag a famous passage with &ldquo;well-known.&rdquo;
   You may use tags that previous readers have created or create your own.
  </p>
  <p>&nbsp;</p>

  <p><h3 id="ec-annotate-add-header">2. Adding tags or comments</h3></p>
  <div class="ec-image">
   <img src="@module_path/img/9_annotate_comment.png" />
  </div>

  </p>
  <p>
   Simply use your mouse to select a range of text in the text provided.
   This will cause a draggable dialog box to appear. You can select either to create a tag or a comment with the selected text.
   You can type one of more words into the tag creation box to add them to your selected text, or you can type a longer observation or question into the comment creation box.
   You can also reply to another user\'s comment by clicking the link that will appear under the comment if you are logged in. 
   And you can edit and delete your already submitted comments.
   Tags can be deleted, but not edited.
  </p>
  <p>&nbsp;</p>

   <h3 id="ec-ecomma-interface">3. The eComma interface</h3>
  <p>
   Use the icon buttons in the middle to navigate between the text\'s word cloud, tag view, comment view, comment word cloud, and user annotation list.
  </p>
  <div class="ec-image">
   <img src="@module_path/img/3_text_view.png" width="500px"/>
  </div>
  <div class="aligncenter">-</div>
   <h5><u>Word Cloud</u></h5>
  <div class="ec-image">
   <img src="@module_path/img/4_word_cloud.png" />
  <p></p>
  </div>
  <div class="aligncenter">-</div>

  <h5><u>Tag view</u></h5>
  <div class="ec-image">
   <img src="@module_path/img/5_tag_view.png" />
   <p>
    Clicking a tag in the tag cloud will show all phrases in the text that have
    been given this tag, as well as which users have added the tag, and when.
    The tags are arranged in a &ldquo;tag cloud&rdquo;. The tags in the cloud are arranged alphabetically, and tags that are used more frequently in the stanza will appear larger.
   </p>
  </div>
  <div class="aligncenter" >-</div>

  <h5><u>Comment view</u></h5>
  <div class="ec-image">
   <img src="@module_path/img/6_comment_view.png" />
   <p>
    Clicking on the highlight button in the comment view will show all phrases in the text that relate to that comment.
   </p>
  </div>

  <div class="aligncenter" >-</div>
  <h5><u>Comment Word Cloud</u></h5>
  <div class="ec-image">
   <img src="@module_path/img/7_comment_word_cloud.png" />
  </div>
  <div class="aligncenter" >-</div>

  <h5><u>List of user annotations</u></h5>
  <div class="ec-image">
   <img src="@module_path/img/8_user_annotations.png" />
   <p>
    Clicking on the user name will take you to a list of all the user\'s comments and tags for the current text.
   </p>
  </div>
  <p>&nbsp;</p>

   <h3 id="ec-ecomma-interface">4. Download eComma comments</h3>
  <p>
   Download  eComma comments data as XML or import to Google docs spreadsheet. To download an XML file of the comment data, simply click download comments button at the top of the comment view panel.
  </p>
  <div class="ec-image">
   <img src="@module_path/img/10_comment_download_btn.png" />
  </div>
  <div class="aligncenter" >-</div>

  <p>
   If you need to export the data to a spreadsheet format you can import (stream) the xml directly and without downloading to a google spreadsheet. You will need a google account to work with this method. <br />
   You also need the text identification number of your ecomma text. You can obtain the text id from the URL as shown in this screenshot (It is the number that follows /ecomma/node/):
  </p>
  <div class="ec-image">
   <img src="@module_path/img/11_ecomma_node_id.png" />
  </div>
  <div class="aligncenter" >-</div>

  <p>
   Open a google spreadsheet and paste the following code into the first cell:<br />
   <b>=importXML("http:// www.coerll.utexas.edu/ecomma/ecomma_comments_export/[replace this (including brackets) with text-id]","// node")</b>
  </p>
  <div class="aligncenter" >-</div>

  <p>&nbsp;</p>

  <h4 id="ec-other-header">5. Other drupal modules to consider:</h4>
  <p>
   For collaborative class or group assignments try using the organic groups module in combination with the userplus module.
  </p>
 </div>
