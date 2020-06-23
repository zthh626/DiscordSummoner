const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, the_boys } = require('./config.json');

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    if (message.content != prefix + 'all the boys' && !message.mentions.users.size) {
        return message.reply('please mention a user');
    }

    let users = message.mentions.users.array();

    let mes = 'summoning ';
    let user_ids = '';

    if(message.content === prefix + 'all the boys'){
        for(const boy in the_boys){
            user_ids += '<@' + the_boys[boy] + '> ';
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
        if(counter > 4){
            clearInterval(interval);
        }
    }, 6000);

    return;
});

client.login(token);