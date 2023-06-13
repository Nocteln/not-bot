const { QuickDB } = require("quick.db");
const db = new QuickDB()
const {
    AuditLogEvent,
    Events,
    MessageActivityType,
    EmbedBuilder,
  } = require("discord.js");
  
  module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member) {
      const salon = await member.guild.channels.fetch("1114496483870375936");
    
      const embed = new EmbedBuilder().setTitle(`${member.user.username} à quité le serveur!`).setColor("Green").setThumbnail(member.user.displayAvatarURL({dynamic: true})).setDescription(`avait rejoint le : <t:${parseInt(member.joinedTimestamp / 1000)}:F>`)
      await salon.send({embeds: [embed]})
      if(await db.get(`byechannel_${member.guild.id}`)){
        let chx = await member.guild.channels.fetch(await db.get(`byechannel_${member.guild.id}`))
        await chx.send({embeds: [embed]})
    } 
    },
  };
  