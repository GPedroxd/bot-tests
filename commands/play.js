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
        const ytdl = require('ytdl-core');
        message.member.voice.channel.join().then(connection =>{
            console.log('conectado!');
            const stream = ytdl(args[0], {filter: "audioonly",
                                        quality: "highestaudio",
                                        volume: 0.5});
            console.log('stream criada!');
            const dispatcher = connection.play(stream);
            console.log('ta tocando?');
            dispatcher.on('start', ()=> console.log('começou'));
            dispatcher.on('finish', () => console.log('acabou!!!'));
            dispatcher.on('error', console.error);
        });
    } else {
        message.channel.send('entra numa call primeiro, animal.');
    }
}