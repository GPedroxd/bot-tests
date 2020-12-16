var queue = [];
module.exports = {
    'name': 'play',
    'description': 'toca uma musica',
    execute(message, args) {
        if (message.member.voice.channel) {
            if (queue.length > 0) {
                queue.push(args[0]);
                message.channel.send('Essa musica está na posição ' + (queue.length - 1) + ' da fila.');
            } else {
                queue.push(args[0]);
                play(message);
            }
        } else {
            message.channel.send('entra numa call primeiro, animal.');
        }
    }
}
const ytdl = require('ytdl-core');
async function play(message) {
    message.member.voice.channel.join().then(connection => {
        const stream = ytdl(queue[0], {
            filter: "audioonly",
            quality: "highestaudio",
        });
        const dispatcher = connection.play(stream);
        dispatcher.setVolume(0.25);
        dispatcher.on('start', () => console.log('começou'));
        dispatcher.on('finish', () => {
            queue.shift();
            if (queue.length > 0) {
                play(message);
            } else {
                setTimeout(() => {
                    message.member.voice.channel.leave();
                }, 30000);
            }
        });
        dispatcher.on('error', console.error);
    });
}