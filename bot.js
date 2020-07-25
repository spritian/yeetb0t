const Discord = require('discord.js');
const client = new Discord.Client();

const mp3folder = '/root/discord/mp3/';
const mp3s = [];
const mp3sdisp = [];
const mp3srandom = [];
const fs = require('fs');

fs.readdir(mp3folder, (err, files) => {
  files.forEach(file => {
    var f=file.split('.').slice(0, -1).join('.')
    mp3s.push(f);

    //const regex = /usec3/g;
    //const found = f.match(regex);
    //if (found) {
      mp3srandom.push(f);
    //} else {
      mp3sdisp.push(f);
    //}
  });
});

setInterval(function() {
  processreq('random-auto');
}, 300000);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(mp3srandom);
  console.log(mp3s);
});

client.on('message', processreq);

function processreq(msg) {
  if (msg != "random-auto") {
    var item = msg.content;
  } else {
    var item = "random";
  }

  if (item == "?") {
    msg.reply(mp3sdisp);
  }

  if (item == "random" && msg != "random-auto") {
    var random = mp3s[Math.floor(Math.random() * mp3s.length)];
    item = random;
    console.log("Received random request... and the winner is: " + random);
  } else if (msg == "random-auto") {
    var random = mp3srandom[Math.floor(Math.random() * mp3srandom.length)];
    item = random;
    console.log("Auto random request... and the winner is: " + random);
  }

  if (mp3s.includes(item)) {
    if (msg != "random-auto") {
      msg.reply('Roger that!');
    }

    console.log("Found in array?: " + mp3s.includes(item));

    const channel = client.channels.cache.get("650957018877788180");

    channel.join().then(connection => {
       console.log("Joining!");
       const dispatcher = connection.play('/root/discord/mp3/' + item + '.mp3');
       dispatcher.on('start', () => {
          console.log(item + '.mp3 is now playing!');
       });

       dispatcher.on('finish', () => {
          console.log(item + '.mp3 has finished playing!');
          //channel.leave();
       });
       
       dispatcher.on('error', console.error);
    }).catch(e => {
       console.error(e);
    });
  }
}

client.on('voiceStateUpdate', (oldState, newState) => {
  if (newState.channelID == "650957018877788180") {
    const channel = client.channels.cache.get("650957018877788180");
   
    // if someone stops streaming, play action 
    if (newState.streaming == false && oldState.streaming == true) {
	var action = "stream";
    }

    // if someone mutes
    if (newState.selfMute == true && oldState.selfMute == false) {
	var action = "fuckyou";
    } else if (newState.selfMute == false && oldState.selfMute == true) {
	var action = "greeting";    
    }

    // someone joins the channel
    if (newState.channel != oldState.channel) {
	var action = "greeting";
    }

    channel.join().then(connection => {
       if (action) {
          console.log("Joining!");
          const dispatcher = connection.play('/root/discord/mp3/' + action + '.mp3');
          dispatcher.on('start', () => {
             console.log('VoiceUpdate ' + action + ' is playing!');
          });

          dispatcher.on('finish', () => {
             console.log('VoiceUpdate action ended!');
             //channel.leave();
          });

          dispatcher.on('error', console.error);
       }
    }).catch(e => {
       console.error(e);
    });
  }
});

client.login('YOURTOKEN');
