const Discord = require('discord.js');
const client = new Discord.Client();

const mp3folder = '/root/discord/mp3/';
const mp3s = [];
const mp3srandom = [];
const fs = require('fs');

fs.readdir(mp3folder, (err, files) => {
  files.forEach(file => {
    var f=file.split('.').slice(0, -1).join('.')

    const regex = /usec3/g;
    const found = f.match(regex);
    if (found) {
      mp3srandom.push(f);
    } else {
      mp3s.push(f);
    }
  });
});

setInterval(function() {
  processreq('random-auto');
}, 120000);

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
    msg.reply(mp3s);
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

    channel.join().then(connection => {
       console.log("Joining!");
       const dispatcher = connection.play('/root/discord/mp3/greeting.mp3');
       dispatcher.on('start', () => {
          console.log('Greeting is playing!');
       });

       dispatcher.on('finish', () => {
          console.log('Greeting ended!');
          //channel.leave();
       });

       dispatcher.on('error', console.error);
    }).catch(e => {
       console.error(e);
    });
  }
});

client.login('YOURTOKEN');
