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
    self.Webcam = NodeWebcam.create( {
      width: payload.opts.width,
      height: payload.opts.height,
      quality: payload.opts.quality,
      delay: payload.opts.delay,
      saveShots: payload.opts.saveShots,
      output: payload.opts.output,
      device: payload.opts.device,
      callbackReturn: payload.opts.callbackReturn,
      verbose: payload.opts.verbose
    } );

  },

  socketNotificationReceived: function(notification, payload) {
    if(notification == "INIT_CAMERA") {
      this.initCamera(payload);
    }
    else if (notification == "TAKE_A_PICTURE") {
      var self = this;
      
      var picture_path = "~/Pictures/%y%m%d_%H%M%S";
      self.Webcam.capture( picture_path, function( err, data ) {} );
      
      sendNotification("AWS_MESSAGE", picture_path);
    }
  },

});
