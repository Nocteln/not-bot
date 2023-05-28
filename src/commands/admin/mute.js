const Discord = require("discord.js");
const { embedr } = require("../../fonctions/embed");
const ms = require("ms");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("mute")
    .setDescription("Permet de timeout un membre")
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ModerateMembers)
    .addUserOption((o) =>
      o.setName("membre").setDescription("Le membre à mute").setRequired(true)
    )
    .addStringOption((o) =>
      o.setName("temps").setDescription("Le temp du mute").setRequired(true)
    )
    .addStringOption((o) =>
      o.setName("raison").setDescription("La raison du mute")
    ),

  async execute(interaction) {
    user = interaction.options.getUser("membre");
    if (!user)
      return interaction.reply({
        embeds: [
          embedr("Red", "❌ erreur", "Je ne trouve pas de personne à mute !"),
        ],
      });
    let member = interaction.guild.members.cache.get(user.id);
    if (!member)
      return interaction.reply({
        embeds: [
          embedr("Red", "❌ erreur", "Je ne trouve pas de personne à mute !"),
        ],
      });

    temp = interaction.options.getString("temps");
    if (!temp)
      return interaction.reply({
        embeds: [
          embedr("Red", ":x: erreur", "Veuillez indiquer un temp pour le mute"),
        ],
      });
    if (isNaN(ms(temp)))
      return interaction.reply({
        embeds: [
          embedr(
            "Red",
            ":x: erreur",
            "Veuillez indiquer un temp dans le format suivant : 1d, 1m, 1s, ..."
          ),
        ],
      });
    if (ms(temp) > 2419200000)
      return interaction.reply({
        embeds: [
          embedr(
            "Red",
            ":x: erreur",
            "Vous ne pouvez pas indiquer un temp de plus de 28 jours"
          ),
        ],
      });

    raison = interaction.options.getString("raison");
    if (!raison) raison = "Pas de raison fournie";

    if (interaction.user.id === user.id)
      return interaction.reply(
        "Red",
        ":x: erreur",
        "Vous ne pouvez pas vous mute vous même !"
      );
    if ((await interaction.guild.fetchOwner()).id === user.id)
      return interaction.reply({
        embeds: [
          embedr(
            "Red",
            ":x: erreur",
            "Vous ne pouvez pas mute le créateur du serveur !"
          ),
        ],
      });
    if (!member.moderatable)
      return interaction.reply({
        embeds: [
          embedr("Red", ":x: erreur", "Je ne peut pas mute ce membre !"),
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
          embedr("Red", "❌ erreur", "Vous ne pouvez pas mute ce membre !"),
        ],
      });
    if (member.isCommunicationDisabled())
      return interaction.reply("ce membre est déja mute");

    try {
      await user.send(
        `Tu as été mute du serveur \`${interaction.guild.name}\` par \`${mesinteraction.user.tag}\` pendant \`${temp}\` pour la raison suivante : \`${raison}\``
      );
    } catch (err) {}

    await interaction.reply({
      embeds: [
        embedr(
          "Green",
          ":white_check_mark: succes",
          `${interaction.user} à mute \`${user.tag}\` pendant \`${temp}\` pour la raison : \`${raison}\``
        ),
      ],
    });

    await member.timeout(ms(temp), raison);
  },
};
