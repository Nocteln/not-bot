const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Informations du serveur")
    .setDMPermission(false),
cat: "utils",
uti: "",
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle(`Informations du serveur : `)
      .setColor("Random")
      .setThumbnail(interaction.guild.iconURL())
      .setFooter({
        text: `Demande de : ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setFields({
        name: "Nom du serveur :",
        value: `\`${interaction.guild.name}\``,
        inline: true,
      })
      .addFields(
        {
          name: "<:id:1111353897760591922> ID du serveur :",
          value: `\`${interaction.guild.id}\``,
          inline: true,
        },
        {
          name: "<:Discord_Members:1042472860142293032> Nombre de membres :",
          value: `\`${interaction.guild.memberCount}\``,
          inline: true,
        },
        {
          name: "<:plus:1111665846469787698> Créé le :",
          value: `<t:${Math.floor(
            parseInt(interaction.guild.createdTimestamp / 1000)
          )}:d> => <t:${Math.floor(
            parseInt(interaction.guild.createdTimestamp / 1000)
          )}:R>`,
          inline: true,
        },
        {
          name: "<:courrone:1111683241238335561> Propriétaire :",
          value: `${interaction.guild.members.cache.get(
            interaction.guild.ownerId
          )}`,
          inline: true,
        },
        {
          name: "<:boost:1111684217496146010> Boost :",
          value: `\`Tier ${interaction.guild.premiumTier}\``,
          inline: true,
        },
        {
          name: "<:Discord_Channel:1042483909948088371> Salons textuel :",
          value: `\`${
            interaction.guild.channels.cache.filter((c) => c.type === 0).size +
            interaction.guild.channels.cache.filter((c) => c.type === 5).size +
            interaction.guild.channels.cache.filter((c) => c.type === 15).size +
            interaction.guild.channels.cache.filter((c) => c.type === 10).size
          } salons\``,
          inline: true,
        },
        {
          name: "<:Discord_Voice_Channel:1042482473289928774> Salons vocaux :",
          value: `\`${
            interaction.guild.channels.cache.filter((c) => c.type === 2).size
          } salons\``,
          inline: true,
        },
        {
          name: "<:category:1042481387393003620>Catégories :",
          value: `\`${
            interaction.guild.channels.cache.filter((c) => c.type === 4).size
          } salons\``,
          inline: true,
        },
        {
          name: "<:5167discordemoji:1042483696848093274> Emojis :",
          value: `\`${
            interaction.guild.emojis.cache.size > 15
              ? `${interaction.guild.emojis.cache.size} emojis\``
              : `${
                  interaction.guild.emojis.cache.size
                } emojis \` ${interaction.guild.emojis.cache
                  .map((e) =>
                    e.animated
                      ? "<a" + ":" + e.name + ":" + e.id + ">"
                      : "<" + ":" + e.name + ":" + e.id + ">"
                  )
                  .join(" ")}`
          } `,
          inline: true,
        }
      );

    return interaction.reply({ content: null, embeds: [embed] });
  },
};
