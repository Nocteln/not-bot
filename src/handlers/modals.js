const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/src/modals/*/*.js`, { windowsPathsNoEscape: 
        process.env.ON_WINDOWS })).map(async (modalFile) => {
        const modal = require(modalFile);

        if ('data' in modal && 'execute' in modal) {
            client.modals.set(modal.data.name, modal);
        } else {
            console.log(`[AVERTISSEMENT] Le modal à ${modalFile} manque le champs "data" ou "execute".`);
        }
    });
};