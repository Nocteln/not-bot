const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

module.exports = {
    data: {
        name: "test",
    },
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId("test_modal")
            .setTitle("Tester les modals !");

        const newNameInput = new TextInputBuilder()
            .setCustomId("newTest")
            .setLabel("Ce test est concluant ?")
            .setMinLength(1)
            .setMaxLength(32)
            .setPlaceholder("Tape ta réponse ici !")
            .setStyle(TextInputStyle.Short);

        modal.addComponents(new ActionRowBuilder().addComponents(newNameInput));

        await interaction.showModal(modal);
    }
}