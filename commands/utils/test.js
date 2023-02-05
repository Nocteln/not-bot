const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');

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

		const row1 = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('test_menu')
					.setPlaceholder('Sélectionnez une option')
					.addOptions(
						{
							label: 'Choisissez-moi',
							description: 'Voici une description',
							value: 'first_option',
						},
						{
							label: 'Choisissez-moi aussi',
							description: 'Voici une autre description',
							value: 'second_option',
						},
					),
			);

        const embed = new EmbedBuilder()
            .setTitle('Embed Test')
            .setDescription("Voici un bouton ci dessous qui doit réopndre une phrase.")
            .setColor('DarkAqua')
            .setTimestamp()
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });

            await interaction.reply({ content: 'Je pense que le déploiement des modules, fonctionne bien.', ephemeral: true, embeds: [embed], components: [row1, row] });
	},
};