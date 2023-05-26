const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDMPermission(true)
    .setDescription("Renvoie la photo de profile d'un membre")
    .addUserOption((o) =>
      o
        .setName("membre")
        .setDescription("Membre dont vous voulez voir la photo de profile")
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("membre") || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);

    const embed = new EmbedBuilder()
      .setTitle(`Photo de Profile de : ${member.user.username}`)
      .setImage(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription(`[lien direct](${member.user.avatarURL()})`)
      .setColor(member.displayColor);

    await interaction.reply({ embeds: [embed] });
  },
};
