const { Client, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

dotenv.config();


client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});


client.login(process.env.TOKEN);
