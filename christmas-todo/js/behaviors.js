/*
	Function  :xxxx
	Author    :xxxx
	Build_Date:2015-x-x
	Version   :0.0
 */

var fadeIn = {
      lastUpdate: 0,
      INTERVAL:500,
      opacity:0,
      OP_STEP:0.1,

       execute: function (sprite, context, time) {
          // time=+new Date();
          if (time - this.lastUpdate > this.INTERVAL && this.opacity<1) {
             this.opacity += this.OP_STEP;
             context.globalAlpha = this.opacity.toFixed(1);
             this.lastUpdate = time;

          }
          
       }
    },

    fadeOut = {
      lastUpdate: 0,
      INTERVAL:500,
      opacity:1,
      OP_STEP:0.1,

       execute: function (sprite, context, time) {
          time=+new Date();
          if (time - this.lastUpdate > this.INTERVAL && this.opacity<1) {
             this.opacity -= this.OP_STEP;
             context.globalAlpha = this.opacity;
             this.lastUpdate = time;
          }
       }
    };
	