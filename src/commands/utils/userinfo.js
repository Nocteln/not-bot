const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Afficher les informations d'un utilisateur.")
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Le membre dont vous voulez voir les informations")
        .setRequired(false)
    ),
cat: "utils",
  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);

    if (!user && !member)
      return interaction.reply(
        "Vous devez mentionner un utilisateur ou un membre."
      );

    const embed = new EmbedBuilder()
      .setTitle(`Informations de : ${user.username}`)
      .setAuthor({
        name: user.username,
        iconURL: user.displayAvatarURL(),
      })
      .setThumbnail(user.displayAvatarURL())
      .setDescription("Bip Boup Bip")
      .addFields(
        {
          name: "Nom d'utilisateur :",
          value: `${user}`,
          inline: true,
        },
        {
          name: "ID :",
          value: `\`${user.id}\``,
          inline: true,
        },
        {
          name: "Lien de l'avatar :",
          value: `[cliquez ici](${user.displayAvatarURL()})`,
          inline: true,
        },
        {
          name: "Status :",
          value:
            "``" +
            (member.presence.status === "dnd"
              ? "⛔ Mode ne pas déranger"
              : member.presence.status === "online"
              ? "🟢 En ligne"
              : member.presence.status === "offline"
              ? "⚫ Hors ligne"
              : member.presence.status === "idle"
              ? "🌙 Inactif"
              : "Inconnu") +
            "``",
          inline: true,
        },
        {
          name: "Custom status :",
          value: `${
            member.presence.activities[0]
              ? `\`${member.presence.activities[0].name}\``
              : "Pas de status personalisés"
          }`,
          inline: true,
        },

        {
          name: "Date de création du compte :",
          value: `<t:${Math.floor(
            parseInt(user.createdTimestamp) / 1000
          )}:d> (<t:${Math.floor(parseInt(user.createdTimestamp) / 1000)}:R>)`,
          inline: true,
        },
        {
          name: "A rejoint le :",
          value: `<t:${Math.floor(
            parseInt(member.joinedTimestamp) / 1000
          )}:d> (<t:${Math.floor(parseInt(member.joinedTimestamp) / 1000)}:R>)`,
          inline: true,
        },
        {
          name: "Est un bot :",
          value: `\`${user.bot ? "Oui" : "Non"}\``,
          inline: true,
        },
        {
          name: "Booster : ",
          value: `${
            member.premiumSinceTimestamp
              ? `Oui depuis <t:${Math.floor(
                  parseInt(member.premiumSinceTimestamp) / 1000
                )}:R`
              : "`Non`"
          }`,
          inline: true,
        },
        {
          name: "Roles :",
          value: `${member.roles.cache.map((role) => role.name).join(", ")}`,
        }
      )
      .setColor("Random")
      .setTimestamp()
      .setFooter({
        text: `Demande de : ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    return interaction.reply({ content: null, embeds: [embed] });
  },
};
