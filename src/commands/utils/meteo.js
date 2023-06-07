const Discord = require("discord.js");
const weather = require("openweather-apis");
const { embedr } = require("../../fonctions/embed");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("meteo")
    .setDescription("Obtenir la météo d'une ville")
    .addStringOption((o) =>
      o
        .setName("ville")
        .setDescription("La ville dont vous voulez voir la météo")
    )
    .addIntegerOption((o) =>
      o
        .setName("code")
        .setDescription(
          "Le code postal de la ville dont vous voulez voir la météo"
        )
    ),
  cat: "utils",
  uti: "/meteo",

  async execute(interaction) {
    // let ville;
    // if (interaction.options.getString("ville"))
    //   ville = interaction.options.getString("ville");

    let zip;
    if (interaction.options.getInteger("code"))
      zip = interaction.options.getInteger("code");

    // if (
    //   !interaction.options.getString("ville") &&
    //   !interaction.options.getInteger("code")
    // )
    //   return interaction.reply({
    //     embeds: [
    //       embedr(
    //         "Red",
    //         ":x: erreur",
    //         "veuillez indiquer un nom de ville ou un code postal"
    //       ),
    //     ],
    //   });

    // if (zip.toString().length !== 5)
    //   return interaction.reply({
    //     embeds: [
    //       embedr(
    //         "Red",
    //         ":x: erreur",
    //         "veuillez indiquer un code postal valide !"
    //       ),
    //     ],
    //   });
    weather.setLang("fr");
    weather.setZipCode(95170);
    weather.setAPPID("e3ec149b9263b286738d6e499480c828");
    // if (ville) weather.setCity(ville);
    // weather.setUnits("metric");
    let embed = new Discord.EmbedBuilder().setTitle(`Météo`);
    await weather.getTemperature(function (err, temp) {
      embed.addFields({ name: "Température: ", value: temp });
    });

    await interaction.reply({ embeds: [embed] });
  },
};
