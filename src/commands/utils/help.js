const Discord = require("discord.js");
const fs = require("fs")

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("help")
    .setDescription("Permet d'avoir de l'aide sur les commandes")
    .addStringOption(o=>o.setName("commande").setDescription("Commande que vous voulez voir"))
    ,
    cat: "help",    

  async execute(interaction) {
    let command
    if(interaction.options.getString("commande")) {
      command = interaction.options.getString("commande")
      if(!command) return message.reply("Commande non trouvée")
      console.log(command.data.name)
  }
    if(!command) {
      interaction.client.commands.forEach(cmd => {
        let category = []
        if(cmd.cat)console.log(cmd.data.name)
      });
    }
    
  },
};
