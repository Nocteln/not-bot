const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/src/buttons/*/*.js`, { windowsPathsNoEscape: 
        process.env.ON_WINDOWS })).map(async (buttonFile) => {
        const button = require(buttonFile);

        if ('data' in button && 'execute' in button) {
            client.buttons.set(button.data.name, button);
        } else {
            console.log(`[AVERTISSEMENT] Le boutton à ${buttonFile} manque le champs "data" ou "execute".`);
        }
    });
};