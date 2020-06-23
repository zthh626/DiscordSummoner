const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!summon "

const token = process.env.TOKEN
let tmp = process.env.THE_BOYS.split(' ');
const the_boys = [];

for(let i = 0; i<tmp.length; i++){
    the_boys.push(tmp[i].split('.')[1]);
}


client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    if (message.content != prefix + 'all the boys' && !message.mentions.users.size) {
        return message.reply('please mention a user');
    }

    let users = message.mentions.users.array();

    let mes = 'summoning ';
    let user_ids = '';

    if(message.content === prefix + 'all the boys'){
        for(let i = 0; i < the_boys.length; i++){
            user_ids += '<@' + the_boys[i] + '> ';
        }
    }else{
        for(let i = 0; i < users.length; i++){
            user_ids += '<@' + users[i].id + '> ';
        }
    }

    mes += user_ids;
    let counter = 1;

    let interval = setInterval(function(){ 
        message.channel.send(mes, {
            tts: true
        });
        counter ++;
        if(counter > 5){
            clearInterval(interval);
        }
    }, 1500);

    return;
});

client.login(token);