const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("help")
    .setDescription("Permet d'avoir de l'aide sur les commandes")
    .addStringOption((o) =>
      o.setName("commande").setDescription("Commande que vous voulez voir")
    ),
  cat: "utils",
  uti: "",
  async execute(interaction) {
    let command;
    if (interaction.options.getString("commande")) {
      command = interaction.client.commands.get(
        interaction.options.getString("commande")
      );
      if (!command) return interaction.reply("Commande non trouvée");
    }
    if (!command) {
      let categories = [];
      interaction.client.commands.forEach((cmd) => {
        if (!categories.includes(cmd.cat)) categories.push(cmd.cat);
      });

      let embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setTitle("Commandes du bot")
        .setThumbnail(
          interaction.client.user.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          `Commandes disponibles : \`${interaction.client.commands.size}\` \n Catégories disponibles : \`${categories.length}\``
        )
        .setTimestamp()
        .setFooter({ text: "commandes du bot" });

      await categories.sort().forEach(async (cat) => {
        let commands = interaction.client.commands.filter(
          (cmd) => cmd.cat === cat
        );
        embed.addFields({
          name: `${cat}`,
          value: `${commands
            .map((cmd) => `\`${cmd.data.name}\` : ${cmd.data.description}`)
            .join("\n")}`,
        });
      });

      await interaction.reply({ embeds: [embed] });
    } else {
      const embed = new Discord.EmbedBuilder()
        .setTitle(`Commande ${command.data.name}`)
        .setDescription(
          `Nom: \`${command.data.name}\`\nDescription :\`${
            command.data.description
          }\`\nCatégorie: \`${command.cat}\`\nCommande utilisable en mp : \`${
            command.data.dm_permission
              ? "oui"
              : command.data.dm_permission === undefined
              ? "oui"
              : "non"
          }\`\nUtilisation: \`${command.uti}\``
        )
        .setColor("Random");

      await interaction.reply({ embeds: [embed] });
    }
  },
};
