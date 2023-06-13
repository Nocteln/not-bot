const {
    AuditLogEvent,
    Events,
    MessageActivityType,
    EmbedBuilder,
  } = require("discord.js");
  
  module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
      const salon = await member.guild.channels.fetch("1114496483870375936");
      const embed = new EmbedBuilder().setTitle(`${member.user.username} à rejoint!`).setColor("Green").setThumbnail(member.user.displayAvatarURL({dynamic: true})).setDescription(`<t:${parseInt(member.joinedTimestamp / 1000)}:F>`)
      await salon.send({embeds: [embed]})

    },
  };
  