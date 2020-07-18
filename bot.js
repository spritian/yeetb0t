const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  const mp3s = ['crumbled', 'eating', 'fail', 'fuckyou', 'listen', 'lol', 'm995', 'yea', 'opatski', 'scav', 'nicework', 'youregood', 'dn', 'troll1', 'soon', 'feature', 'greeting', 'annoying', 'invite1', 'labs', 'labs-cargo', 'labs-hangar', 'labs-main', 'labs-med', 'labs-parking', 'died', 'nade', 'shh', 'run', 'semantics', 'ohyouredead', 'lol2', 'lol3'];
  
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

