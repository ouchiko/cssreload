
/**
 * CSSRELOAD
 * Copyright (C) 2015 - All Rights Reserved - @ouchy
 * Contact: James Holden <ouchiko@gmail.com>
 * Contact: @ouchy via Twitter
 *
 * Allows a developer/designer to insert this script to monitor for
 * changes in your CSS and reload those changes without the need to 
 * refresh the browser or install browser based plugins.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 **/


var cssreload = 
{
   
   	stack				: [],			// Stack store of css elements
   	csrdetails			: 				// Basic details settings.
   	{
		frequency:5000,
		enableButton:false
	},
    _intervalcssreload 	: null,			// Interval variable

    /**
     * Enable a small position fixed button at the bottom to turn
     * on or off the process.
     */
    addButtonElement : function(){
    	var button = document.createElement("input");
    	$(button).css({'position':'fixed','bottom':'0','left':'0'});
    	$(button).val("Stop CSS reload");
    	$(button).attr("type", "button");
    	$(button).attr("data-state","on");
    	$(button).click(function(){
    		var current_state = $(this).attr("data-state");
    		if ( current_state == "on" )
    		{
    			$(this).val("Start CSS reload");
    			$(this).attr("data-state","off");
				clearInterval(cssreload._intervalcssreload);    			
    		} 
    		else
    		{
    			$(this).val("Stop CSS reload");
    			$(this).attr("data-state","on");
    			cssreload.__doInterval();
    		}

    	});
    	$("body").append($(button));
    },

    /**
     * Request the CSS files from the server
     * Once complete push them to stash
     * @param url <css uri>
     * @param id <stack id>
     */
    __requestCss: function(url, id) {
        $.ajax({
            type: "GET",
            url: url + "?r=" + Math.random(),
            dataType: "json",
            complete: function(data) {
                cssreload.__stashCss(data, id);
            }
        });
    },

    /**
     * Basic difference compare between the origin CSS and the newly
     * loaded element
     * @param sourcefile <string>
     * @param origin <string>
     * @param current <string>
     */
    __diff : function( sourcefile, origin, current ){
    	var diff_record = ''; 
    	var origin_lines = origin.split("\n");
    	var current_lines = current.split("\n");
    	for ( var i = 0 ; i < origin_lines.length ; i++ ){
    		if ( origin_lines[i] != current_lines[i] && current_lines[i] ){
    			console.log(sourcefile + ": + " + current_lines[i]);
    		}
    	}	
    },

    /**
     * Stashes the CSS into the stack.  If we find a change then
     * we simply reload the CSS file, replacing the old content
     * @param data <response text from ajax>
     * @param i <stash id>
     */
    __stashCss: function(data, i) {
        if (!cssreload.stack[i].content) {
            cssreload.stack[i].content = data.responseText;
        } else {
            if (cssreload.stack[i].content != data.responseText) {
            	cssreload.__diff(cssreload.stack[i].source, cssreload.stack[i].content, data.responseText);
                $("link[data-css-id='" + cssreload.stack[i].attribute + "']")[0].href = cssreload.stack[i].source + "?r=" + Math.random();
                cssreload.stack[i].content = data.responseText;
            }
        }
    },

    /**
     * Runs through the document and loads in any link elements which have
     * a declared data-css-id attribute
     */
    __getSources: function() {
        $.each(
            $("link[data-css-id]"),
            function(index, object) {
                var attr = $(object).attr("data-css-id");
                var src = $(object).attr("href");
                cssreload.stack.push({
                    "attribute": attr,
                    "source": src,
                    "content": ""
                });
            }
        );
    },

    /**
     * Creates the checking interval.  Determined by the frequency defined by the user
     * @param frequency <milliseconds>
     */
    __doInterval: function() {
        cssreload._intervalcssreload = setInterval(
            function() {
                for (var i = 0; i < cssreload.stack.length; i++)
                    if (cssreload.stack[i])
                        cssreload.__requestCss(cssreload.stack[i].source, i);

            }, cssreload.csrdetails.frequency
        );
    },

    /**
     * Main construct
     * @param frequency <milliseconds>
     */
    profiler: function(csrdetails) {
    	cssreload.csrdetails = csrdetails;
        cssreload.__getSources();
        cssreload.__doInterval();

        if (cssreload.csrdetails.enableButton)
        	cssreload.addButtonElement();
    }

}

/** RUNNER **/
$(document).ready(function() {
    cssreload.profiler(csrdetails);
});
