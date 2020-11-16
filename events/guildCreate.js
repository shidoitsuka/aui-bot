const { config } = require("../config.js");

module.exports = (guild) => {
  const bot = guild.client;
  try {
    const checker = bot.db.get("guildConf", guild.id);
    if (checker == undefined) throw Error();
  } catch (_) {
    // prettier-ignore
    bot.db.set("guildConf", {
         prefix: config.prefix,
         tags: {},
         star: {
           starChannel: null,
           used: []
         },
         bestmeme: {
           channel: null,
           accepts: [],
           used: []
         }
       }, guild.id);
  }
};
