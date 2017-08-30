(function($){

	Drupal.behaviors.irayo = {
	  attach: function (context, settings) {

	  	var irayo_base_url = Drupal.settings.basePath + 'irayo/';

	    // Add a button to initiate irayo.
	    // Click on that button will fetch list of keywords.
		$('#irayo', context).append(button('Irayo', 'initiate')).click(function(){
			// Define content and intent.
			params = {
						"content": Drupal.settings.irayo.content,
						"intent": Drupal.settings.irayo.intent
					 };
			// Call index endpoint.
			var data = irayo_api_get('index', params);
			data = $.parseJSON(data.response);
			// Add each keyword as button.
			$.each(data.content_keywords, function(key, val){
		  		$('#irayo_keywords').append(button(val, val));
		  	});
		  	// Get volume on click over a keyword.
			$('#irayo_keywords input').click(function(){
				// Prepare parameters object.
				params = {
						"keyword": $(this).val(),
						"content_id" : data.content_id
					 };
				// Call keywordswithvolume endpoint.
				var vol = irayo_api_get('keywordswithvolume', params);
				vol = $.parseJSON(vol.response);
				console.log(data.content_id);
			});
		});

		// Call API.
		function irayo_api_get(endpoint, params) {
			return $.ajax({
			  url:irayo_base_url+endpoint,
			  type:"POST",
			  data:params,
			  async: false,
			  dataType:"json",
			  error: function(e){
			  	console.log(e);
			  }
			});
		}

	  }
	};

	// Construct irayo buttons.
	function button(val, id) {
		return '<input id="#'+id+'" class="irayo-form-submit" type="button" value="'+val+'"/>';
	}

})(jQuery);