const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
//DevTR
exports.run = (client, message, params) => {

if (!message.member.roles.has('ROL ID')) return message.reply("Yetkin yok!")

    if (!message.guild) return;
    if (message.channel.type !== 'dm') {

 let guild = message.guild
 let user = message.mentions.users.first();
 let banlog = message.guild.channels.get('KANAL ID') //Kanal id yaz.

  if (message.mentions.users.size < 1) return message.reply('**⚠ Kimi Yasaklamak İstediğini Yazmalısın!**').catch(console.error);

      message.guild.ban(user)
  const devtr = new Discord.RichEmbed()
    .setColor('RED')
    .setTimestamp()
  .setTitle('✅  `' +  message.author.username + '`  İşlem Başarılı Kullanıcı Sunucudan Yasaklandı!' )
  .setImage(`https://i.kym-cdn.com/photos/images/original/001/118/146/5ec.gif`)
  return banlog.send(devtr)
};
}      
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yasakla"],
  permLevel: 0
};
//DevTR
exports.help = {
  name: 'ban',
  description: 'Seçilen kişiyi banlar',
  usage: ' ban'
};