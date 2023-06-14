const { QuickDB } = require("quick.db");
const db = new QuickDB()
const {
    AuditLogEvent,
    Events,
    MessageActivityType,
    EmbedBuilder,
  } = require("discord.js");
  const settruc = db.table("settruc")
  
  module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member) {
      const salon = await member.guild.channels.fetch("1114496483870375936");
    
      const embed = new EmbedBuilder().setTitle(`${member.user.username} à quité le serveur!`).setColor("Green").setThumbnail(member.user.displayAvatarURL({dynamic: true})).setDescription(`avait rejoint le : <t:${parseInt(member.joinedTimestamp / 1000)}:F>`)
      await salon.send({embeds: [embed]})
      if (!(await settruc.get(`byechannel_${member.guild.id}.salon`))) return;
    let chx = await member.guild.channels.fetch(
      await settruc.get(`byechannel_${member.guild.id}.salon`)
    );
    const message = await settruc.get(`byechannel_${member.guild.id}.phrase`);

    if (!message) return await chx.send({ embeds: [embed] });

    const newmsg = message
      .replace("{member}", member.user.username)
      .replace("{server}", member.guild.name)
      .replace("{membercount}", member.guild.memberCount)
      .replace("{servercount}", member.guild.memberCount)
      .replace("{serverid}", member.guild.id)
      .replace("{id}", member.user.id)
      .replace('{createdat}', member.user.createdAt.toDateString())
      .replace('{joinedat}', member.joinedAt.toDateString());

    await chx.send(newmsg);
    
    },
  };
  