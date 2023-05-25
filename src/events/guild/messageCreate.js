const { AuditLogEvent, Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    console.log(
      `Un message à été envoyé par ${message.author.username} dans ${message.channelId}.`
    );
  },
};
