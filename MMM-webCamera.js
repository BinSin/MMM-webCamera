'use strict';

Module.register("MMM-webCamera", {
	defaults: {
        width: 1280,
				height: 720,
				quality: 100,
				delay: 0,
				saveShots: true,
				output: "jpeg",
				device: false,
				callbackReturn: "location",
	},

  start: function() {
		Log.log("Start webCamera");
  },

  notificationReceived: function(notification, payload, sender) {
		if (notification === "CAMERA_ON") {
			if (payload === "take a picture"){
				sendSocketNotification(notification, payload);
			}
		}
	},

});
