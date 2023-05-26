const { AuditLogEvent, Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.content === "miaou" || message.content === "Miaou") {
      message.reply("ouaf");
    } else if (message.content === "quoi" || message.content === "Quoi") {
      message.reply("feur");
    }

    console.log(
      `Un message à été envoyé par ${message.author.username} dans ${message.channelId}.`
    );
  },
};
