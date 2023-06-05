const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, PermissionFlagsBits, ButtonStyle, PermissionsBitField } = require('discord.js');
const { embedr } = require("../../fonctions/embed")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Supprimez le nombre de message que vous souhaitez.")
    .addIntegerOption(option => option.setName('amount').setDescription(`Nombre de message à supprimer.`).setMinValue(1).setMaxValue(100).setRequired(true))
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    cat: "admin",
    uti: "",
  async execute(interaction, client) {

    let number = interaction.options.getInteger(`amount`);

    const embed2 = new EmbedBuilder()
    .setColor('Red')
    .setTimestamp()
    .setDescription(`**Suppréssion des messages effectué !**`)
    .addFields(
        {
            name: "<:br:997908527442034718> | Administrateur:",
            value: `<:flrg:997911019944935484> ${interaction.user}`,
            inline: true,
        },
        {
            name: "<:br:997908527442034718> | Message Supprimé",
            value: `<:flrg:997911019944935484> \`${number}\``,
            inline: true,
        }
    )
        try {
          await interaction.reply({embeds: [embedr("Green", ":white_check_mark: succès", number === 1?`${number} message a été supprimé`: `${number} messages ont été supprimé`)], ephemeral: true});
          await interaction.channel.bulkDelete(number)

        } catch(err) {
          console.log(`erreur dans le clear.js : \n ${err}`)
          return interaction.reply({embeds: [embedr("Red", ':x: erreur', "Les messages que vous tentez de supprimer sont trop anciens !")], ephemeral: true})
        }
    
  },
};