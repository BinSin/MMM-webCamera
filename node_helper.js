/*
*
*/
'use strict';

var NodeHelper = require("node_helper");
var NodeWebcam = require( "node-webcam" );
var Webcam = NodeWebcam.create({});

module.exports = NodeHelper.create({

  socketNotificationReceived: function(notification, payload) {
    if (notification === 'CAMERA_ON') {
      console.log("camera on");
      NodeWebcam.capture( "my_picture", {}, function( err, data ) {
        if ( !err ) console.log( "Image created!" );
      });
    }
  }

});
