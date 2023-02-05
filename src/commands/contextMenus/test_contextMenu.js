const { ContextMenuCommandBuilder, ApplicationCommandType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('test user')
        .setType(ApplicationCommandType.User)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        return interaction.reply({ content: "Voici le menu contextuel test qui fonctionne correctement !", ephemeral: true})
    }
}