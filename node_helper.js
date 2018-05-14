/*
*
*/
'use strict';

var NodeHelper = require("node_helper");
var WebCamera = require("webcam.js");

var wcm;

module.exports = NodeHelper.create({

  initCamera: function(payload) {
	   var self = this;
     sendSocketNotification: function(notification, payload) {
       wcm = new WebCamera({
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
    }
  }

  socketNotificationReceived: function(notification, payload) {
    if (notification === 'CAMERA_ON') {

      wcm.startCamera();

      //grabFrame() takes a snapshot of the live video
      wcm.grabFrame().then(function (imageBitmap) {

      var canvas = document.getElementById("canvas");
      canvas.width = imageBitmap.width;
      canvas.height = imageBitmap.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(imageBitmap, 0, 0);
    }
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
    else if (notification === "CAMERA_OFF") {
	     wcm.stopCamera();
    }
  },

  socketNotificationReceived: function(notification, payload) {
	  if(notification == "CAMERA_INIT") {
		  console.log("camera initializing");
		  this.initCamera(payload);
	  }
  },

});
