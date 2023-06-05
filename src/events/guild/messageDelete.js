const {
  AuditLogEvent,
  Events,
  MessageActivityType,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: Events.MessageDelete,
  async execute(message) {
    const salon = await message.guild.channels.fetch("1114496483870375936");

    salon.send("cc");
    console.log("message");

    // const embed = new EmbedBuilder()
    //   .setTitle("Nouveau message !")
    //   .setDescription(
    //     `> Auteur : ${message.author}\n> Salon : <#${channel.id}>\n> Contenu : \`${message.content}\``
    //   )
    //   .setTimestamp()
    //   .setAuthor({ name: "Log" })
    //   .setColor("Green");

    // if (!message.author.bot === true) {
    //   salon.send({ embeds: [embed], content: null });
    // }
  },
};
