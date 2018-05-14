/*
*
*/
'use strict';

var NodeHelper = require("node_helper");
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

});
