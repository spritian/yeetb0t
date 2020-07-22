# yeetb0t

- Bot joins a specific voice channel
- It will greet users of that voice channel with greeting.mp3 (broken; currently, it will do it when they mute,stream,etc, but still works and I don't mind it!)
- Send it a direct message with any of the mp3 names and it'll play the mp3 as if it were a user speaking!
- Send 'random' to the bot to randomly play an mp3!
- Send '?' to the bot to get a list of all supported commands!

- Convert wav -> mp3 oneliner: for f in *.wav ; do ffmpeg -i "$f" "${f%.*}.mp3"; done
