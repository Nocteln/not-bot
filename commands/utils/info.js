const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("info")
		.setDescription("Afficher les informations du bot.")
        .setDMPermission(true),
	async execute(interaction) {
        const botUser = interaction.client.user;
        let isTeamOwner = false;
        let owner = [];
        await interaction.client.application.fetch().then(function (bot) {
            try {
                owner.push(`${bot.owner.tag}`);
            } catch (error) {
                isTeamOwner = true;
                bot.owner.members.forEach(member => {
                    owner.push(`${member.user.tag}`); 
                });
            }
        });

        const embed = new EmbedBuilder()
            .setTitle('Information sur le bot :')
            .setAuthor({ name: botUser.username, iconURL: botUser.displayAvatarURL() })
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .setURL('https://apprendre-discord.fr')
            .setDescription("J'ai été créé dans le but d'aider un maximum de personne sur discord.")
            .addFields(
                { name: 'Date de création', value: `<t:${parseInt(botUser.createdTimestamp / 1000)}:R>`, inline: true },
                { name: 'En ligne depuis', value: `<t:${parseInt(interaction.client.readyTimestamp / 1000)}:f>`, inline: true },
                { name: `${isTeamOwner ? "Mes propriétaires" : "Mon propriétaire"} :`, value: `▸ ${owner}`, inline: true },
                { name: 'Mes développeurs :', value: `▸ [Guscraftin#0828](https://github.com/Guscraftin)`, inline: true },
            )
            .setColor('DarkAqua')
            .setTimestamp()
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });

        interaction.reply({ content: null, embeds: [embed] });
	},
};