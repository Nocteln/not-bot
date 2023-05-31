const Discord = require("discord.js");
const { embedr } = require("../../fonctions/embed");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("lock")
    .setDMPermission(false)
    .setDescription("Permet de retirer aux membres la permissions d'écrire")
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ManageChannels)
    .addChannelOption((o) =>
      o.setName("salon").setDescription("Le salon que vous voulez bloquer")
    )
    .addRoleOption((o) =>
      o.setName("role").setDescription("Le role que vous voulez bloquer")
    ),

  async execute(interaction) {
    const channel =
      interaction.options.getChannel("salon") ||
      interaction.guild.channels.cache.get(interaction.channelId);

    let role = interaction.options.getRole("role");
    if (role && !interaction.guild.roles.cache.get(role.id))
      return interaction.reply({
        embeds: [embedr("Red", "❌ erreur", "le rôle n'as pas été trouvé !")],
      });
    if (!role) role = interaction.guild.roles.everyone;

    if (channel.type !== 0)
      return interaction.reply({
        embeds: [
          embedr("Red", ":x: erreur", "Veuillez spécifier un salon textuel!"),
        ],
      });

    if (
      channel.permissionOverwrites.cache
        .get(role.id)
        ?.deny.toArray(false)
        .includes("SendMessages")
    )
      return interaction.reply({
        embeds: [
          embedr(
            "Red",
            "❌ erreur",
            `Le rôle ${role.name} est déjà bloqué dans le salon ${channel} !`
          ),
        ],
      });

    if (channel.permissionOverwrites.cache.get(role.id))
      await channel.permissionOverwrites.edit(role.id, { SendMessages: false });
    else
      await channel.permissionOverwrites.create(role.id, {
        SendMessages: false,
      });

    await interaction.reply({
      embeds: [
        embedr(
          "Green",
          ":white_check_mark: success",
          `Le role ${role.name} à bien été bloqué dans le salon ${channel}`
        ),
      ],
    });
  },
};
