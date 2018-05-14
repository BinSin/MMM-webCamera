/*
*
*/
'use strict';

var NodeHelper = require("node_helper");
var WebCamera = require("webcam.js");
var NodeWebcam = require("node-webcam");
var opts = {};
var Webcam = null;

module.exports = NodeHelper.create({

  start: function() {
    console.log("Starting node helper for: " + this.name);
  },

  initCamera: function(payload) {
    var self = this;
    self.opts = {
      width: 1280,
      height: 720,
      quality: 100,
      delay: 0,
      saveShots: true,
      output: "jpeg",
      device: false,
      callbackReturn: "location",
      verbose: false
    };
  },

  socketNotificationReceived: function(notification, payload) {
    if(notification == "INIT_CAMERA") {
      this.initCamera(payload);
    }
    if (notification == 'CAMERA_ON') {
      var self = this;
      self.Webcam = NodeWebcam.create( opts );
      self.sendSocketNotification("SEND", opts);
    }
    else if (notification == "TAKE_A_PICTURE") {
      var self = this;
      self.sendSocketNotification("SENDER", "abc");
      self.Webcam.capture( "test_picture", function( err, data ) {} );
    }
  },

/*
  socketNotificationReceived: function(notification, payload) {
    var self = this;
    var wcm = null;

    if(notification == "INIT_CAMERA") {
      initCamera(payload);
    }

    if (notification == 'CAMERA_ON') {
        wcm = new WebCamera({
           videoTag: document.getElementById("video"),
           constraints: {
               video: {
                   width: payload.width,
                   height: payload.height,
               }
           }
       });
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

    else if (notification == "TAKE_A_PICTURE") {
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

    else if (notification == "CAMERA_OFF") {
      wcm.stopCamera();
    }

  },

*/
});
