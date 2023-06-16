const Discord = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const rang = db.table("rang");
const { embedr } =require("../../fonctions/embed")
const Canvas = require("discord-canvas-easy")
module.exports = {
    data: new Discord.SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Afficher le leaderboard"),
    cat: "utilitaire",
    uti: "/leaderboard",

    async execute(interaction) {
        await interaction.reply("commande pas faite")
        console.log(await rang.all())
        if(!await rang.all()) return interaction.reply({ embeds: [embedr("Red", ":x: erreur", "personne n'as d'xp sur le serveur")] });

        await interaction.deferReply()

        const calculXp = (xp, level) => {
            let xptotal = 0
            for(let i = 0; i < level + 1; i++) xptotal += i*1000
            xptotal += xp
            return xptotal
        }
        tout = await rang.all()

        let leaderboard = await tout.sort((a, b) => calculXp(parseInt(b.xp), parseInt(b.level)) - calculXp(parseInt(a.xp), parseInt(a.level)))

        const Leaderboard = await new Canvas.Leaderboard()
        .setBot(interaction.client)
        .setGuild(interaction.guild)
        .setBackground("https://img.20mn.fr/PITq6ei6Q_2mZFSuJaeU4A/1200x768_photographie-plus-coloree-univers-prise-hubble-publiee-3-juin-2014-nasa-esa")
        .setColorFont("#FFFFFF")


        for(let i = 0; i < (rang.all() > 10 ? 10 : rang.all()); i++) { 
            await Leaderboard.addUser(await bot.users.fetch(leaderboard[i].user), parseInt(leaderboard[i].level), parseInt(leaderboard[i].xp), (parseInt(leaderboard[i].level) + 1) * 1000)
        }
        const Image = await Leaderboard.toLeaderboard()

        await message.followUp({files: [new Discord.AttachmentBuilder(Image.toBuffer(), {name: "leaderboard.png"})]})
    }


}