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
var wcm = new WebCamera({
       videoTag: document.getElementById("video"),
       constraints: {
           video: {
               width: 640,
               height: 480,
           }
       }
   });

 wcm.startCamera();


module.exports = NodeHelper.create({

  start: function() {
    console.log("Starting node helper for: " + this.name);
  },

  initCamera: funtion(payload) {

  },

  socketNotificationReceived: function(notification, payload) {
    if(notification === "INIT_CAMERA") {
      this.initCamera(payload);
    }

    if (notification === 'CAMERA_ON') {

      wcm.startCamera();

      //grabFrame() takes a snapshot of the live video
      wcm.grabFrame().then(function (imageBitmap) {

      var canvas = document.getElementById("canvas");
      canvas.width = imageBitmap.width;
      canvas.height = imageBitmap.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(imageBitmap, 0, 0);

     });

    }
    /*
    else if (notification === "TAKE_A_PICTURE") {
      //take photo
      wcm.takePhoto()
         .then(function (blob) {
             return window.createImageBitmap(blob);
         })
         .then(function (imageBitmap) {

             var canvas = document.getElementById("canvas");
             canvas.width = imageBitmap.width;
             canvas.height = imageBitmap.height;
             var ctx = canvas.getContext("2d");
             ctx.drawImage(imageBitmap, 0, 0);
         });

    }
     */
    else if (notification === "CAMERA_OFF") {
	     wcm.stopCamera();
    }

  },

});
