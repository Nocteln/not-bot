const Discord = require("discord.js");
const { embedr } = require("../../fonctions/embed");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("clear")
    .setDescription("Permet d'éffacer une certaine quantitée de message")
    .setDMPermission(false)
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ManageMessages)
    .addNumberOption((o) =>
      o
        .setName("quantité")
        .setDescription("la quantitée de message à supprimer")
        .setRequired(true)
    ),

  async execute(interaction) {
    const number = interaction.options.getNumber("quantité");
    if (parseInt(number) <= 0 || parseInt(number) > 100)
      return interaction.reply({
        embeds: [
          embedr(
            "Red",
            ":x: erreur",
            "Veuillez indiquer un nombre compris entre 0 et 100"
          ),
        ],
      });

    try {
      let messages = await interaction.channel.bulkDelete(parseInt(number));
      await interaction.reply({
        embeds: [
          embedr(
            "Green",
            ":white_check_mark: success",
            `${messages.size} messages suprimés dans le salon ${channel}`
          ),
        ],
      });
    } catch (err) {
      let messages = [
        ...(await interaction.channel.messages.fetch())
          .filter((msg) => Date.now() - msg.createdAt <= 1209600000)
          .values(),
      ];
      if (messages.length <= 0)
        return interaction.reply({
          embeds: [
            embedr(
              "Red",
              "❌ erreur",
              `Aucun message à supprimer car ils datent de plus de 14 jours`
            ),
          ],
        });

      await interaction.channel.bulkDelete(messages);
      await interaction.reply({
        embeds: [
          embedr(
            "Green",
            ":white_check_mark: succes",
            `${messages.size} messages suprimés car les autres dataient de plus de 14 jours`
          ),
        ],
      });
    }
  },
};
