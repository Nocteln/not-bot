const Discord = require("discord.js");
const { embedr } = require("../../fonctions/embed");
const { cp } = require("fs");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("pendu")
    .setDescription("Permet de jouer au pendu")
    .addStringOption((o) =>
      o
        .setName("mot")
        .setDescription("Mot à deviner (si vous n'en avez pas ne mettez rien)")
    ),
  cat: "fun",
  uti: "/pendu",

  async execute(interaction) {
    const wordlist = [
      "maison",
      "voiture",
      "ordinateur",
      "travail",
      "famille",
      "amour",
      "argent",
      "vacances",
      "sport",
      "sante",
      "ami",
      "musique",
      "film",
      "livre",
      "restaurant",
      "cafe",
      "manger",
      "boire",
      "rêve",
      "jardin",
      "anniversaire",
      "voyage",
      "weekend",
      "plage",
      "soleil",
      "lune",
      "etoile",
      "temps",
      "histoire",
      "magasin",
      "fête",
      "art",
      "danse",
      "jeu",
      "balade",
      "parc",
      "animaux",
      "enfant",
      "bonheur",
      "rire",
      "chanson",
      "photo",
      "rire",
      "sourire",
      "cadeau",
      "heureux",
      "routinier",
      "routine",
      "ecole",
      "triste",
      "dormir",
      "reveil",
      "metro",
      "bus",
      "train",
      "avion",
      "velo",
      "marcher",
      "courir",
      "nager",
      "escalade",
      "lecture",
      "ecriture",
      "peinture",
      "bricolage",
      "cuisine",
      "fleur",
      "forêt",
      "montagne",
      "campagne",
      "ville",
      "village",
      "nature",
      "environnement",
      "énergie",
      "économie",
      "politique",
      "science",
      "technologie",
      "internet",
      "réseaux sociaux",
      "telephone",
      "message",
      "email",
      "nouvelles",
      "journal",
      "magazine",
      "documentaire",
      "emission",
      "spectacle",
      "concert",
      "theatre",
      "opéra",
      "musée",
      "exposition",
      "rencontre",
      "amitie",
      "amoureux",
      "relation",
      "mariage",
      "divorce",
      "naissance",
      "mort",
      "avenir",
      "passe",
      "present",
    ];

    let faux = 0;
    let fauxstr = "".split("");
    const indiqu = interaction.options.getString("mot")
    console.log(typeof(indiqu))
    let mot 
    if(indiqu) {
        mot = indiqu.split("")
    } else {
        ia= Math.floor(Math.random() * wordlist.length);
        mot = wordlist[ia];
    }
    let mot2 = "-".repeat(mot.length);

    let rep = mot2.split("");
    const embed = new Discord.EmbedBuilder()
      .setTitle(`**${mot2}**`)
      .setDescription(`Essayez de trouver le mot!`)
      .setColor("Random");

    await interaction.reply({ embeds: [embed] });

    while (rep !== mot) {
      await interaction.channel
        .awaitMessages({ max: 1, time: 60000, errors: ["time"] })
        .then((collected) => {
          const rep2 = collected.first().content;
          if (rep2.length > 1) return;
          collected.first().delete();
          let embedmsg;

          for (let i = 0; i < mot.length; i++) {
            if (rep2 === mot[i]) {
              rep[i] = rep2;
              embedmsg = embed.setTitle(`**${rep.join("")}**`);
              if (rep.join("") === mot.join(""))
               interaction.editReply({
                  embeds: [
                    embedr(
                      "Green",
                      "Bravo",
                      `Vous avez trouvé le bon mot qui était : ${mot.join("")}`
                    ),
                  ],
                });
              interaction.editReply({ embeds: [embedmsg] });
            //   return;
            }
          }
          faux++;
          fauxstr.push(rep2);
          embedmsg = embed.setDescription(
            `Caractères faux : ${fauxstr.join(", ")}`
          );
          interaction.editReply({ embeds: [embedmsg] });
        })
        .catch((err) => {
          //   console.error(err);
        //   return interaction.editReply({
        //     embeds: [embedr("Red", ":x: Trop long", `Vous avez été trop long`)],
        //   });
        });
    }
  },
};
