module.exports = (guild) => {
  const bot = guild.client;
  try {
    const checker = bot.db.get("guildConf", guild.id);
    if (checker == undefined) throw Error();
  } catch (_) {
    // prettier-ignore
    bot.db.set("guildConf", {
         prefix: "!",
         tags: {},
         star: {
           starChannel: null,
           used: []
         }
       }, guild.id);
  }
};
