const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const { REST, Routes } = require('discord.js');

module.exports = async (client) => {
    const commands = [];

    (await pGlob(`${process.cwd()}/src/commands/*/*.js`, { windowsPathsNoEscape: 
        process.env.ON_WINDOWS })).map(async (cmdFile) => {
        const cmd = require(cmdFile);
        commands.push(cmd.data.toJSON());

        if ('data' in cmd && 'execute' in cmd) {
            client.commands.set(cmd.data.name, cmd);
        } else {
            console.log(`[AVERTISSEMENT] La commande à ${cmdFile} manque le champs "data" ou "execute".`);
        }
    });

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    (async () => {
        try {
            console.log(`Lancement du déploiement des ${commands.length} slash commandes (/).`);
    
            const data = await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                { body: commands },
            );
    
            console.log(`Déploiement des ${data.length} slash commandes (/) réussit.`);
        } catch (error) {
            console.error(error);
        }
    })();
};