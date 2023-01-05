const { Client, Collection, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();


['commands', 'events'].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

process.on('exit', code => { Logger.client(`Le processus s'est arrêté avec le code : ${code}`) });

process.on('uncaughtException', (err, origin) => { 
    Logger.error(`UNCAUGHT_EXCEPTION : ${err}`)
    console.error(`Origine : ${origin}`)
});

process.on('unhandledRejection', (reason, promise) => { 
    Logger.warn(`UNHANDLE_REJECTION : ${{reason}}`)
    console.log(promise);
});

process.on('warning', (...args) => { Logger.warn(...args) });


client.login(process.env.TOKEN);
