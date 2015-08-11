# cssreload

Simply add this javascript file along with jquery and "cssreload" is ready to go.

<!-- Requirement -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script>var frequency=2000;</script>
	<script type="text/javascript" src="js/cssreload.obs.js"></script>
<!-- End Requirement -->

** frequency is the time, in milliseconds, at which you want to monitor for changes.

In your CSS <link> nodes add an attribute "data-css-id" with a unique value per node. 

< link rel="stylesheet" type="text/css" href="/demo/css/demo.css" data-css-id="demo-item" >

That's it.  cssreload will monitor for changes in the CSS and load them into the DOM as and when they happen.  
There is no page refresh or other browser extensions to install.
