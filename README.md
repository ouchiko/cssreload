# cssreload

Allows a developer/designer to insert this script to monitor for
changes in your CSS and reload those changes without the need to 
refresh the browser or install browser based plugins.

Add JQuery to your HTML (if it's not there already).  Add the configuration details
which determine the frequency of checking and whether or not you want a button
visible to switch on/off the reloading.

<!-- Requirement -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script>
	var csrdetails = {
		enableButton: true,
		frequency: 2000
	}
	</script>
	<script type="text/javascript" src="js/cssreload.min.js"></script>
<!-- End Requirement -->


Your CSS needs only one small adjustment.  Within the <link> node you need to 
add a new attribute called "data-css-id".  This needs to be a unique ID so we
can store and use this as our reference.

< link rel="stylesheet" type="text/css" href="/demo/css/demo.css" data-css-id="demo-item" >

That's it.  Refresh your page and CSS reloader should be running.  Please ensure that you
remove this when you go live :)

Contact: James Holden <ouchiko@gmail.com>
Contact: @ouchy via Twitter.
