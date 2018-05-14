/*
*
*/
'use strict';

var NodeHelper = require("node_helper");
var WebCamera = require("webcam.js");

/*
var wcm = new WebCamera({
  videoTag: document.getElementById("video"),
    constraints: {
      video: {

        width: payload.width,
        height: payload.height,
         quality: payload.quality,
         delay: payload.delay,
         saveShots: payload.saveShots,
         output: payload.output,
         device: payload.device,
         callbackReturn: payload.callbackReturn,
    }
 }
});
*/

module.exports = NodeHelper.create({

  start: function() {
    console.log("Starting node helper for: " + this.name);
  },


  socketNotificationReceived: function(notification, payload) {

    if(notification === "INIT_CAMERA") {
      this.initCamera(payload);
    }

    if (notification === 'CAMERA_ON') {

    }

    else if (notification === "TAKE_A_PICTURE") {

    }

    else if (notification === "CAMERA_OFF") {

    }

  },



});
