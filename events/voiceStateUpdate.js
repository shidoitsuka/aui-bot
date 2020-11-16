module.exports = (oldState, newState) => {
  // extends "bot" to get db
  const bot = oldState.guild.client;

  // vars
  const userID = oldState.id;
  const guildSetupChannel = bot.db.get("guildVoiceConf", `${oldState.guild.id}.channel`);
  const userSetupChannel = bot.db.get("userVoiceConf", `${userID}.channel`);

  /*
   * checking if user is from another voice channel
   */
  if (oldState.channelID !== null) {
    // if user is going to NULL channel, it means they left
    if (newState.channelID === null) {
      // delete channel if user's left their own channel
      if (oldState.channelID === userSetupChannel) {
        console.log("user left their own channel");
        bot.db.set("userVoiceConf", null, `${userID}.channel`);
        return oldState.channel.delete();
      }
      return;
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
        oldState.channel.delete();
      }
    }
    if (guildSetupChannel.includes(newState.channelID)) { // if user joins guild setup channel, move user to their own channel
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

      const userJoined = newState.channelID;
      newState.channel
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
