const { QuickDB } = require("quick.db");
const db = new QuickDB();
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
    const embed = new EmbedBuilder()
      .setTitle(`${member.user.username} à rejoint!`)
      .setColor("Green")
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`<t:${parseInt(member.joinedTimestamp / 1000)}:F>`);
    await salon.send({ embeds: [embed] });

    if (!(await db.get(`welchannel_${member.guild.id}.salon`))) return;
    let chx = await member.guild.channels.fetch(
      await db.get(`welchannel_${member.guild.id}.salon`)
    );
    const message = await db.get(`welchannel_${member.guild.id}.phrase`);

    if (!message) return await chx.send({ embeds: [embed] });

    const newmsg = message
      .replace("{user}", member.user)
      .replace("{member}", member.user.username)
      .replace("{server}", member.guild.name)
      .replace("{membercount}", member.guild.memberCount)
      .replace("{servercount}", member.guild.memberCount)
      .replace("{serverid}", member.guild.id)
      .replace("{id}", member.user.id);

    await chx.send(newmsg);
  },
};
