const { Client, Collection, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();


const client = new Client({ intents: [3276799] }); //GatewayIntentBits.Guilds
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();

const { QuickDB, MySQLDriver } = require("quick.db");
(async () => {
  const mysql = new MySQLDriver({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "not-bot",
  });
  
  // Important: Connect to MySQL server before using it
  await mysql.connect();
  
  const db = new QuickDB({ driver: mysql });
})();

["commands", "events", "buttons", "modals", "selectMenus"].forEach(
  (handler) => {
    require(`./src/handlers/${handler}`)(client);
  }
  );
  
  process.on("exit", (code) => {
    console.error(`=> Le processus s'est arrêté avec le code : ${code}`);
  });
  
  process.on("uncaughtException", (err, origin) => {
    console.error(`=> UNCAUGHT_EXCEPTION : ${err}`);
    console.error(`Origine : ${origin}`);
  });
  
  process.on("unhandledRejection", (reason, promise) => {
    console.error(`=> UNHANDLE_REJECTION : ${{ reason }}`);
    console.error(promise);
  });
  
  process.on("warning", (...args) => {
    console.error(...args);
  });
  
  client.login(process.env.TOKEN);
  