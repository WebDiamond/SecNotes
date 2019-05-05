===== /modules/x.js
const find = require('find-process');
const macaddr = require('getmac');
module.exports = {
    checkproc: function(){
      find('name', 'vmware', true)
        .then(function(){
          console.log('vm detected process!');
      });
      find('name', 'virtualbox', true)
        .then(function(){
          console.log('vm detected process!');
      });
   },
   checkmacaddr: function(){
   if ( macaddr.isMac("08:00:27") ) {
    console.log('vm detected!')
   }
   if ( macaddr.isMac("00:1C:14") ) {
    console.log('vm detected!')
   }
   if ( macaddr.isMac("00:50:56") ) {
    console.log('vm detected!')
   }
  }
};


===== /app.js

const require('/modules/x');
x.checkproc();
x.checkmacaddr();
