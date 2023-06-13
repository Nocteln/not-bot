const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('suggest')
    .setDescription('Permet de faire une suggestion')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('idee')
        .setDescription('Votre idée')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('description')
        .setDescription('Description de votre idée')
        .setRequired(true)
    ),
  async execute(interaction) {
    const salon = await interaction.guild.channels.fetch('1118191138151604244');

    const idee = interaction.options.getString('idee');
    const description = interaction.options.getString('description');

    const embed = new Discord.EmbedBuilder()
      .setTitle('Nouvelle suggestion')
      .setDescription(`> Idée: ${idee}\n> Description: ${description}`);

    await salon.send({ embeds: [embed] });
  },
};
