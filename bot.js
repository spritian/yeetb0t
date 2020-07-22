const Discord = require('discord.js');
const client = new Discord.Client();

const mp3folder = '/root/discord/mp3/';
const mp3s = [];
const fs = require('fs');

fs.readdir(mp3folder, (err, files) => {
  files.forEach(file => {
    var f=file.split('.').slice(0, -1).join('.')
    mp3s.push(f);
  });
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(mp3s);
});

client.on('message', msg => {
  if (msg.content == "?") {
    msg.reply(mp3s);
  }

  if (msg.content == "random") {
    var random = mp3s[Math.floor(Math.random() * mp3s.length)];
    msg.content = random;
    console.log("Received random request... and the winner is: " + random);
  }

  if (mp3s.includes(msg.content)) {
    console.log("Found in array?: " + mp3s.includes(msg.content));
    msg.reply('Roger that!');

    const channel = client.channels.cache.get("650957018877788180");

    channel.join().then(connection => {
       console.log("Joining!");
       const dispatcher = connection.play('/root/discord/mp3/' + msg.content + '.mp3');
       dispatcher.on('start', () => {
          console.log(msg.content + '.mp3 is now playing!');
       });

       dispatcher.on('finish', () => {
          console.log(msg.content + '.mp3 has finished playing!');
          //channel.leave();
       });
       
       dispatcher.on('error', console.error);
    }).catch(e => {
       console.error(e);
    });
  }
});

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
