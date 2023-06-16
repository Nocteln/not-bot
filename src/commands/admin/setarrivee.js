const Discord = require("discord.js");
const { embedr } = require("../../fonctions/embed");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const settruc = db.table("settruc");
module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("setarrivee")
    .setDescription(
      "Permet de configurer le salon d'envoie de message d'arrive"
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator)
    .addStringOption((o) =>
      o
        .setName("etat")
        .setDescription("Etat du systeme de bienvenue : on ou off")
        .setRequired(true)
        .addChoices({name: "on", value: "on"}, {name: "off", value: "off"})
        
    )
    .addStringOption((o) =>
      o.setName("phrase").setDescription("Phrase du message")
    )
    .addChannelOption((o) =>
      o.setName("salon").setDescription("Le salon où envoyer le message")
    ),
  cat: "admin",
  uti: "/setarrivee [etat] (salon) (phrase)",
  // async autocomplete(interaction) {
  //   const focusedValue = interaction.options.getFocused();
  //   const choices = ["on", "off"];
  //   const filtered = choices.filter((choice) =>
  //     choice.startsWith(focusedValue)
  //   );
  //   await interaction.respond(
  //     filtered.map((choice) => ({ name: choice, value: choice }))
  //   );
  // },
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
              `L'envoie de message d'arrivée a bien été défini dans ce salon!`
            ),
          ],
        });
        if (phrase) {
          await settruc.set(`welchannel_${interaction.guild.id}`, {
            salon: channel.id,
            phrase: phrase,
          });
          await interaction.reply({
            embeds: [
              embedr(
                "Green",
                ":white_check_mark: succes!",
                `Le message d'arrivée s'envéra dans ${channel} avec comme contenu : \`\`\`${phrase}\`\`\``
              ),
            ],
          });
        } else {
          await settruc.set(`welchannel_${interaction.guild.id}`, {
            salon: `${channel.id}`,
          });
          await interaction.reply({
            embeds: [
              embedr(
                "Green",
                ":white_check_mark: succes!",
                `Le message d'arrivée s'envéra dans ${channel}`
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
      if (!(await settruc.get(`welchannel_${interaction.guild.id}`)))
        return await interaction.reply({
          embeds: [
            embedr(
              "Red",
              ":x: Erreur!",
              "Le systeme de bienvenue est déjà désactivé!"
            ),
          ],
        });

      settruc.delete(`welchannel_${interaction.guild.id}`);
      await interaction.reply({
        embeds: [
          embedr(
            "Green",
            ":white_check_mark: succès!",
            "Le systeme de bienvenue est désactivé!"
          ),
        ],
      });
    } else
      return await interaction.reply({
        embeds: [
          embedr("Red", ":x: Erreur!", `Veuillez indiquer \`on\` ou \`off\``),
        ],
      });
  },
};
