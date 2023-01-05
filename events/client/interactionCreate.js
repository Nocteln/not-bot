const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`Aucune commande correspondant à ${interaction.commandName} n'a été trouvée.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Erreur lors de l'exécution de la commande ${interaction.commandName}`);
			console.error(error);
		}
	},
};