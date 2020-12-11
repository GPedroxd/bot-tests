const Discord = require('discord.js');
module.exports = {
    name: 'test',
    description: '!test',
    execute(message, args){
        let embed = new Discord.MessageEmbed()
        embed.setColor('#8a5fb0')
        embed.setAuthor('Teste', 'https://lh3.googleusercontent.com/proxy/R5nzyRvNOTr4seQVpd-tOP0amg832g1SRiU-WDQ1e9SxM1dMTPGCDGm4Im5kSUcT-NVtwwToGrtR-F2HgF84guMfguatcM_OftVuTFMHwKu1UFIrs5XPhvfI1CxX2hL28K-kF9CO7WOh3Q')
        embed.setTitle('Boas-Vindas')
        embed.setImage('https://thumbs.gfycat.com/FrayedNimbleCat-max-1mb.gif')
        embed.setDescription(`Bem vindo(a), ${message.author}!!!`)
        embed.addField('Canais', 'Leia as <#729795085788643408> \n Faça seu <#729795259340685414>. Divirta-se')
        embed.setThumbnail('https://lh3.googleusercontent.com/proxy/R5nzyRvNOTr4seQVpd-tOP0amg832g1SRiU-WDQ1e9SxM1dMTPGCDGm4Im5kSUcT-NVtwwToGrtR-F2HgF84guMfguatcM_OftVuTFMHwKu1UFIrs5XPhvfI1CxX2hL28K-kF9CO7WOh3Q')
        embed.setTimestamp();
        message.channel.send(embed)
    }
}