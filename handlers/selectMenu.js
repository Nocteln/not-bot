const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/selectMenu/*/*.js`)).map(async (menuFile) => {
        const menu = require(menuFile);

        if ('data' in menu && 'execute' in menu) {
            client.menus.set(menu.data.name, menu);
        } else {
            console.log(`[AVERTISSEMENT] Le selectMenu à ${menuFile} manque le champs "data" ou "execute".`);
        }
    });
};