module.exports = {
    'name': 'play',
    'description': 'toca uma musica',
    execute(message, args) {
        play(message, args);
    }
}
async function play(message, args) {
    console.log(args);
    if (message.member.voice.channel) {
        const ytdl = require('ytdl-core-discord');
        const { OpusEncoder } = require('@discordjs/opus');
        const fs = require('fs');

        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play('nirvana.mp3');
        connection.play('nirvana.mp3', { volume: 1 });
        console.log(dispatcher);
        dispatcher.on('start', () => {
            console.log('ja é alguma coisa');
        });
        dispatcher.pause();
        dispatcher.resume();
        dispatcher.on('finish', () => {
            console.log('não é alguma coisa');
        });
        dispatcher.on('error', console.error);
    } else {
        message.channel.send('não okay!');
    }
}