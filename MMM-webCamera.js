
Module.register("MMM-webCamera", {
	defaults: {
		opts: [
			{
    	  			width: 1280,
				height: 720,
				quality: 100,
				delay: 0,
				saveShots: true,
				output: "jpg",
				device: false,
				callbackReturn: "location",
      				verbose: false
			},
		],
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
				if (payload == " take a picture") {
					console.log("take a picture");
					self.sendSocketNotification("TAKE_A_PICTURE", payload);
				}
			}
	  }
  },

  socketNotificationReceived: function(notification, payload) {
	var self = this;
	if(notification == "SEND_SUCCESS") {
		self.sendSocketNotification("RECEIVE_SUCCESS", payload);
		console.log("123" + payload);
	}
	else if(notification == "SEND_FINISH") {
		self.sendSocketNotification("RECEIVE_FINISH", payload);
		console.log("453" + payload);
	}
  }

});
