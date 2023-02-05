const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("test")
		.setDescription("Permet de tester les boutons.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction) {
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('test')
					.setLabel('Lancer test !')
					.setStyle(ButtonStyle.Primary)
                    .setEmoji('🚧'),
			);


        const embed = new EmbedBuilder()
            .setTitle('Embed Test')
            .setDescription("Voici un bouton ci dessous qui doit réopndre une phrase.")
            .setColor('DarkAqua')
            .setTimestamp()
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });

            await interaction.reply({ content: 'Je pense que pour déployer un bouton, ça fonctionne bien.', ephemeral: true, embeds: [embed], components: [row] });
	},
};