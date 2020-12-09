const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async(client, message, args) => {
let sebep = args.slice(0).join(` `)
if(!sebep) return message.channel.send(`:x: AFK olmak için bir sebep belirtmelisin.`)
db.set(`devtr.afk.${message.author.id}`, { zaman: Date.now(), sebep: sebep })
message.channel.send(`Başarıyla AFK moduna geçiş yaptın, seni etiketleyenlere \`${sebep}\` sebebiyle AFK olduğunu söyleyeceğim.`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'afk',
  description: 'AFK olursunuz.',
  usage: 'afk <Sebep>'
};