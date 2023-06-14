const {
  AuditLogEvent,
  Events,
  MessageActivityType,
  EmbedBuilder,
} = require("discord.js");

const { QuickDB } = require("quick.db");
const db = new QuickDB();
const rang = db.table("rang");

const {embedr} = require('../../fonctions/embed')
module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
   let salon 
    if(message.guildId === "876217954688172062") salon =await message.guild.channels.fetch("1114496483870375936");
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
      if(message.guildId === "876217954688172062") salon.send({ embeds: [embed], content: null });
      if(!await rang.get(`lvl_${message.guild.id}_${message.author.id}`)) {

        await rang.set(`lvl_${message.guild.id}_${message.author.id}`, {xp: Math.floor(Math.random() * 10), level: 1});
      } else {
        const xp = await rang.get(`lvl_${message.guild.id}_${message.author.id}.xp`);
        const level = await rang.get(`lvl_${message.guild.id}_${message.author.id}.level`);

      await rang.add(`lvl_${message.guild.id}_${message.author.id}.xp`, Math.floor(Math.random() * 10));
      // await db.delete(`lvl_${message.guild.id}_${message.author.id}`);
      if(xp > level * 500) {
        await rang.set(`lvl_${message.guild.id}_${message.author.id}.level`, level + 1);
        await rang.set(`lvl_${message.guild.id}_${message.author.id}.xp`, 0);
        await channel.send({embeds: [embedr('Green', ":tada: Félicitation!", `Vous avez atteint le niveau ${level + 1}!`)]})
      }
      }

    }
  },
};
