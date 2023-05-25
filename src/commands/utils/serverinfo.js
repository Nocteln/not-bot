const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Informations du serveur")
    .setDMPermission(false),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle(`Informations du serveur : ${interaction.guild.name}`)
      // .setDescription(`Nom du serveur : ${interaction.guild.name}`)
      .setFields({
        name: "Nom du serveur",
        value: interaction.guild.name,
        inline: true,
      })
      .addFields(
        {
          name: "ID du serveur",
          value: `${interaction.guild.id}`,
          inline: true,
        },
        {
          name: "Nombre de membres",
          value: `${interaction.guild.memberCount}`,
          inline: true,
        },
        {
          name: "Créé le",
          value: `<t:${interaction.guild.createdTimestamp}:d> (il y a <t:${interaction.guild.createdTimestamp}:R>)`,
          inline: true,
        }
      );
    return interaction.reply({ content: null, embeds: [embed] });
  },
};
