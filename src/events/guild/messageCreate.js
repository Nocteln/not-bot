const {
  AuditLogEvent,
  Events,
  MessageActivityType,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    const salon = await message.guild.channels.fetch("1114496483870375936");
    const channel = message.channel;

    const embed = new EmbedBuilder()
      .setTitle("Nouveau message !")
      .setDescription(
        `> Auteur : ${message.author}\n> Salon : <#${channel.id}>\n> Contenu : \`${message.content}\``
      )
      .setTimestamp()
      .setAuthor({ name: "Log" })
      .setColor("Green");

    if (message.content === "miaou" || message.content === "Miaou") {
      message.reply("ouaf");
    } else if (message.content === "quoi" || message.content === "Quoi") {
      message.reply("feur");
    }
    if (!message.author.bot === true) {
      salon.send({ embeds: [embed], content: null });
    }
  },
};
