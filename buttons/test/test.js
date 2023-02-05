module.exports = {
    data: {
        name: "test",
    },
    async execute(interaction) {
        return interaction.reply({ content: "Voici le bouton test qui fonctionne correctement !", ephemeral: true});
    }
}