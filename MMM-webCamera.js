/*
 * Author : BinSin
 * https://github.com/BinSin/MMM-webCamera
 */

Module.register("MMM-webCamera", {
  defaults: {
	opts: [
		{
    	  		width: 1280,
			height: 720,
			quality: 100,
			delay: 0,
			saveShots: true,
			device: false,
			output: "jpg",
			callbackReturn: "location",
      			verbose: false,
		},
	],
  },

  start: function() {
	 var self = this;
	 Log.log("Starting module: " + this.name);

  },

  getDom: function() {
	 var wrapper = document.createElement("div");
	 wrapper.innerHTML = "<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS55KmFrEQHUiHC1akm_tApSeDRBEb5a4X_h6udq5t8HWqRz9ym' width='300' height='240' />";
	 wrapper.className = "picture";
	 return wrapper;
  },

  notificationReceived: function(notification, payload, sender) {
	 var self = this;
	 if(sender) {
		if (notification == "COMMAND") {
			if (payload == " take a picture") {
				console.log("take a picture");
				self.sendSocketNotification("TAKE_A_PICTURE", self.config.opts[0].output);
			}
		}
	 }
  },
  
   socketNotificationReceived: function(notification, payload) {
	   var self = this;
	   if(notification == "SEND_SOCKET") {
		   console.log("send path to AWS");
		   self.sendNotification("SEND_AWS", payload);
	   }
   },

});
