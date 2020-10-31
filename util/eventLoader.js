const eventReq = event => require(`../events/${event}`);
module.exports = bot => {
  bot.on("ready", () => eventReq("ready")(bot));
  bot.on("guildCreate", eventReq("guildCreate"));
  bot.on("guildDelete", eventReq("guildDelete"));
  bot.on("messageReactionAdd", eventReq("messageReactionAdd"));
  bot.on("voiceStateUpdate", eventReq("voiceStateUpdate"));
  bot.on("message", eventReq("message"));
};
