const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
   if(!message.member.roles.cache.has('770766698386554880'))  //Kayıt yetkilisi rolü  ID
  return message.channel.send('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin ')
   let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
   if(!member) {
       return message.channel.send('Bir kişi etiketlemelisin')
   }
//Burayı Doldur
   let Erkek = message.guild.roles.cache.find(r => r.id === '770755590187778109') //Erkek
//   let uye = message.guild.roles.cache.find(r => r.id === '770755588867096607') //Üye rolü
   let kayıtsız = message.guild.roles.cache.find(r => r.id === '770765085572464650') // Kayıtsız
//Burayı Doldur
   if(!Erkek) {
       return message.channel.send('Erkek rolü ayarlanmamış veya rol aranırken bir hata oluştu logu kontrol et')
   }
   if(!kayıtsız) {
       return message.channel.send('kayıtsız rolü ayarlanmamış veya rol aranırken bir hata oluştu logu kontrol et')
   }
   let kayıt = message.guild.member(member)
   let isim = args[1]
   let yas = args[2]

   if(!isim) return message.channel.send('İsim belirtmelisin')
   if(isNaN(yas)) return message.channel.send('Yaş belirtmelisin')

   kayıt.setNickname(`V ${isim} | ${yas}`)
   kayıt.roles.add(Erkek)
 //  kayıt.roles.add(uye)
   kayıt.roles.remove(kayıtsız)
   let embed = new Discord.MessageEmbed()
   .setColor('GREEN')
   .setTitle('Kayıt Tamamlandı')
   .addField('Kayıt edilen kullanıcı', member)
   .addField('Adı :', isim)
   .addField('Yaşı :', yas)
   .addField('Kayıt eden yetkili', message.author)
   client.channels.cache.get('766627364724932608').send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['erkek','e'],
    permlevel: 0
};

exports.help = {
    name: "kayıt-erkek"
}
//Editlersiniz Kendiniz
 