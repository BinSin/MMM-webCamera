
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
		var self = this;
	  Log.log("Starting module: " + this.name);
		this.sendSocketNotification("INIT_CAMERA", self.config);
  },

  notificationReceived: function(notification, payload, sender) {
		var self = this;
	  if(sender) {
			if (notification == "COMMAND") {
				if (payload == " camera on"){
					console.log("camera on");
					self.sendSocketNotification("CAMERA_ON", payload);
				}
				else if (payload == " take a picture") {
					console.log("take a picture");
					self.sendSocketNotification("TAKE_A_PICTURE", payload);
				}
				else if (payload == " camera off") {
					console.log("camera off");
					self.sendSocketNotification("CAMERA_OFF", payload);
				}
			}
	  }
  },

});
