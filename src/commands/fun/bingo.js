const Discord = require("discord.js");
const { embedr } = require("../../fonctions/embed");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("bingo")
    .setDescription("Permet de jouer au bingo")
    .addNumberOption((option) =>
      option.setName("max").setDescription("le nombre max possible")
    )
    .addStringOption((o) =>
      o
        .setName("aide")
        .setDescription(
          "Voulez vous de l'aide qui indique si vous etes proche ou non du nombre?"
        )
        .addChoices(
          { name: "oui", value: "oui" },
          { name: "non", value: "non" }
        )
    ),
  cat: "fun",
  uti: "/bingo",

  async execute(interaction) {
    const max = interaction.options.getNumber("max");
    const aide = interaction.options.getString("aide");
    const embed = new Discord.EmbedBuilder()
      .setTitle("Bingo!")
      .setDescription("Trouvez le bon nombre en un minimum de coup!")
      .setColor("Red");

    await interaction.reply({ embeds: [embed] });

    let num;
    let upper;
    if (max) {
      num = Math.floor(Math.random() * max);
      upper = max;
    } else {
      num = Math.floor(Math.random() * 100);
      upper = 100;
    }
    console.log(num);

    let win = false;
    let winner = "";
    let tries = 0;
    let lower = 0;

    while (!win) {
      await interaction.channel
        .awaitMessages({ max: 1, time: 60_000, errors: ["time"] })
        .then((collected) => {
          collected.first().delete();
          const number = parseInt(collected.first().content);
          if (isNaN(number)) return;

          tries++;

          if (num === number) {
            win = true;
            winner = collected.first().author.username;
            return;
          }
          if (aide === "oui") {
            if (num > number) {
              rep = "Plus Grand";
              if (lower < number) lower = number;
            } else {
              rep = "Plus petit";
              if (upper > number) upper = number;
            }
            const embedMessage = embed.setDescription(
              `Le nombre indiqué est \`${number}\`. Le nombre est \`${rep}\`\n Il est compris entre \`${lower}\` et \`${upper}\``
            );

            interaction.editReply({ embeds: [embedMessage] });
          }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const embed2 = new Discord.EmbedBuilder()
      .setTitle("Bingo!")
      .setDescription(
        `Félicitation! La réponse était bien \`${num}\`! \`${winner}\` l'as trouvé en \`${tries}\` coups`
      )
      .setColor("Green");
    interaction.editReply({ embeds: [embed2] });
  },
};
