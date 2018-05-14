/*
*
*/
'use strict';

var NodeHelper = require("node_helper");
var WebCamera = require("webcam.js");

module.exports = NodeHelper.create({

  start: function() {
    console.log("Starting node helper for: " + this.name);
  },

  initCamera: function(payload) {

  },

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


});
