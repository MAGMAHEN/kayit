const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
   if(!message.member.roles.cache.has('789178533628608533'))  //Kayıt yetkilisi rolü  ID
  return message.channel.send('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin ')
   let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
   if(!member) {
       return message.channel.send('Bir kişi etiketlemelisin')
   }
//Burayı Doldur
   let Erkek = message.guild.roles.cache.find(r => r.id === '789178526619533373') //Erkek
   let uye = message.guild.roles.cache.find(r => r.id === '791275847121109033') //Üye rolü
   let kayıtsız = message.guild.roles.cache.find(r => r.id === '789178527374770197') // Kayıtsız
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

   kayıt.setNickname(`${isim} ${yas}`)
   kayıt.roles.add(Erkek)
   kayıt.roles.add(uye)
   kayıt.roles.remove(kayıtsız)
  const embed = new Discord.RichEmbed()
    .setDescription("Kayıt İşlemi Başarılı")
    .setColor("GREEN")
    .addField(":star: Yetkili", message.author)
    .setTimestamp()
    .addField(":star: Kaydedilen Üye", member)
    .setTimestamp()
    .addField(`:star: Verilen Rol`, message.guild.roles.get('791275847121109033','789178526619533373'))
    .setTimestamp()
    //.addField(`:star: Alınan Rol`, message.guild.roles.get(arol))
    .setFooter("© Register");
  message.channel.send(embed);
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['erkek','e'],
    permlevel: 0
};

exports.help = {
    name: "kayıt-erkek"
}}
//Editlersiniz Kendiniz
 