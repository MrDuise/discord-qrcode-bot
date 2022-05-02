const { Client, Intents, Interaction } = require("discord.js");
const { token } = require("./config.json");
const fetch = require('node-fetch');

//create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//when the client is ready, run this code(only once)
client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'server') {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    } else if (commandName === 'user') {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    } else if (commandName === 'qrcode') {
        await interaction.deferReply();
        const data = interaction.options.getString('data');
        const query = new URLSearchParams({ data });
        const qrcode = `https://api.qrserver.com/v1/create-qr-code/?${query}`; //fetch the qrcode
        await interaction.editReply(qrcode); //send the qrcode
    } else if (commandName === 'urban') {
		await interaction.deferReply();
		const term = interaction.options.getString('term');
		const query = new URLSearchParams({ term });

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`)
			.then(response => response.json());

            if (!list.length) {
                return interaction.editReply(`No results found for **${term}**.`);
            }
        
            interaction.editReply(`**${term}**: ${list[0].definition}`);
	}
    
});

//login to discord with your client's token
client.login(token);