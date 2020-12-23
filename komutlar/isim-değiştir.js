const Discord = require('discord.js')
exports.run = async (client, message, args) => {

  if(!message.member.roles.has("789178533628608533")) return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkilisi rolüne sahip olmasınız.`); 
  let member = message.mentions.members.first()
  let devtr = args.slice(1).join(" ")
  if (!member) return message.channel.send('**Bir üye etiketlemelisin**')
  if (!devtr) return message.channel.send('**Bir isim yazmalısın**')
  member.setNickname(`● | ${devtr} `)
  const xfalcon = new Discord.RichEmbed()
  .setColor('BLUE')
  .addField(`• Kullanıcının Yeni adı değiştirildi.`, `:white_small_square: Değiştirilen kullanıcı : ${member.user} \n:white_small_square: Düzenlenmiş kullanıcı adı : \`● | ${devtr}\``)
  .setFooter(`Komutu kullanan yetkili : ${message.author.username}`)  
  .setThumbnail(client.user.avatarURL)
  message.channel.send(xfalcon)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['isim','nick'],
  permLevel: 0
};
exports.help = {
  name: 'isim',
  description: "İsim değiştirmeye ne dersin yakışıklı",
  usage: 'isim <yeni nick >'
};