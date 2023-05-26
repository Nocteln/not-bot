const { EmbedBuilder } = require("discord.js");

module.exports.embedr = (color, title, text) => {
  const embed = new EmbedBuilder()
    .setFooter({
      text: "No't Bot",
      iconURL:
        "https://cdn.discordapp.com/avatars/938161748832305224/a68fc442f5c4828592469c222148d6d0.webp",
    })
    .setColor(color)
    .setTitle(title)
    .setDescription(text)
    .setTimestamp();
  return embed;
};
