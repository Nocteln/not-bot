const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const dotenv = require('dotenv');

dotenv.config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log(`Lancement du déploiement des ${commands.length} slash commandes (/).`);

		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands },
		);

		console.log(`Déploiement des ${data.length} slash commandes (/) réussit.`);
	} catch (error) {
		console.error(error);
	}
})();
