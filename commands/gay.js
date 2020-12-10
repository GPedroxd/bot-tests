module.exports = {
    name: 'gay',
    description: 'sua porcentagem gay',
    execute(message, args){
        let pgay = Math.floor(Math.random() * 101)
        message.channel.send(`${message.author}, você é `+ pgay+`% gay.`);
    }
}