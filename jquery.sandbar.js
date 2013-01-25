/*
 * jQuery Sandbar
 * Version 0.1
 * https://github.com/kevlawrence/jquery-sandbar
 *
 * Copyright (c) 2013 Kevin Lawrence
 * Licensed under the MIT license.
*/

(function($) {
	
	var STATE_COLLAPSED = "collapsed";
	var STATE_EXPANDED = "expanded";
	
	var ORIENTATION_LEFT = "left";
	var ORIENTATION_RIGHT = "right"
	
	var methods = {
		init : function(options) {
			var settings = $.extend({}, $.fn.sandbar.defaults, options);
			var sandbar = this.find('> .sandbar');
			var content = this.find('> .content');
			
			//store initial data that we need for restoration
			if (settings.orientation == ORIENTATION_RIGHT) {
				settings.originalMargin = content.css('marginRight');
			} else {
				settings.originalMargin = content.css('marginLeft');
			}
			settings.originalWidth = sandbar.css('width');
			
			this.data('settings', settings);
			
			//initialize either opened or closed
			if (settings.rememberState
				&& ($.cookie(settings.cookieName) == STATE_COLLAPSED || ($.cookie(settings.cookieName) == null && settings.startClosed))
				|| (!settings.rememberState && settings.startClosed)) {
				this.sandbar('close', true);
			} else {
				this.sandbar('open', true);
			}
		},
		toggle : function() {
			if (this.data('settings') == null) {
				$.error('The sandbar has not been initialized');
				return;
			}
			
			var sandbar = this.find('> .sandbar');
	        if (sandbar.is(':visible')) {
				this.sandbar('close');
	        } else {
				this.sandbar('open');
	        }
		},
		open : function(instant) {
			if (this.data('settings') == null) {
				$.error('The sandbar has not been initialized');
				return;
			}
			
			var settings = this.data('settings');
			var sandbar = this.find('> .sandbar');
			var content = this.find('> .content');
			var propertiesObj;
			
			if (settings.orientation == ORIENTATION_RIGHT) {
				propertiesObj = { marginRight: '+=' + settings.originalWidth };
			} else {
				propertiesObj = { marginLeft: '+=' + settings.originalWidth };
			}
			
			if (!instant) {
				content.stop(true, true).animate(propertiesObj, settings.animationTime, function() {
					sandbar.stop(true, true).fadeIn(settings.animationTime, function() {
						settings.openCallback.call(this);
					});
				});
			} else {
				sandbar.css('display', 'block');
				content.css(propertiesObj);
			}
			
			this.css('position', 'relative');	//needed for chrome
			sandbar.css('width', settings.originalWidth);
			sandbar.css('position', 'absolute');	//needed for chrome
			sandbar.css('top', '0px');
			sandbar.css('bottom', '0px');
			sandbar.css(settings.orientation, '0px');
			
			if (settings.rememberState) $.cookie(settings.cookieName, STATE_EXPANDED);
	    },
	    close : function(instant) {
			if (this.data('settings') == null) {
				$.error('The sandbar has not been initialized');
				return;
			}
			
			var settings = this.data('settings');
			var sandbar = $(this).find('> .sandbar');
			var content = $(this).find('> .content');
			
			if (settings.orientation == ORIENTATION_RIGHT) {
				propertiesObj = { marginRight: settings.originalMargin };
			} else {
				propertiesObj = { marginLeft: settings.originalMargin };
			}
			
			if (!instant) {
				sandbar.stop(true, true).fadeOut(settings.animationTime, function() {
					content.stop(true, true).animate(propertiesObj, settings.animationTime, function() {
						settings.closeCallback.call(this);
					});
				});
			} else {
				sandbar.css('display', 'none');
				content.css(propertiesObj);
			}
			
			if (settings.rememberState) $.cookie(settings.cookieName, STATE_COLLAPSED);
	    }
	}
	
	$.fn.sandbar = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.sandbar');
		}
	};

	$.fn.sandbar.defaults = {
		animationTime: 400,
		cookieName: 'sandbar',
		rememberState: true,
		width: "200px",
		orientation: "right",
		startClosed: true,
		openCallback: function() {},
		closeCallback: function() {}
	};
	
})(jQuery);