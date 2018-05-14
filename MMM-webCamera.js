
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
	  Log.log("Starting module: MMM-webCamera");
	  var self = this;
	  this.sendSocketNotification("CAMERA_INIT", self.config);
  },

  notificationReceived: function(notification, payload, sender) {
	  if(sender) {
			if (notification === "COMMAND") {
				if (payload === " camera on"){
					this.sendSocketNotification("CAMERA_ON", payload);
				}
				else if (payload === " take a picture") {
					this.sendSocketNotification("TAKE_A_PICTURE", payload);
				}
				else if (payload === " camera off") {
					this.sendSocketNotification("CAMERA_OFF", payload);
				}
			}
	  }
  },

	socketNotificationReceived: function(notification, payload) {
		
	},

});
