const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
});

/*client.on('message', message =>{
    if (message.content.startsWith(`${prefix}test`)) {
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
});*/

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


client.on("guildMemberAdd", async(member)=>{
    let guild = client.guilds.cache.get("");
    let channel = client.channels.channel.get("729797123649830912");
    if(guild == member.guild){
        //channel.send(`Bem vindo(a), ${member.user}!!! Leia as <#729795085788643408> e faça seu <#729795259340685414>. Divirta-se`);
        let embed = new Discord.MessageEmbed()
        embed.setColor('#8a5fb0')
        embed.setAuthor(member.user.tag, member.user.displayAvatarURL())
        embed.setTitle('Boas-Vindas')
        embed.setImage('https://thumbs.gfycat.com/FrayedNimbleCat-max-1mb.gif')
        embed.setDescription(`Bem vindo(a), ${member.user}!!! Leia as <#729795085788643408> e faça seu <#729795259340685414>. Divirta-se`)
        embed.addField('Canais', 'Leia as <#729795085788643408> \n Faça seu <#729795259340685414>. Divirta-se')
        embed.setThumbnail(member.user.displayAvatarURL({dynamic: true, format: "png", size : 1024}))
        embed.setTimeStamp()
        await channel.send(embed);
    }
    
});

client.login(token);