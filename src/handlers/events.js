const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/src/events/*/*.js`, { windowsPathsNoEscape: 
        process.env.ON_WINDOWS })).map(async (eventFile) => {
        const event = require(eventFile);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    });
};