const texts = {
  AFKWelcome: message => {
    return [
      `Selamat Datang Kembali **${message.author.username}**!`,
      `Hai! Anda tidak lagi AFK sekarang, **${message.author.username}**`,
      `Okaerinasai, **${message.author.username}**!`,
    ].random();
  },
  AFKMentioned: () => {
    return [
      "Orang yang kamu mention sedang AFK. Katanya sih : ",
    ].random();
  },
  MikuMentionedEmojis: () => {
    // prettier-ignore
    return ["(UωU)", "(OωO)"].random();
  },
  MikuMentionedTexts: (bot, message) => {
    // prettier-ignore
    return [`Prefix saya di guild ini adalah \`${bot.db.get("guildConf", message.guild.id + ".prefix")}\``].random();
  },
  CooldownTexts: message => {
    return [
      `O//w//O Mohon tunggu sebentar!\n_(cooling down)_`,
      `Bisakah anda.... Menunggu?`,
      `**${message.author.username}**, anda dalam cooldown!`,
      `Cooling down.`,
    ].random();
  },
  EightballTexts: () => {
    return [
      "Coba lagi nanti (〜￣▽￣)〜",
      "Aku tidak tahu!",
      // positives
      "Yaaa!",
      "Tentu saja! OwO)-b",
      "Sepertinya iya! `(OwO)`",
      "Uhh... Iya... Mungkin?",
      // negatives
      "Tidak",
      "Tidak!",
      "Jangan berharap yaaa",
      "Aku belum di program untuk mengetahui hal tersebut..."
    ].random();
  },
  CatDogNameEmojis: () => {
    return [
      "OwO",
      "( 0w0)-b",
      "😁",
      "😌",
      "😳",
      "🐱",
      "😆",
      "👌",
      "😙"
    ].random();
  }
};
module.exports = texts;
