const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const { embedr } = require("../../fonctions/embed");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const settruc = db.table("settruc")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Permet de faire une suggestion")
    .setDMPermission(false)
    .addStringOption((option) =>
      option.setName("idee").setDescription("Votre idée").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Description de votre idée")
        .setRequired(true)
    ),
  async execute(interaction) {
    const idee = interaction.options.getString("idee");
    const description = interaction.options.getString("description");

    const embed = new Discord.EmbedBuilder()
      .setTitle("Nouvelle suggestion")
      .setDescription(`> Idée: ${idee}\n> Description: ${description}`)
      .setColor("Random")
      .setAuthor({name: `${interaction.user.username}`, iconURL: `${ interaction.user.displayAvatarURL({dynamic: true})}`})
      .setTimestamp()

    if (!await settruc.get(`suggest_${interaction.guild.id}`)) {
      return interaction.reply({
        embeds: [
          embedr(
            "Red",
            ":x: Erreur",
            "Le système de suggestion est désactivé."
          ),
        ],
      });
    } else {
      const id = await settruc.get(`suggest_${interaction.guild.id}`);
      const salon = await interaction.guild.channels.fetch(id);
      await salon.send({ embeds: [embed] });
      await interaction.reply({embeds: [embedr("Green", ":white_check_mark: success", `Suggestion envoyée avec succès dans ${salon}`)], ephemeral: true});
    }
  },
};
