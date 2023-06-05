const Discord = require("discord.js");
const { embedr } = require("../../fonctions/embed");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("kick")
    .setDescription("Permet d'exclure un membre")
    .setDMPermission(false)
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.KickMembers)
    .addUserOption((o) =>
      o
        .setName("membre")
        .setDescription("Le membre à exclure")
        .setRequired(true)
    )
    .addStringOption((o) =>
      o.setName("raison").setDescription("La raison de l'exclusion")
    ),
cat: "admin",uti: "",
  async execute(interaction) {
    try {
      const user = interaction.options.getUser("membre");
      const member = interaction.guild.members.cache.get(user.id);

      if (!user)
        return interaction.reply({
          embeds: [
            embedr(
              "Red",
              "❌ erreur",
              "Je ne trouve pas de personne à exclure !"
            ),
          ],
        });

      let raison = interaction.options.getString("raison");
      if (!raison) raison = "Pas de raison fournie";

      if (interaction.user.id === user.id)
        return interaction.reply({
          embeds: [
            embedr(
              "Red",
              ":x: erreur",
              "Vous ne pouvez pas vous exclure vous même !"
            ),
          ],
        });

      if ((await interaction.guild.fetchOwner()).id === member.id)
        return interaction.reply({
          embeds: [
            embedr(
              "Red",
              ":x: erreur",
              "Vous ne pouvez pas exclure le créateur du serveur !"
            ),
          ],
        });

      if (member && !member.bannable)
        return interaction.reply({
          embeds: [
            embedr("Red", ":x: erreur", "Je ne peut pas exclure ce membre !"),
          ],
        });

      if (
        !interaction.member.permissions.has(
          Discord.PermissionsBitField.BanMembers
        )
      )
        return interaction.reply({
          embeds: [
            embedr(
              "Red",
              ":x: erreur",
              "Vous n'avez pas les permissions nécéssaires pour exclure ce membre !"
            ),
          ],
        });

      if (
        member &&
        interaction.member.roles.highest.comparePositionTo(
          member.roles.highest
        ) <= 0
      )
        return interaction.reply({
          embeds: [
            embedr(
              "Red",
              ":x: erreur",
              "Vous ne pouvez pas exclure des membres plus haut que vous !"
            ),
          ],
        });

      try {
        await user.send(
          `Tu as été exclus du serveur \`${interaction.guild.name}\` par \`${interaction.user.tag}\` pour la raison suivante : \`${raison}\``
        );
      } catch (err) {}

      await interaction.reply({
        embeds: [
          embedr(
            "Green",
            ":white_check_mark: success",
            `${interaction.user} à exclu \`${user.tag}\` pour la raison : \`${raison}\``
          ),
        ],
      });

      await member.kick(raison);
    } catch (err) {
      console.log(`Erreur /kick : ${err}`);
      interaction.reply({
        embeds: [
          embedr(
            "Red",
            ":x: erreur",
            "Erreur dans le bannissement, veuillez réessayer !"
          ),
        ],
      });
    }
  },
};
