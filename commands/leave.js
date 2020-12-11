module.exports = {
    "name": "leave",
    "description": "sai da call",
    execute(message, args) {
        message.member.voice.channel.leave();
        console.log(' hj');
        if(message.member.voice.channel){
            console.log('era pra ser hj');
            message.member.voice.channel.leave();
        }
    }
}