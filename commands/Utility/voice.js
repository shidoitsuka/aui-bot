exports.run = (bot, message, args) => {
  const checker = bot.db.has("userVoiceConf", message.author.id);
  if (!checker) bot.db.set("userVoiceConf", { name: message.author.username, channel: null }, message.author.id);
  
  switch (args[0]) {
    case "-name":
    case "-n":
      args.shift();
      if (args.join(" ") == "default") {
        bot.db.set("userVoiceConf", message.author.username, `${message.author.id}.name`);
      } else {
        bot.db.set("userVoiceConf", args.join(" "), `${message.author.id}.name`);
      }
      if (bot.db.get("userVoiceConf", `${message.author.id}.channel`) !== null) {
        message.guild.channels.cache.get(bot.db.get("userVoiceConf", `${message.author.id}.channel`)).setName(`${bot.db.get("userVoiceConf", `${message.author.id}.name`)}'s Voice Channel`);
      }
    break;
  }
};

exports.conf = {
  aliases: ["v"],
  cooldown: 1,
  guildOnly: true,
  userPerm: [""],
  botPerm: [""],
};

exports.help = {
  name: "voice",
  category: "Utility",
  description: "Set up your voice channel stuffs.",
  usage: "voice [param(s)]",
  param: "-name|n <new voice name>",
};
