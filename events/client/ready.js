const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		let guildsCount = await client.guilds.fetch();
        let usersCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

		client.user.setPresence({ status: 'online' });

        console.log(`${client.user.username} est prêt à être utilisé par ${usersCount} utilisateurs sur ${guildsCount.size} serveurs !`);
	},
};