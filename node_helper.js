/*
*
*/
'use strict';

var NodeHelper = require("node_helper");
var NodeWebcam = require("node-webcam");
var exec = require('child-process-promise').exec;
var moment = require('moment');

module.exports = NodeHelper.create({

  start: function() {
    console.log("Starting node helper for: " + this.name);
  },

  initCamera: function(payload) {
    var self = this;
    this.Webcam = NodeWebcam.create(payload.opts);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification == "INIT_CAMERA") {
      this.initCamera(payload);
    }
    else if (notification == "TAKE_A_PICTURE") {
      var self = this;
      
      var filename = moment().format('YYMMDD_HHmmss');
      var picture_path = "~/Pictures/" + filename;
      self.Webcam.capture( picture_path, function( err, data ) {} );
      self.path = picture_path + "." + payload;
      
      self.sendSocketNotification("SEND_SOCKET", picture_path);
    }

   },

});
