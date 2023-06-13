const Discord = require("discord.js");
const { embedr } = require("../../fonctions/embed");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("setarrivee")
    .setDescription("Permet de créer le message d'arrivée")
    .setDMPermission(false)
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator)
    .addChannelOption((o) =>
      o
        .setName("salon")
        .setDescription("Le salon où envoyer le message")
        .setRequired(true)
    ),
  cat: "admin",
  uti: "/setarrivee [salon]",
  async execute(interaction) {
    let channel = interaction.options.getChannel("salon");
    try{
        channel.send({embeds: [embedr("Green", ":white_check_mark: test!", `Le salon d'envoie de message a bien été défini!`)]});
        await db.set(`welchannel_${interaction.guild.id}`, channel.id)
    } catch(err){
        await interaction.reply({embeds: [embedr("Red", ":x: Erreur!", `Le salon d'envoie de message n'a pas été défini! Cela peut etre du à un manque de permissions, essayez d'accorder plus de permissions au bot!`)]})
    }

    // await interaction.reply({embeds: [embedr("Green", ":white_check_mark: succes!", `Le message d'arrivée s'envéra dans ${channel}`)]})
  },
};
