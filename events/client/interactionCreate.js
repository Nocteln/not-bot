const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isCommand()) {
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
		} else if (interaction.isButton()) {
			const { buttons } = interaction.client;
            const { customId } = interaction;
            const button = buttons.get(customId);
            if (!button) return new Error("Il n'y a pas de code pour ce bouton.");

            try {
                await button.execute(interaction);
            } catch (error) {
                console.error(`Erreur d'exécution du boutton : ${interaction.customId}`);
                console.error(error);
            }
		} else if (interaction.isStringSelectMenu()) {
			const { menus } = interaction.client;
			const { customId } = interaction;
			const menu = menus.get(customId);
			if (!menu) return new Error("Il n'y a pas de code pour ce menu.");

			try {
				await menu.execute(interaction);
			} catch (error) {
				console.error(`Erreur d'exécution du menu : ${interaction.customId}`);
				console.error(error);
			}
		} else {
			console.error(`Interaction inconnue : ${interaction}`);
		}
	},
};