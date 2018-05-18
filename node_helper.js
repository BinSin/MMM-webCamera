/*
*
*/
'use strict';

var NodeHelper = require("node_helper");
var NodeWebcam = require("node-webcam");
var exec = require('child-process-promise').exec;
var moment = require('moment');
var opts = {};
var Webcam = null;

module.exports = NodeHelper.create({

  start: function() {
    console.log("Starting node helper for: " + this.name);
  },

  initCamera: function(payload) {
    var self = this;
    this.Webcam = NodeWebcam.create( {
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
      
      var picture_path = "~/Pictures/" + moment().format('YYMMDD_HHmmss');
      self.Webcam.capture( picture_path, function( err, data ) {} );
      
      setTimeout(function() {
        exec('sudo fbi -T 2 ' + picture_path + '.' + 'jpg');
      }, 4500);
        
      setTimeout(function() {
        exec("sudo /bin/kill $(ps aux | grep '$search_terms' | grep -v 'grep' | awk '{print $2}')");
      }, 7500);

      self.sendNotification("AWS_MESSAGE", payload);
    }

  },

});
