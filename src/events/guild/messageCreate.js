const {
  AuditLogEvent,
  Events,
  MessageActivityType,
  EmbedBuilder,
} = require("discord.js");

const { QuickDB } = require("quick.db");
const db = new QuickDB();

const {embedr} = require('../../fonctions/embed')
module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    const salon = await message.guild.channels.fetch("1114496483870375936");
    const channel = message.channel;

    const embed = new EmbedBuilder()
      .setTitle("Nouveau message !")
      .setDescription(
        `> Auteur : ${message.author}\n> Salon : <#${channel.id}>\n> Contenu : \`${message.content}\``
      )
      .setTimestamp()
      .setAuthor({ name: "Log" })
      .setColor("Green");

    if (message.content === "miaou" || message.content === "Miaou") {
      message.reply("ouaf");
    } else if (message.content === "quoi" || message.content === "Quoi") {
      message.reply("feur");
    }
    if (!message.author.bot) {
      salon.send({ embeds: [embed], content: null });

      if(!await db.get(`lvl_${message.guild.id}_${message.author.id}`)) {

        await db.set(`lvl_${message.guild.id}_${message.author.id}`, {xp: 0, level: 1});
      } else {
        const xp = await db.get(`lvl_${message.guild.id}_${message.author.id}.xp`);
        const level = await db.get(`lvl_${message.guild.id}_${message.author.id}.level`);

      await db.add(`lvl_${message.guild.id}_${message.author.id}.xp`, Math.floor(Math.random() * 10));
      // await db.delete(`lvl_${message.guild.id}_${message.author.id}`);
      if(xp > level * 500) {
        await db.set(`lvl_${message.guild.id}_${message.author.id}.level`, level + 1);
        await db.set(`lvl_${message.guild.id}_${message.author.id}.xp`, 0);
        await channel.send({embeds: [embedr('Green', ":tada: Félicitation!", `Vous avez atteint le niveau ${level + 1}!`)]})
      }
      }

    }
  },
};
