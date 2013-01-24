jQuery Sandbar
==============

Sandbar is a jQuery plugin that lets you slide content into your pages.

Demo
----

Coming soon.

Usage
-----

First, the HTML needs to be setup in a particular format, like this:

    <div id="container">
      <div class="content">Content goes here</div>
      <div class="sandbar">Sandbar goes here</div>
    </div>

And second, the jQuery to get it going.

    $(document).ready(function() {
      $('#container').sandbar({
    		cookieName: 'sandbar',
  			rememberState: true,
  			orientation: "right",
  			animationTime: 300,
  			startClosed: true,
  			openCallback: function() {},
  			closeCallback: function() {}
  		});
    });

