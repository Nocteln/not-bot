const Discord = require("discord.js");
const { embedr } = require("../../fonctions/embed");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("setarrivee")
    .setDescription(
      "Permet de configurer le salon d'envoie de message de'arrive"
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator)
    .addStringOption((o) =>
      o
        .setName("etat")
        .setDescription("Etat du systeme de bienvenue : on ou off")
        .setRequired(true)
    )
    .addChannelOption((o) =>
      o.setName("salon").setDescription("Le salon où envoyer le message")
    ),
  cat: "admin",
  uti: "/setarrivee [etat] (salon)",
  async execute(interaction) {
    let channel = interaction.options.getChannel("salon");
    let etat = interaction.options.getString("etat");
    if (channel) {
      if (channel.type !== 0)
        return await interaction.reply({
          embeds: [
            embedr(
              "Red",
              ":x: Erreur!",
              `Veuillez sélectionner un salon textuel!`
            ),
          ],
        });
    }

    if (etat === "on") {
      try {
        if (!channel)
          return await interaction.reply({
            embeds: [
              embedr("Red", ":x: Erreur!", `Veuillez indiquer un salon!`),
            ],
          });
        await channel.send({
          embeds: [
            embedr(
              "Green",
              ":white_check_mark: succès!",
              `L'envoie de message d'arrivée a bien été défini dans ce salon!`
            ),
          ],
        });
        await db.set(`welchannel_${interaction.guild.id}`, channel.id);
        await interaction.reply({
          embeds: [
            embedr(
              "Green",
              ":white_check_mark: succes!",
              `Le message d'arrivée s'envéra dans ${channel}`
            ),
          ],
        });
      } catch (err) {
        await interaction.reply({
          embeds: [
            embedr(
              "Red",
              ":x: Erreur!",
              `Le salon d'envoie de message n'a pas été défini! Cela peut etre du à un manque de permissions, essayez d'accorder plus de permissions au bot!`
            ),
          ],
        });
      }
    } else if (etat === "off") {
      if(!await db.get(`welchannel_${interaction.guild.id}`)) return await interaction.reply({embeds: [embedr("Red", ":x: Erreur!", "Le systeme de bienvenue est déjà désactivé!")]});

      db.delete(`welchannel_${interaction.guild.id}`);
      await interaction.reply({embeds: [embedr("Green", ":white_check_mark: succès!", "Le systeme de bienvenue est désactivé!")]});
    } else
      return await interaction.reply({
        embeds: [
          embedr("Red", ":x: Erreur!", `Veuillez indiquer \`on\` ou \`off\``),
        ],
      });
  },
};
