/**
 * @file
 * This file provides the ecomma JQuery and JavaScript functions.
 *
 * This JQuery and JavaScript functions detect and capture user text selections and update the database tables through ajax calls.
 * The script also handles the formatting of the highlighted annotated text.
 * Written by COERLL and based on code from Travis Brown <travis.brown@mail.utexas.edu>.
 */

(function ($){


  Drupal.behaviors.ecommaBehavior = {

  attach: function(context, settings) {


	var word_count = 0;

	  

	$("#ecomma-node-form .form-textarea").each(function(){
		//$(this).bind("change", function(){
		word_count += wordCount($(this).val());
		//});
	});
	$("#word_count").text(word_count);
	  
	  
	  
	  
	$("#ecomma-node-form .form-textarea").bind("input", function(){
	  word_count = 0;
	  $("#ecomma-node-form .form-textarea").each(function(){
		//$(this).bind("change", function(){
		word_count += wordCount($(this).val());
		//});
	  });
	  $("#word_count").text(word_count);
	  if(word_count > 500 ){
		  $("#word_count_wrapper").addClass("overlimit");
		  $(".form-actions").addClass("overlimit");
		  $("#word_count_overlimit").show();
		  
	  }else if($("#word_count_wrapper").hasClass("overlimit")){
		  $("#word_count_wrapper").removeClass("overlimit");
		  $("#edit-actions").removeClass("overlimit");
		  $("#word_count_overlimit").hide();
	  }

	});
	  
	function wordCount(val){
	  var wom = val.match(/\S+/g);
		if(wom)
		  return wom.length 
			else
		  return 0;
	}
	  


  }
  };

	

})(jQuery);
