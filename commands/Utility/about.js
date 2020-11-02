const Discord = require("discord.js");
const package = require("../../package.json");
const { cpu, mem, os } = require("node-os-utils");

exports.run = async (bot, message, args) => {
  const cpuUsage = (await cpu.usage()) + "%";
  const memoryUsage = (await mem.info()).freeMemMb + "MB";
  // prettier-ignore
  const operatingSystem = `${os.type()} ${await os.oos().then(o => o)} ${os.arch()}`;
  // prettier-ignore
  const embed = new Discord.MessageEmbed()
    .setAuthor(`About`, "", "https://github.com/shidoitsuka/aui-bot")
    .setColor(0xf21616)
    .setDescription("AUI Bot here to serve Among Us Indonesia server!\nWritten over [Discord.js](https://discord.js.org/) based on [Miku](https://github.com/shidoitsuka/another-miku-bot) with  ❤ by 12042#5754.")
    .addField("NodeJS version:", `${process.version.slice(1).split(".").join(".")}`, true)
    .addField("Discord.js version:", `${package.dependencies["discord.js"]}`, true)
    .addField("Miku version:", "v2.0", true)
    .addField("Executed Command(s):", bot.db.get("totalCommands"), true)
    .addField("CPU Usage:", cpuUsage, true)
    .addField("Memory Usage:", memoryUsage, true)
    .addField("OS Info:", operatingSystem, true)
    .setFooter(`Click title for source code | v${package.version}-initial`);
  message.channel.send({ embed });
};

exports.conf = {
  aliases: ["info"],
  cooldown: 7,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "about",
  category: "Utility",
  description: "Print out my information such as modules, version, etc.",
  usage: "about",
  param: ""
};

// .addField("canvas version:", `${package.dependencies["canvas"].slice(1)}`, true)
// .addField("relevant-urban version:", `${package.dependencies["relevant-urban"].slice(1)}`, true)
// .addField("canvas-constructor version:", `${package.dependencies["canvas-constructor"].slice(1)}`, true)
// .addField("cat-names version:", `${package.dependencies["cat-names"].slice(1)}`, true)
// .addField("chalk version:", `${package.dependencies["chalk"].slice(1)}`, true)
// .addField("dog-names version:", `${package.dependencies["dog-names"].slice(1)}`, true)
// .addField("enmap version:", `${package.dependencies["enmap"].slice(1)}`, true)
// .addField("enmap-level version:", `${package.dependencies["enmap-level"].slice(1)}`, true)
// .addField("fs-nextra version:", `${package.dependencies["fs-nextra"].slice(1)}`, true)
// .addField("gfycat-sdk version:", `${package.dependencies["gfycat-sdk"].slice(1)}`, true)
// .addField("google-images version:", `${package.dependencies["google-images"].slice(1)}`, true)
// .addField("math.js version:", `${package.dependencies["mathjs"].slice(1)}`, true)
// .addField("nekos.life version:", `${package.dependencies["nekos.life"].slice(1)}`, true)
