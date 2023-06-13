const Discord = require("discord.js");
const { embedr } = require("../../fonctions/embed");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("setdepart")
    .setDescription(
      "Permet de configurer le salon d'envoie de message de départ"
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator)
    .addStringOption((o) =>
      o
        .setName("etat")
        .setDescription("Etat du systeme de bienvenue : on ou off")
        .setRequired(true)
    )
    .addStringOption(o=>o.setName("phrase").setDescription("Phrase du message"))
    .addChannelOption((o) =>
      o.setName("salon").setDescription("Le salon où envoyer le message")
    ),
  cat: "admin",
  uti: "/setdepart [etat] (salon) (phrase)",
  async execute(interaction) {
    let channel = interaction.options.getChannel("salon");
    let etat = interaction.options.getString("etat");
    let phrase = interaction.options.getString("phrase");
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
              `L'envoie de message de départ a bien été défini dans ce salon!`
            ),
          ],
        });
        if(phrase) {await db.set(`byechannel_${interaction.guild.id}`, {salon: channel.id, phrase: phrase});
        await interaction.reply({
          embeds: [
            embedr(
              "Green",
              ":white_check_mark: succes!",
              `Le message de départ s'envéra dans ${channel} avec comme contenu : \`\`\`${phrase}\`\`\``
            ),
          ],
        });
      } else {
        await db.set(`byechannel_${interaction.guild.id}`, {salon:  `${channel.id}`});
        await interaction.reply({
          embeds: [
            embedr(
              "Green",
              ":white_check_mark: succes!",
              `Le message de départ s'envéra dans ${channel}`
            ),
          ],
        });
      }
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
      if(!await db.get(`byechannel_${interaction.guild.id}`)) return await interaction.reply({embeds: [embedr("Red", ":x: Erreur!", "Le systeme de départ est déjà désactivé!")]});

      db.delete(`byechannel_${interaction.guild.id}`);
      await interaction.reply({embeds: [embedr("Green", ":white_check_mark: succès!", "Le systeme de départ est désactivé!")]});
    } else
      return await interaction.reply({
        embeds: [
          embedr("Red", ":x: Erreur!", `Veuillez indiquer \`on\` ou \`off\``),
        ],
      });
  },
};
