const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Envoie quelques liens utiles"),
cat: "utils",uti: "",
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("<:lien:1111707634836439062> liens utiles")
      .setColor("Random")
      .addFields(
        {
          name: "inviter le bot :",
          value:
            "[cliquez ici](https://discord.com/api/oauth2/authorize?client_id=938161748832305224&permissions=8&scope=bot%20applications.commands)",
        },
        {
          name: "Serveur de support :",
          value: "`Pas encore disponible`",
        }
      )
      .setFooter({
        text: `Demande de : ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed], content: null });
  },
};
