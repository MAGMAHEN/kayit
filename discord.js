const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
var Jimp = require('jimp');
const weather = require('weather-js')
require('./util/eventLoader')(client);
const request = require('request');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "7/24 AKTİF TUTMA İŞLEMİ BAŞARILI");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//---------------------------------KOMUTLAR---------------------------------\\

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = 'Λ' //Tag
  const sunucu = '736187402384572426' //Sunucu
  const kanal = '789178636354715718' //Kanal
  const rol = '789178522114588703' //Rol
  
  try { 
  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser.username}, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim\n\n**__Ailemize Hoşgeldin__**`, new Discord.MessageAttachment("navori.png")).catch(e => console.log("Özel Kapalı"))
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam **${newUser.username}**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım\n\n**__Ailemizden Ayrıldın Tekrar Bekliyoruz__**`, new Discord.MessageAttachment("navori.png")).catch(e => console.log("Özeli Kapalı"))
  }
} catch (e) {
client.guilds.cache.get(sunucu).members.cache.get(ayarlar.sahip).send(`Oto Tag İsimli Komutta Hata\n\n${e}`)
 }
}
});


//
 

//

client.on("guildMemberAdd", member => {
let botrol = '789178528377733120'          //DevTR
let üyerol = '789178527374770197'
  if (member.user.bot) {
  member.addRole(botrol) 
 } else {
member.addRole(üyerol) 
};
});
require("moment-duration-format");

client.on('guildMemberAdd', async devtr => {
let sunucu = `736187402384572426` //Verilcek Rolün Olduğu Sunucunun ID'sini girin.
let rol = `789178525000138773` //Verilcek Rol ID
let kanal = `789178669124812802` //Fake Bildirim Log Kanalı ID.
let gün = 15 //Bu günden önce giren hesaplar ceza yer.
let hesap = moment.duration(new Date().getTime() - devtr.user.createdAt.getTime()).format('DD')
if(gün < hesap) return client.channels.get(kanal).send(`**${devtr.user.tag}** isimli kullanıcı sunucuya giriş yaptı, hesabı **${gün}** günden sonra açıldığı için kullanıcıya **dokunulmadı**.`)
devtr.guild.members.get(devtr.id).roles.forEach(r => {
devtr.guild.members.get(devtr.id).removeRole(r)

})

devtr.addRole(rol)
client.channels.get(kanal).send(`**${devtr.user.tag}** adlı kullanıcı sunucuya giriş yaptı, hesabı **${gün}** günden önce açıldığı için kullanıcıya \`${client.guilds.get(sunucu).roles.get(rol).name}\` adlı rol **verildi**.`)
});
client.on("guildMemberAdd", member => {
  const kanal = "789178630038880286"; //kişi geldiği zaman mesaj atılacak kanal id
  moment.locale("tr");// Saat icin gerekli
  let samet = client.channels.get(kanal);
  samet.send(
    " " +
      member +
      "** Hoş Geldin! **\n\n **Seninle Birlikte " +
      member.guild.memberCount +
      " Kişiyiz!** \n\n< **Kayıt işleminin başlaması için,<@&789178533628608533> yetkililerini etiketleyip ses teyit odalarına geçebilirsin.**  \n\n **Hesabın Oluşturulma Tarihi :** " +
      moment(member.user.createdAt).format("DD MMMM YYYY, dddd  hh:mm:ss ") +
      " \n\n **Kayıt işlemin tamamlanırken ölüm ile yaşam arasında ki çizgiyi takip et! **",
    new Discord.Attachment(
      "https://cdn.discordapp.com/attachments/583680695293968404/601813274090274836/giphy.gif"
    )
  );
});

client.on("ready", () => {
  client.channels.cache.get("791280347547566080").join();
})