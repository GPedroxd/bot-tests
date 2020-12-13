module.exports = {
    "name": "leave",
    "description": "sai da call",
    execute(message, args) {
        message.member.voice.channel.leave();
        if(message.member.voice.channel){
            message.member.voice.channel.leave();
        }
    }
}