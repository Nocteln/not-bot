const Discord = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { embedr } =require("../../fonctions/embed")

module.exports = {
    data: new Discord.SlashCommandBuilder()
    .setName("rank")
    .setDescription("Afficher le rang d'un utilisateur")
    .addUserOption(o=> o.setName("utilisateur").setDescription("Utilisateur à afficher le rang")),
    cat: "utilitaire",
    uti: "/rank (utilisateur)",

    async execute(interaction) {
        let user = interaction.options.getUser("utilisateur");
        if(!user) user = interaction.user;
        const rank = await db.get(`lvl_${interaction.guild.id}_${user.id}`);
        if(!rank) return interaction.reply({ embeds: [embedr("Red", ":x: erreur", "Ce membre n'as pas d'xp")], ephemeral: true });
        const embed = new Discord.EmbedBuilder()
      .setTitle(`Rang de ${user.username}`)
      .setDescription(`> Xp : ${rank.xp}/${rank.level*500}\n> Level : ${rank.level}`)
      .setColor('Random')
      await interaction.reply({ embeds: [embed]});
    }


}