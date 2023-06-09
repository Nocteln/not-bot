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
      const embed = new EmbedBuilder().setTitle(`${member.user.username} à rejoint!`)
      await salon.send({embeds: [embed]})
//console.log(member)
    },
  };
  