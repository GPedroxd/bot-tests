module.exports = {
    "name": "leave",
    "description": "sai da call",
    execute(message, args) {
        if(message.member.voice.channel){
            message.member.voice.channel.leave();
        }
    }
}