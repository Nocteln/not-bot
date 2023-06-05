const Discord = require("discord.js");
const { embedr } = require("../../fonctions/embed");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("say")
    .setDescription("Permet de dire quelquechose avec le bot")
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator)
    .addStringOption((o) =>
      o.setName("phrase").setDescription("La phrase à dire").setRequired(true)
    ),
cat: "utils",
uti: "/say [phrase]",
  async execute(interaction) {
    const phrase = interaction.options.getString("phrase");
    interaction.guild.channels
      .fetch(interaction.channelId)
      .then((c) => c.send(phrase));

    await interaction.reply({
      embeds: [
        embedr(
          "Green",
          ":white_check_mark: succès",
          "Votre phrase à bien été envoyé !"
        ),
      ],
      ephemeral: true,
    });
  },
};
