const { Client, Collection, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();


['commands', 'events'].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});


client.login(process.env.TOKEN);
