const Discord = require("discord.js");
const { embedr } = require("../../fonctions/embed");
const { execute } = require("../utils/avatar");
module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("ban")
    .setDescription("Permet de bannir un membre")
    .setDMPermission(false)
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.BanMembers)
    .addUserOption((o) =>
      o.setName("membre").setDescription("Le membre à bannir").setRequired(true)
    )
    .addStringOption((o) =>
      o.setName("raison").setDescription("La raison du bannissement")
    ),

  async execute(interaction) {
    // try {
    const user = interaction.options.getUser("membre");
    const member = interaction.guild.members.cache.get(user.id);

    if (!user)
      return interaction.reply({
        embeds: [
          embedr("Red", "❌ erreur", "Je ne trouve pas de personne à bannir !"),
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
            "Vous ne pouvez pas vous bannir vous même !"
          ),
        ],
      });

    if ((await interaction.guild.fetchOwner()).id === member.id)
      return interaction.reply({
        embeds: [
          embedr(
            "Red",
            ":x: erreur",
            "Vous ne pouvez pas bannir le créateur du serveur !"
          ),
        ],
      });

    if (member && !member.bannable)
      return interaction.reply({
        embeds: [
          embedr("Red", ":x: erreur", "Je ne peut pas bannir ce membre !"),
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
            "Vous n'avez pas les permissions nécéssaires pour bannir ce membre !"
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
            "Vous ne pouvez pas bannir des membres plus haut que vous !"
          ),
        ],
      });

    if ((await interaction.guild.bans.fetch()).get(member.id))
      return interaction.reply({
        embeds: [embedr("Red", ":x: erreur", "Ce membre est déjà banni")],
      });

    try {
      await user.send(
        `Tu as été banni du serveur \`${interaction.guild.name}\` par \`${interaction.user.tag}\` pour la raison suivante : \`${raison}\``
      );
    } catch (err) {}

    await interaction.reply({
      embeds: [
        embedr(
          "Green",
          ":white_check_mark: success",
          `${interaction.user} à banni \`${user.tag}\` pour la raison : \`${raison}\``
        ),
      ],
    });

    await interaction.guild.bans.create(user.id, { reason: raison });
    // } catch (err) {
    //   console.log(`Erreur /ban : ${err}`);
    // }
  },
};
