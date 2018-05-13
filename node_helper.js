/*
*
*/
'use strict';

var NodeHelper = require("node_helper");
var WebCamera = require("webcam.js");

	var wcm = new WebCamera({
		videoTag: document.getElementyId("video"),
		constraints: {
			video: {
				width: 640,
				height: 480,
			}
		}
	});

module.exports = NodeHelper.create({

  initCamera: function(payload) {
	var self = this;

  }
	
  socketNotificationReceived: function(notification, payload) {
    if (notification === 'CAMERA_ON') {

	    wcm.startCamera();
	    wcm.grabFrame().then(function(imageBitmap) {
	    var canvas = document.getElementById("canvas");
	    canvas.width = imageBitmap.width;
	    canvas.height = imageBitmap.height;
	    var ctx = canvas.getContext("2d");
	    ctx.drawImage(imageBitmap, 0, 0);
	    });
    }
    else if (notification === "TAKE_A_PICTURE") {
	wcm.takePhoto().then(function(blob) {
		return window.createImageBitmap(blob);
	}).then(function (imageBitmap) {
		var canvas = document.getElementById("canvas");
		canvas.width = imageBitmap.width;
		canvas.height = imageBitmap.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(imageBitmap, 0, 0);
	});
    }
    else if (notification === "CAMERA_OFF") {
	 //   wcm.stopCamera();

    }
  },

  socketNotificationReceived: function(notification, payload) {
	  if(notification == "CAMERA_INIT") {
		  console.log("camera initializing");
		  this.initCamera(payload);
	  }
  },

});
