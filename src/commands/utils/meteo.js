const Discord = require("discord.js");
const weather = require("openweather-apis");
const { embedr } = require("../../fonctions/embed");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("meteo")
    .setDescription("Obtenir la météo d'une ville")
    .addIntegerOption((o) =>
      o
        .setName("code")
        .setDescription(
          "Le code postal de la ville dont vous voulez voir la météo"
        ).setRequired(true)
    ),
  cat: "utils",
  uti: "/meteo",

  async execute(interaction) {
    
    if (interaction.options.getInteger("code"))
      zip = interaction.options.getInteger("code");
await interaction.deferReply()

  
       const isValid = /^\d{5}(-\d{4})?(?!-)$/.test(zip)

       if(!isValid) return interaction.editReply({embeds: [embedr("Red", ":x: erreur", "Veuillez entrer un code postal valide")]})
    weather.setLang("fr");

    try{
      
      weather.setZipCode(zip);
      weather.setAPPID("e3ec149b9263b286738d6e499480c828");
      // if (ville) weather.setCity(ville);
       weather.setUnits("metric");
      let embed = new Discord.EmbedBuilder().setTitle(`Météo`).setDescription("ville non reconnue");
      await weather.getTemperature(function (err, temp) {
        
      });
      await weather.getAllWeather(function(err, JSONObj){
        embed.addFields({ name: "Température: ", value: `${JSONObj.main.temp?JSONObj.main.temp:"Pas de données"}°` });
        embed.addFields({name: "Température ressentie :", value: `${JSONObj.main.feels_like?JSONObj.main.feels_like:"Pas de données"}°`})
        embed.addFields({name: "Température min :", value: `${JSONObj.main.temp_min?JSONObj.main.temp_min:"Pas de données"}°`})
        embed.addFields({name: "Température max :", value: `${JSONObj.main.temp_max?JSONObj.main.temp_max:"Pas de données"}°`})
        console.log(JSONObj.weather[0].main)
        switch (JSONObj.weather[0].main) {
          case "Clouds": 
          embed.setColor("Grey")
          break
          case "Clear":
            embed.setColor("Blue")
            break
        } 
      })
      await weather.getHumidity(function(err, hum){
        embed.addFields({name: "Humiditée :", value: `${hum}%`})
      })
    
      await weather.getDescription(function(err, desc){
        embed.setDescription(`${desc}`)
      })
      await setTimeout(function(){interaction.editReply({ embeds: [embed] });}, 1500)
    } catch(err){
      //console.log(err)
      interaction.editReply("cc") 
    }

    



    
  },
};
