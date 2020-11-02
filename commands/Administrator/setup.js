exports.run = (bot, message, args) => {
    message.guild.channels.create("Join to create", { type: "voice" }).then(ch => {
      bot.db.set("guildVoiceConf", ch.id, `${message.guild.id}.channel`);
      message.channel.send("Voice channel **Join to create** successfully created!");
    });
};

exports.conf = {
  aliases: [],
  cooldown: 1,
  guildOnly: true,
  userPerm: [""],
  botPerm: [""],
};

exports.help = {
  name: "setup",
  category: "Administrator",
  description: "Setup voice channel",
  usage: "setup",
  param: "",
};
