DRUPAL MODULE DEPENDENCIES

- comment
- community_tags
- jquery_update
- libraries
- page_manager
- panels
- tagadelic
- taxonomy
- text
- views
- views_data_export


INSTALLATION OF ECOMMA MODULE
 
Instructions below are based on navigation in admin menu (admin_menu module).

1.  Modules: enable ecomma module and dependencies
2.  Configuration > Search and metadata > Clean URLs: Check checkbox.

(Go to content management > Content types for step 3-5)
3.  Structure > Taxonomy: Add Vocabulary.
4.  Add content type: Add custom content type.
5.  Edit new content type > Comment settings > Preview comment:Optional
6.  Manage fields > Add a new text area field with unlimited values
7.  Enable ecomma commentary features for that text area field in the settings.
8.  Manage fields > Add new field > Term reference > Autocomplete term w.
9.  Select your Vocabulary from tag field settings.
10. Configuration > Community tags: Enable community tagging for new vocabulary.
11. Configuration > jQuery update > jQuery and jQuery UI CDN > Select None.
12. Edit new content type  > Community tags settings > Block.

(Go to People > Permissions for step 12-14)
13. Community_tags: Enable "tag content" for authenticated and anonymous users.
    (Enables unauthenticated users to see the tags, but not to tag.)
14. Community_tags: Enable "edit own tags" for authenticated.
15. Comment: 
	-Enable “View comments" for anonymous and authenticated users. 
	 (Enables unauthenticated users to see the comments, but not to comment.)
	-Enable "Administer comments and comment settings" for authenticated users.
16. Structure > Pages:
	-Enable node_view and click on edit. 
	-Selection rules > select "Node:type" and then check new content type
	-Left column: Add content > Node > Field: your-text-field
17. Create a node of the new node type. 
18. Enter your text in the text field (not in the body).
19. View the node and select text with mouse cursor to start annotating.

Current restrictions:
	* Does currently not work on all IE browser.
	* Must use clean URLs.
	* Once a group/class has started to tag or comment on a text the text 
	  cannot be changed in any way or the annotations will be off.

*****************************************************************************

USE OF ECOMMA MODULE (see also screenshots at admin/help/ecomma)

1. Tags and Comments
		
	-A "tag" is a label that you can use to mark a word or series of words that
	 interest you.
	-A "comment" is a remark on passage of a text.
	-A user might mark an instance of metaphor with the tag "metaphor" or tag a
	 famous passage with "well-known"
	-You may use tags that previous readers have created or create your own.
	-Tags are arranged in a "tag cloud". The tags in the cloud are arranged
	 alphabetically, and tags that are used more frequently will appear larger.
	
2. Adding tags and comments to an eComma text

	Simply use your mouse to select a range of text in the text provided.
	This will cause a draggable dialog box to appear. You can select either
	to create a tag or a comment with the selected text.
	You can type one of more words into the tag creation box to add them to
	your selected text, or you can type a longer observation or question into
	the comment creation box. You can also reply to another user's comment
	by clicking the link that will appear under the comment if you are logged
	in. And you can edit and delete your already submitted comments.
	Tags can be deleted, but not edited.


3. The eComma interface

	-Use the centered icon tabs to navigate between the text's word cloud,
	 tag view, comment view, comment word cloud, and user annotation list.
	-Clicking a tag in the tag cloud shows all phrases in the text that have
	 been given this tag, as well as which users have added the tag, and when.
	-Clicking on the highlight button in the comment view will show all phrases
	 in the text that relate to that comment.
	-Clicking on the user name in the user annotation list to a list of all the
	 user's comments and tags for the current text.
		
	
4. Download eComma comments
			
	-Download  eComma comments data as XML or import to Google docs
	spreadsheet. To download an XML file of the comment data, simply
	click download comments button at the top of the comment view panel.
	-If you need to export the data to a spreadsheet format you can import
	(stream) the xml directly and without downloading to a google spreadsheet. 
	  *You will need a google account to work with this method.
	  *You also need the text identification number of your ecomma text.
	   You can obtain the text id from the URL. It is the number that 
	   follows /ecomma/node/.
	  *Open a google spreadsheet and paste the following code into
	   the first cell:
		
	    =importXML("http://www.coerll.utexas.edu/ecomma/ecomma_comments_export/
	    [replace this (including brackets) with text-id]","//node")
	
	
5. Other drupal modules to consider

	-For collaborative class or group assignments try using the organic groups
	 module.
	-The eComma module provides some views through ecomma.views.inc that can be used
	 to run queries and download comment data.
