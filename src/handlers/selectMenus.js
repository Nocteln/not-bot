const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/src/selectMenus/*/*.js`, { windowsPathsNoEscape: 
        process.env.ON_WINDOWS })).map(async (menuFile) => {
        const menu = require(menuFile);

        if ('data' in menu && 'execute' in menu) {
            client.selectMenus.set(menu.data.name, menu);
        } else {
            console.log(`[AVERTISSEMENT] Le selectMenu à ${menuFile} manque le champs "data" ou "execute".`);
        }
    });
};