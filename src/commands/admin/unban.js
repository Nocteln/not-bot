const Discord = require("discord.js");
const { embedr } = require("../../fonctions/embed");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("unban")
    .setDescription("Permet de débannir un membre")
    .setDMPermission(false)
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.BanMembers)
    .addUserOption((o) =>
      o
        .setName("membre")
        .setDescription("Le membre à débannir")
        .setRequired(true)
    )
    .addStringOption((o) =>
      o.setName("raison").setDescription("La raison du débannissement")
    ),

  async execute(interaction) {
    try {
      const user = interaction.options.getUser("membre");

      if (!user)
        return interaction.reply({
          embeds: [
            embedr(
              "Red",
              "❌ erreur",
              "Je ne trouve pas de personne à débannir !"
            ),
          ],
        });

      let raison = interaction.options.getString("raison");
      if (!raison) raison = "Pas de raison fournie";

      if (!(await interaction.guild.bans.fetch()).get(user.id))
        return interaction.reply({
          embeds: [embedr("Red", ":x: erreur", "Ce membre n'est pas banni")],
        });

      try {
        await user.send(
          `Tu as été débanni du serveur \`${interaction.guild.name}\` par \`${interaction.user.tag}\` pour la raison suivante : \`${raison}\``
        );
      } catch (err) {}

      await interaction.reply({
        embeds: [
          embedr(
            "Green",
            ":white_check_mark: success",
            `${interaction.user} à débanni \`${user.tag}\` pour la raison : \`${raison}\``
          ),
        ],
      });

      await interaction.guild.bans.remove(user.id, { reason: raison });
    } catch (err) {
      console.log(`Erreur /unban : ${err}`);
      interaction.reply({
        embeds: [
          embedr(
            "Red",
            ":x: erreur",
            "Erreur dans le débannissement, veuillez réessayer !"
          ),
        ],
        ephemeral: true,
      });
    }
  },
};
