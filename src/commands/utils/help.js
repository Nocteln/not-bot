const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("help")
    .setDescription("Permet d'avoir de l'aide sur les commandes"),

  async execute(interaction) {
    console.log(interaction.client.commands);
  },
};
