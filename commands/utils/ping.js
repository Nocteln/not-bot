const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Renvoie la latence du bot et de l'api"),
	async execute(interaction) {
		const tryPong = await interaction.reply({ content: "On essaye de pong... un instant !", fetchReply: true });

        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong!')
            .setURL('https://apprendre-discord.fr')
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .addFields(
                { name: 'Latence API', value: `\`\`\`${interaction.client.ws.ping}ms\`\`\``, inline: true },
                { name: 'Latence BOT', value: `\`\`\`${tryPong.createdTimestamp - interaction.createdTimestamp}ms\`\`\``, inline: true },
                { name: 'Uptime', value: `<t:${parseInt(interaction.client.readyTimestamp / 1000)}:R>`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });

        interaction.editReply({ content: null, embeds: [embed] });
	},
};