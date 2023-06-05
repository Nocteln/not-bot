const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Afficher les informations du bot.")
    .setDMPermission(true),
    cat: "utils",
  async execute(interaction) {
    const botUser = interaction.client.user;

    const embed = new EmbedBuilder()
      .setTitle("Information sur le bot :")
      .setAuthor({
        name: botUser.username,
        iconURL: botUser.displayAvatarURL(),
      })
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setDescription("Bip Boup Bip")
      .addFields(
        {
          name: "<:bot:1111697755405033502> Date de création",
          value: `<t:${parseInt(botUser.createdTimestamp / 1000)}:R>`,
          inline: true,
        },
        {
          name: "En ligne depuis",
          value: `<t:${parseInt(interaction.client.readyTimestamp / 1000)}:f>`,
          inline: true,
        },
        {
          name: `<:courronne2:1111698188710199436> Mon propriétaire :`,
          value: "[Nocteln#5214](https://github.com/Nocteln)",
          inline: true,
        },
        {
          name: "<:plus:1111665846469787698> inviter le bot :",
          value:
            "[clique ici](https://discord.com/api/oauth2/authorize?client_id=938161748832305224&permissions=8&scope=bot%20applications.commands)",
          inline: true,
        },
        {
          name: "<:info:1111694559974535288> support",
          value: "pas encore dispo",
          inline: true,
        }
      )
      .setColor("DarkAqua")
      .setTimestamp()
      .setFooter({
        text: `Demande de : ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    return interaction.reply({ content: null, embeds: [embed] });
  },
};
