const {
    AuditLogEvent,
    Events,
    MessageActivityType,
    EmbedBuilder,
  } = require("discord.js");
  
  module.exports = {
    name: Events.ChannelDelete,
    async execute(channel) {
      console.log(channel);
      const salon = await channel.guild.channels.fetch("1114496483870375936");
      const cat = await channel.guild.channels.fetch(channel.parentId);
      const embed = new EmbedBuilder()
        .setTitle("Salon supprimé !")
        .setDescription(
          `Nom : ${`\`${channel.name}\``}\n${
            channel.type !== 4 ? `Catégorie : \`${cat.name}\`\n` : ""
          }Type de salon : ${
            channel.type === 0
              ? "\`Textuel\`"
              : channel.type === 2
              ? "\`vocal\`"
              : channel.type === 4
              ? "\`catégorie\`"
              : channel.type === 5
              ? "\`Annonce\`"
              : channel.type === 10 || channel.type === 11 || channel.type === 12
              ? "\`Fil de discussion\`"
              : channel.type === 15
              ? "\`Forum\`"
              : "\`Type non trouvé\`"
          }`
        )
        .setColor("Red");
      await salon.send({ embeds: [embed] });
    },
  };
  