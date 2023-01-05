const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/commands/*/*.js`)).map(async (cmdFile) => {
        const cmd = require(cmdFile);

        if ('data' in cmd && 'execute' in cmd) {
            client.commands.set(cmd.data.name, cmd);
        } else {
            console.log(`[AVERTISSEMENT] La commande à ${cmdFile} manque le champs "data" ou "execute".`);
        }
    });
};