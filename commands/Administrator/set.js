const fs = require("fs");
const parameters = [
  "\n-prefix     : set guild's custom prefix. (use \"default\" to use miku's default prefix)"
].join("\n");

exports.run = (bot, message, args) => {
  let prefix, welcome, star;
  prefix = bot.db.get("guildConf", `${message.guild.id}.prefix`);
  // prettier-ignore
  bot.db.get("guildConf", `${message.guild.id}.star.starChannel`) == null ? star = "not specified!" : star = bot.channels.cache.get(bot.db.get("guildConf", `${message.guild.id}.star.starChannel`)).name;
  // prettier-ignore
  if (!args[0]) return message.channel.send(`prefix          :: ${prefix}
star            :: ${star}`,
      { code: "asciidoc" }
    );

  // SWITCH
  switch (args[0]) {
    // prefix
    case "-p":
    case "-pref":
    case "-prefix":
      // parameter to use default prefix
      if (args[1].toLowerCase() == "default") {
        bot.db.set("guildConf", ";", `${message.guild.id}.prefix`);
        message.channel.send("Reseted to default prefix!");
      } else {
        // prettier-ignore
        if (!args[1] || args[1].length > 1) return message.channel.send("Please input one length of custom prefix.");
        bot.db.set("guildConf", args[1], `${message.guild.id}.prefix`);
        // prettier-ignore
        message.channel.send(`Changed my prefix in this guild to \`${args[1]}\``);
      }
      break;
    // starboard
    case "-star":
      // parameter to turn off starboard system
      if (args[1] == "off") {
        bot.db.set("guildConf", null, `${message.guild.id}.star.starChannel`);
        return message.channel.send("Turned off star system!");
      }
      // prettier-ignore
      if (!message.mentions.channels.first()) return message.channel.send("No channel selected!");
      // prettier-ignore
      bot.db.set("guildConf", message.mentions.channels.first().id, `${message.guild.id}.star.starChannel`);
      // prettier-ignore
      message.channel.send(`I\'ve set \`#${message.mentions.channels.first().name}\` as star channel!`);
      break;
    // DEFAULT VALUE
    default:
      message.channel.send("Invalid Parameter(s)!");
  }
};

exports.conf = {
  aliases: [],
  cooldown: 1,
  guildOnly: true,
  userPerm: [""],
  botPerm: [""]
};

exports.help = {
  name: "set",
  category: "Administrator",
  description: "Guild configuration",
  usage: "set -<param>",
  param: parameters
};
