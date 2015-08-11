
var cssreload = 
{
	stack : [],

	requestCss : function(url,id){
		$.ajax({
		    type: "GET",
		    url: url + "?r=" + Math.random(),
		    dataType: "json",
		    complete: function(data) {
		       cssreload.stashCss(data, id);
		    }
		});
	},

	stashCss : function(data,i){
		if ( !cssreload.stack[i].content )
		{
			cssreload.stack[i].content = data.responseText;
		} 
		else 
		{
			if ( cssreload.stack[i].content != data.responseText )
			{
				$("link[data-css-id='"+cssreload.stack[i].attribute+"']")[0].href = cssreload.stack[i].source + "?r=" + Math.random();
				cssreload.stack[i].content = data.responseText;
			}
		}
	},

	__getSources : function(){
		$.each(
			$("link[data-css-id]"),
			function(index,object)
			{
				var attr=$(object).attr("data-css-id");
				var src=$(object).attr("href");
				cssreload.stack.push
				(
					{
						"attribute":attr, 
						"source":src, 
						"content": ""
					}
				);
			}
		);
	},

	__doInterval : function(frequency){
		var _intervalcssreload=setInterval
		(
			function()
			{
				for ( var i=0;i<cssreload.stack.length;i++ )
					if ( cssreload.stack[i] )
						cssreload.requestCss(cssreload.stack[i].source,i);
						
			},frequency
		);
	},

	profiler : function(frequency){
		cssreload.__getSources();
		cssreload.__doInterval(frequency);
	}
	
}

$(document).ready(function(){cssreload.profiler(frequency);});


