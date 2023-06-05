const Discord = require("discord.js");
const { embedr } = require("../../fonctions/embed");
const ms = require("ms");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Permet de retirer le timeout un membre")
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ModerateMembers)
    .addUserOption((o) =>
      o.setName("membre").setDescription("Le membre à unmute").setRequired(true)
    )
    .addStringOption((o) =>
      o.setName("raison").setDescription("La raison du mute")
    ),
cat: "admin",
uti: "",
  async execute(interaction) {
    user = interaction.options.getUser("membre");
    if (!user)
      return interaction.reply({
        embeds: [
          embedr("Red", "❌ erreur", "Je ne trouve pas de personne à unmute !"),
        ],
      });
    let member = interaction.guild.members.cache.get(user.id);
    if (!member)
      return interaction.reply({
        embeds: [
          embedr("Red", "❌ erreur", "Je ne trouve pas de personne à unmute !"),
        ],
      });

    raison = interaction.options.getString("raison");
    if (!raison) raison = "Pas de raison fournie";

    if (!member.isCommunicationDisabled())
      return interaction.reply("ce membre n'est pas mute");

    if (!member.moderatable)
      return interaction.reply({
        embeds: [
          embedr("Red", ":x: erreur", "Je ne peut pas unmute ce membre !"),
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
          embedr("Red", "❌ erreur", "Vous ne pouvez pas unmute ce membre !"),
        ],
      });

    try {
      await user.send(
        `Tu as été unmute du serveur \`${interaction.guild.name}\` par \`${interaction.user.tag}\` pour la raison suivante : \`${raison}\``
      );
    } catch (err) {}

    await interaction.reply({
      embeds: [
        embedr(
          "Green",
          ":white_check_mark: succes",
          `${interaction.user} à unmute ${user} pour la raison : \`${raison}\``
        ),
      ],
    });

    await member.timeout(null, raison);
  },
};
