const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

let botid = ('672381245115727911') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL)
        .setColor('0x36393E')
        .setTitle(`${client.user.username} - Youtube EmreHD35 Studio`)
        .setDescription(`.radyo ➠ Radyoyu Açmanızı Sağlar.
.çal ➠ Belirtilen müziği oynatmayı sağlar.
.kapat ➠ Belirtilen müziği kapatmayı sağlar sağlar. 
cr!geç ➠ Sıradaki müziğe geçiş yapar.
cr!duraklat ➠ Müziği durkaklatır.
cr!devam ➠ Müziği devam ettirir.` )  
        .setThumbnail(client.user.avatarURL)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)
        .setFooter(`${message.author.username} Youtube EmreHD35 Studio`,message.author.avatarURL)
    return message.channel.sendEmbed(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0,
};

exports.help = {
  name: 'müzik',
  description: '',
  usage: ''
};