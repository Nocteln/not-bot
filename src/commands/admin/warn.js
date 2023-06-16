const Discord = require("discord.js");
const { embedr } = require("../../fonctions/embed");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const warndb = db.table("warn")

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("warn")
    .setDescription(
      "Permet d'arvertir un utilisateur dans le serveur"
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator)
    .addUserOption((o) =>
      o
        .setName("membre")
        .setDescription("le membre à warn")
        .setRequired(true)
    )
    .addStringOption((o) =>
      o.setName("raison").setDescription("La raison du warn")
    ),
  cat: "admin",
  uti: "/warn [membre] (raison)",
  async execute(interaction) {
   const member = interaction.options.getMember("membre");
   let raison = interaction.options.getString("raison");
   if(!raison) raison = "Aucune raison fournie";

   if(!member) return embedr(interaction, "Veuillez mentionner un membre");

   if(member.id === interaction.user.id) return interaction.reply({embeds: [embedr("Red", ":x: erreur", "vous ne pouvez pas vous warn vous même")], ephemeral: true});

   if(member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({embeds: [embedr("Red", ":x: erreur", "vous ne pouvez pas vous warn vous même")], ephemeral: true});

   if(member.id === interaction.guild.ownerId) return interaction.reply({embeds: [embedr("Red", ":x: erreur", "vous ne pouvez pas vous warn le propriétaire du serveur!")], ephemeral: true});

    function createID(prefix) {
        let characters = [..."ABCDEFGHIJKLMNOPQRCTUVWXYZ0123456789"]
        let ID = []
        for(let i = 0; i < 10; i++) ID.push(characters[Math.floor(Math.random() * characters.length)])
    
    
        return `${prefix}-${ID.join("")}`
    }
    const id = createID(`${member.user.username}`)
    await warndb.set(`${id}}`, {user: member.id, raison: raison});

   
    interaction.reply({embeds: [embedr("Green", `:white_check_mark: succes!`, "Vous avez bien warn **" + member.user.tag + "**! pour la raison : \n\`" + raison + "\`\n ID du warn : \`" + id + "\`")]});
  },
};
