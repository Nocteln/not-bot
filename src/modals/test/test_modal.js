module.exports = {
    data: {
        name: "test_modal",
    },
    async execute(interaction) {
        const newTest = interaction.fields.getTextInputValue("newTest");
        
        return interaction.reply({ content: `Le bouton et le modal sont concluant : \`${newTest}\``, ephemeral: true});
    }
}