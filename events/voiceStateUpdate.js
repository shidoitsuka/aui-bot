module.exports = (oldState, newState) => {
  // extends "bot" to get db
  const bot = oldState.guild.client;

  // vars
  const userID = oldState.id;
  const guildSetupChannel = bot.db.get("guildVoiceConf", `${oldState.guild.id}.channel`);
  const userSetupChannel = bot.db.get("userVoiceConf", `${userID}.channel`);

  /*
   * IF
   * old state != null AND new state == null
   * THEN
   * user left channel
   */
  if (oldState.channelID !== null && newState.channelID === null) {
    // don't delete channel if user's left setup channel (in case there is a problem)
    if (oldState.channelID === guildSetupChannel) {
      console.log("user left guild setup channel");
      return bot.db.set("userVoiceConf", null, `${userID}.channel`);
    }
    // delete channel if user's left their own channel
    if (oldState.channelID === userSetupChannel) {
      console.log("user left their own channel");
      bot.db.set("userVoiceConf", null, `${userID}.channel`);
      return oldState.channel.delete();
    }
  }

  /*
   * MAIN PROCESS
   * 
   * 
   * IF
   * new state != null
   * THEN
   * user joined channel
   */
  if (newState.channelID !== null) {
    if (oldState.channelID !== null) { // if user's old channel is not null, it means user is from another channel
      if (oldState.channelID === userSetupChannel) { // if old channel is owned by user, delete it
        bot.db.set("userVoiceConf", null, `${userID}.channel`);
        return oldState.channel.delete();
      }
    }
    if (newState.channelID === guildSetupChannel) { // if user joins guild setup channel, move user to their own channel
      // generating their username
      let userName;
      newState.guild.members.cache.map((u) => {
        if (u.user.id !== userID) return;
        userName = u.user.username;
      });

      // check if user is present in db
      const checker = bot.db.has("userVoiceConf", userID);
      if (!checker)
        bot.db.set("userVoiceConf", { name: userName, channel: null }, userID);
      userName = bot.db.get("userVoiceConf", `${userID}.name`);

      // newState.guild.channels
      //   .create(`${userName}'s Voice Channel`, { type: "voice" })
      //   .then((c) => {
      //     bot.db.set("userVoiceConf", c.id, `${userID}.channel`);
      //     newState.setChannel(c.id);
      //     const channelPosition = c.position;
      //     const guildSetupChannelPosition = newState.guild.channels.cache.get(guildSetupChannel).position;
      //     newState.guild.channels.cache.get(c.id).setPosition(guildSetupChannelPosition + 1);
      //   });
      newState.guild.channels.cache
        .get(guildSetupChannel)
        .clone({ name: `${userName}'s Voice Channel`, tpye: "voice" })
        .then((c) => {
          bot.db.set("userVoiceConf", c.id, `${userID}.channel`);
          newState.setChannel(c.id);
          // const channelPosition = c.position;
          // const guildSetupChannelPosition = newState.guild.channels.cache.get(guildSetupChannel).position;
          // newState.guild.channels.cache.get(c.id).setPosition(guildSetupChannelPosition + 1);
        });
    }
  }
};
