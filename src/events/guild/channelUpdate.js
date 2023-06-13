const {
  AuditLogEvent,
  Events,
  MessageActivityType,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: Events.ChannelUpdate,
  async execute(oldchannel, newchannel) {
    console.log(
      oldchannel,
      "-----------------------------------------------------------\n----------\n----------",
      newchannel
    );
    const salon = await newchannel.guild.channels.fetch("1114496483870375936");
    const oldcat = await oldchannel.guild.channels.fetch(oldchannel.parentId);
    const newCat = await newchannel.guild.channels.fetch(newchannel.parentId);

    const embed = new EmbedBuilder()
      .setTitle(`Mise a jour du salon \`#${newchannel.name}\``)
      .setDescription(
        `${
          newchannel.name !== oldchannel.name
            ? `Nom: \`${oldchannel.name} => ${newchannel.name}\``
            : ""
        }${
          newCat !== oldcat
            ? `\nCatégorie: \`${oldcat.name} => ${newCat.name}\``
            : ""
        }${
          newchannel.rateLimitPerUser !== oldchannel.rateLimitPerUser
            ? `\nTemp limite: \`${oldchannel.rateLimitPerUser}s => ${newchannel.rateLimitPerUser}s\``
            : ""
        }${
          newchannel.topic !== oldchannel.topic
            ? `\nSujet : \`${oldchannel.topic} => ${newchannel.topic}\``
            : ""
        }`
      );

    await salon.send({ embeds: [embed] });
  },
};
