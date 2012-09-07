MODULE DEPENDENCIES

- content
- content_copy
- text
- panels
- tagadelic
- taxonomy
- community_tags
- page_manager
- jquery_update 6.x-2.0-alpha1
- views_bonus_export
- comment_delete



INSTALLATION OF ECOMMA MODULE
 
Navigation paths/breadcrumbs are based on Administration menu module nave bar

1.  Go to Site building > Modules: enable ecomma module and dependencies
2.  Go to Content management > Content types > Add Content type: Add custom content type
3.  Go to Content management > Content types > Edit Your_custom_content_type > Workflow settings > Community tagging form: Select Block
4.  Go to Content management > Content types > Edit Your_custom_content_type > Comment settings > Preview comment: Optional
5.  Go to Content management > Content types > Edit Your_custom_content_type > Manage fields > Add a new text area field with unlimited values
6.  Enable ecomma commentary features for that text area field in field settings
7.  Go to Content management > Taxonomy: Add Vocabulary, enable Vocabulary for the content type you created, and check Tags checkbox (from Tags, Multiple select, Required)
8.  Go to Site Configurations > Community tags: Enable community tagging for the vocabulary you created.
9.  Go to User Management > Permissions > community_tags module: Enable "tag comment" for authenticated and anonymous users. (This will just enable unauthenticated users to see the tags, but not to tag.)
10. Go to User Management > Permissions > community_tags module: Enable "edit tag" for authenticated.
11. Go to User Management > Permissions > comment module: Enable "access comments" for authenticated and anonymous users. (This will just enable unauthenticated users to see the comments, but not to comment.)
12. Go to User Management > Permissions > comment_delete module: Enable "delete own comments" for authenticated  users.


13. Go to Site building > Pages > List: 
	-Enable node_view and click on edit. 
	-Add variant, 
	-call it ecomma 
	-create variant and enalbe selection rules
	-In the selection rules make sure to select the content type you created for the ecomma module
	-choose miscellaneous layout: enable eComma column 45/10/45 
	-create variant

	-Add content to Left (click wheel icon): Node > Node content > Node being viewed (deselect everything else), build mode > Full node
	-Add content to Right:  Miscellaneous > Community tagging form
	-Add content to Right:  Miscellaneous > eComma Tag details
	-Add content to Right: Miscellaneous > eComma Word Cloud
	-Add content to Right: Miscellaneous > eComma User Annotation Total
	-Add content to Right: Node > Comment form > Node being viewed
	-Add content to Right: Node > Comment form > Node Comments
	-Add content to Right: Miscellaneous > eComma Comment Cloud

14. Go to Content management > Create content and create a node for your collaborative text. Don't put anything in the body text just in the text area that you added.

15. Current restrictions:
		-System requirements:
				* OSX 10.6 with Safari 5, Firefox 10, or Chrome 17.
				* Windows 7 with Firefox 10.
				* Does currently not work on IE browser.
		-Once a group/class has started to tag or comment on a text the text cannot be changed in any way or the annotations will be off.</li>


********************************************************************************************

USE OF ECOMMA MODULE (see also screenshots at admin/help/ecomma)

1. Tags and Comments
		
	-A "tag" is a label that you can use to mark a word or series of words that interest you.
	-A "comment" is a remark on passage of a text .
	-A user might mark an instance of metaphor with the tag "metaphor" or tag a famous passage with "well-known"
	-You may use tags that previous readers have created or create your own.
	-Tags are arranged in a "tag cloud". The tags in the cloud are arranged alphabetically, and tags that are used more frequently will appear larger.
	
2. Adding tags and comments to an eComma text

	Simply use your mouse to select a range of text in the text provided.
	This will cause a draggable dialog box to appear. You can select either to create a tag or a comment with the selected text.
	You can type one of more words into the tag creation box to add them to your selected text, or you can type a longer observation or question into the comment creation box.
	You can also reply to another user\'s comment by clicking the link that will appear under the comment if you are logged in. 
	And you can edit and delete your already submitted comments.
	Tags can be deleted, but not edited.


3. The eComma interface

	-Use the icon buttons in the middle to navigate between the text\'s word cloud, tag view, comment view, comment word cloud, and user annotation list.
	-Clicking a tag in the tag cloud will show all phrases in the text that have been given this tag, as well as which users have added the tag, and when.
	-Clicking on the highlight button in the comment view will show all phrases in the text that relate to that comment.
	-Clicking on the user name in the user annotation list to go to a list of all the user\'s comments and tags for the current text.
		
	
4. Download eComma comments
			
		-Download  eComma comments data as XML or import to Google docs spreadsheet. To download an XML file of the comment data, simply click download comments button at the top of the comment view panel.
		-If you need to export the data to a spreadsheet format you can import (stream) the xml directly and without downloading to a google spreadsheet. 
				*You will need a google account to work with this method.
				*You also need the text identification number of your ecomma text. You can obtain the text id from the URL. It is the number that follows /ecomma/node/.
				*Open a google spreadsheet and paste the following code into the first cell:
		
				=importXML("http://www.coerll.utexas.edu/ecomma/ecomma_comments_export/[replace this (including brackets) with text-id]","//node")
	
	
5. Other drupal modules to consider

	-For collaborative class or group assignments try using the organic groups module in combination with the userplus module.
	This module provides some views in ecomma.views.inc.inc that may be used with the module.