const Discord = require("discord.js");
const { embedr } = require("../../fonctions/embed");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("setdepart")
    .setDescription("Permet de configurer le salon d'envoie de message de départ")
    .setDMPermission(false)
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator)
    .addChannelOption((o) =>
      o
        .setName("salon")
        .setDescription("Le salon où envoyer le message")
        .setRequired(true)
    ),
  cat: "admin",
  uti: "/setdepart [salon]",
  async execute(interaction) {
    let channel = interaction.options.getChannel("salon");
    if(channel.type!== 0) return await interaction.reply({embeds: [embedr("Red", ":x: Erreur!", `Veuillez sélectionner un salon textuel!`)]})

    try{

        await channel.send({embeds: [embedr("Green", ":white_check_mark: succès!", `L'envoie de message de départ a bien été défini dans ce salon!`)]});
        await db.set(`byechannel_${interaction.guild.id}`, channel.id)
        await interaction.reply({embeds: [embedr("Green", ":white_check_mark: succes!", `Le message de départ s'envéra dans ${channel}`)]})
    } catch(err){
        await interaction.reply({embeds: [embedr("Red", ":x: Erreur!", `Le salon d'envoie de message n'a pas été défini! Cela peut etre du à un manque de permissions, essayez d'accorder plus de permissions au bot!`)]})
    }

  },
};
