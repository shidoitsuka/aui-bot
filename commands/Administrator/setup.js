exports.run = (bot, message, args) => {
  if (typeof bot.db.get("guildVoiceConf", `${message.guild.id}.channel`) == "undefined") {
    bot.db.set("guildVoiceConf", [], `${message.guild.id}.channel`);
  }
  message.guild.channels
    .create("Join to create", { type: "voice" })
    .then((ch) => {
      bot.db.push("guildVoiceConf", ch.id, `${message.guild.id}.channel`);
      message.channel.send("Voice channel **Join to create** successfully created!");
    });
};

exports.conf = {
  aliases: [],
  cooldown: 1,
  guildOnly: true,
  userPerm: ["ADMINISTRATOR"],
  botPerm: ["ADMINISTRATOR"],
};

exports.help = {
  name: "setup",
  category: "Administrator",
  description: "Setup voice channel",
  usage: "setup",
  param: "",
};
