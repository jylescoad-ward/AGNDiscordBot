const Discord = require('discord.js'); // Require the Discord.js library.
const { RichEmbed } = require('discord.js');
const embed = new Discord.RichEmbed();
const client = new Discord.Client();
const info = require('./info.json');
const token = require('./token.json')
const channelID = require('./channelid.json')
const config = require('./config.json')
var fs = require("fs");
var infoVar
function updateJSON(a, b){
	infoVar = {
		serverVersion: a,
		memberCount: b,
	};
	fs.writeFile("./info.json", JSON.stringify(infoVar), (err) => {
		if (err) {
			console.error(err);
			return;
		};
		console.log("Written to info json");
	});
	serverVersion = info.serverVersion
	memberCount = info.memberCount
}
function getMemberCount(){
	client.guilds.forEach((guild) => {
		guild.fetchMembers().then(g => {
			let count = 0;
			g.members.forEach((member) => {
				count++;
			});
			console.log(count);
		});

	});
}


	const botPFP = config.profilepic;

	const botToken = token.botToken
	const APIToken = token.youtubeAPIToken

	const prefix = config.prefix

	const OwnerID = config.ownerid
	
	const reportChannelID = channelID.reportChannelID
	const LogChannelID = channelID.LogChannelID
	const announcementChannelID = channelID.announcementChannelID
	const updateChannelID = channelID.updateChannelID
	var serverVersion = info.serverVersion
		



client.on('error', console.error);

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

	var sender;var senderURL;var kickedUserID;var bannedUserID;
	
  if (command === 'refreshrpc') {
    if (message.author.id === ownerID) {
      message.channel.send('Rich Presence Refreshed!');
      client.user.setActivity();
    }
    else{message.reply('you do not have permissions to use this devcommand,\n so ***a s c e n d*** to the 4th ***d i m e n s i o n***');}
  }
  if (command === 'rpc') {
      var game = args.slice(0).join(" ");


      // only @Seed#0001 and @CheezBiscuit can access this devcommand

      //Checking if the sender is a certian user
      if (message.author.id === OwnerID) {

          //reset devcommand
          if (game === 'reset') {
              client.user.setActivity();
              message.author.send('Rich Presence Has Been Reset!');
          }
          else {
              client.user.setActivity(game);
              message.channel.send('Rich Presence Status Updated To: ' + game);
          }
      }
      else{message.reply('you do not have permissions to use this devcommand,\n so ***a s c e n d*** to the 4th ***d i m e n s i o n***');}
  }
  if (command === 'exec') {
    let code = args.slice(0).join(" ");
    if (message.author.id === OwnerID) {
      let exec = eval(code);
      message.channel.send('**Input:**\n`' + code + '`\n\n**Output**:\n`' + exec + '`');
    }
    else{message.reply('you do not have permissions to use this devcommand,\n so ***a s c e n d*** to the 4th ***d i m e n s i o n***');}
  }
	if (command === 'ping') {
		const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. \nAPI Latency is ${Math.round(client.ping)}ms`);
	}
	if (command === 'ban') {
		let reason = args.slice(1).join(' ');
		let user = message.mentions.users.first();
		let logchannel = message.guild.channels.find('name', 'logs');
		if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(":no_entry_sign: **Error:** You don't have the **Ban Members** permission!");
		if (reason.length < 1) return message.reply('You must supply a reason for the ban.');
		if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);
  
		if (!message.guild.member(user).bannable) return message.reply(`<:redTick:${settings.redTick}> I cannot ban that member`);
		message.guild.member(user).ban();

		bannedUserID = user.id();
		
		let banchannel;
		
		if (message.guild === csgoServerID){
			banchannel = LogChannelID;
		}
		if (message.guild === centralServerID){
			banchannel = LogChannelID;
		}

		client.channels.get(banchannel).send({embed: {
			color: ff0000,
			author: {name:'Banned User'},
			feilds: [{
				name: 'Reason // ' + user + ' Banned',
				feilds: 'Reason:\n ' + reason
			}],
			timestamp: 'Banned at ' + new Date(),
			footer: {
				text: 'Banned by ' + message.author.username,
			}
		}})
		message.channel.send({embed: {
			color: ff0000,
			author: {name:'Banned User'},
			feilds: [{
				name: 'Reason // ' + user + ' Banned',
				feilds: 'Reason:\n ' + reason
			}],
			timestamp: 'Banned at ' + new Date(),
			footer: {
				text: 'Banned by ' + message.author.username,
			}
		}})
		client.channels.get(bannedUserID).send({embed: {
			color: ff0000,
			author: {name:'Banned User'},
			feilds: [{
				name: 'Reason // ' + user + ' Banned',
				feilds: 'Reason:\n ' + reason
			}],
			timestamp: 'Banned at ' + new Date(),
			footer: {
				text: 'Banned by ' + message.author.username,
			}
		}})
	}
	if (command === 'kick') {
		let reason = args.slice(1).join(' ');
		let user = message.mentions.users.first();
		let logchannel = message.guild.channels.find('name', 'logs');
		if (reason.length < 1) return message.reply('You must supply a reason for the kick.');
		if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);
  
		if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
		message.guild.member(user).kick();

		kickedUserID = user.id();
		
		client.channels.get(LogChannelID).send({embed: {
			color: ff0000,
			author: {name:'Kicked User'},
			feilds: [{
				name: 'Reason // ' + user + ' Kicked',
				feilds: 'Reason:\n ' + reason
			}],
			timestamp: 'Kicked at ' + new Date(),
			footer: {
				text: 'Kicked by ' + message.author.username,
			}
		}})
		message.channel.send({embed: {
			color: ff0000,
			author: {name:'Kicked User'},
			feilds: [{
				name: 'Reason // ' + user + ' Kicked',
				feilds: 'Reason:\n ' + reason
			}],
			timestamp: 'Kicked at ' + new Date(),
			footer: {
				text: 'Kicked by ' + message.author.username,
			}
		}})
		client.channels.get(kickedUserID).send({embed: {
			color: ff0000,
			author: {name:'Kicked User'},
			feilds: [{
				name: 'Reason // ' + user + ' Kicked',
				feilds: 'Reason:\n ' + reason
			}],
			timestamp: 'Kicked at ' + new Date(),
			footer: {
				text: 'Kicked by ' + message.author.username,
			}
		}})
	}
	if (command === 'event'){
		let eventdesc = args.slice(0).join(" ");
		if (message.author.id === TmanID || message.author.id === SkyID || message.author.id === OwnerID){
			if (message.author.id === OwnerID){
				sender = 'Seed';
				senderURL = 'https://cdn.discordapp.com/avatars/230485481773596672/a_c9a0fbc4e77868724c8c477b01cfb078.gif';
				
				client.channels.get(eventChannelID).send({embed: {
					color: 3447003,
					author: {name: 'Event Time',icon_url:client.user.avatarURL},
					fields: [{ 
						name: 'Event Details',
						value: eventdesc
					}],
					timestamp: new Date(),
					footer:{
						text: 'Event Started By ' + sender,
						icon_url: client.user.avatarURL
					}
				}});
			}
		}
	}
	if (command === 'announcebox'){
		
		let msgwarg =  args.slice(0).join(' ');
		let msg = args.slice(1).join(" ");
	
		
		if (message.author.id === OwnerID){

			if (message.author.id === OwnerID){
				sender = 'Seed';
				senderURL = 'https://cdn.discordapp.com/avatars/230485481773596672/a_c9a0fbc4e77868724c8c477b01cfb078.gif';

				client.channels.get(announcementChannelID).send({embed: {
					color: 3447003,
					author: {name:'Announcement',icon_url:client.user.avatarURL},
					fields: [{
						name: 'Announcment Details',
						value: msgwarg
					}],
					timestamp: new Date(),
					footer:{
						text: 'Announcement by ' + sender,
						icon_url: senderURL
					}
				}});
			}
		}
	}
	if (command === 'announceboxs'){
		
		let msgwarg = args.slice(0).join(" ");
	
		
		if (message.author.id === OwnerID){
			
			if (message.author.id === OwnerID){
				sender = 'Seed';
				senderURL = 'https://cdn.discordapp.com/avatars/230485481773596672/a_c9a0fbc4e77868724c8c477b01cfb078.gif';
				
				senderURL = botPFP;
			
				client.channels.get(announcementChannelID).send({embed: {
					color: 3447003,
					author: {name:'Announcement',icon_url:client.user.avatarURL},
					fields: [{
						name: 'Announcment Details',
						value: msgwarg
					}],
					timestamp: new Date(),
					footer:{
						text: 'Announcement by MGN Staff'
					}
				}});
			}
		}
	}
	if (command === 'announce'){
		
		let msgwarg = args.slice(0).join(" ");
		let msg = args.slice(1).join(' ');
	
		
		if (message.author.id === TmanID || message.author.id === SkyID || message.author.id === OwnerID){
			
			if (message.author.id === OwnerID){
				sender = 'Seed';
				senderURL = 'https://cdn.discordapp.com/avatars/230485481773596672/a_c9a0fbc4e77868724c8c477b01cfb078.gif';
				
				client.channels.get(announcementChannelID).send(msgwarg);
			}
		}
	}
	if(command === 'report') {
		let desc =  args.slice(0).join(' ');
		let sender = message.member.user.tag
		message.author.send('Thank you for sending a report, A Staff Member may DM you to ask further questions!');
		client.channels.get(ticketChannelID).send({embed: {
			color: 3447003,
			author: {name:'Report from User: ' + sender,},
			fields: [{
				name: 'Report Details',
				value: desc
			}],
			footer:{text:'Report Created At ' + new Date(),}
		}});
		client.channels.get(reportChannelID).send('<@&523092784157294613>');
	}
	if (command === 'updateinfo') {
		if (message.author.id === OwnerID){
			updateJSON((info.serverVersion + 1), client.users.size)
		}
	}
	if (command === 'server-update'){
		let msg = args.slice(0).join(' ')
		if (message.author.id === OwnerID){
			serverVersion = serverVersion + 1
			client.channels.get(LogChannelID).send('New update released. Look in #server-updates')
			client.channels.get(updateChannelID).send({embed: {
				color: 3447003,
				author: {
					name: 'Server Update'
				},
				fields: [{ 
					name: 'Server Update v' + serverVersion,
					value: msg
				}],
				timestamp: new Date()
			}})
			updateJSON((info.serverVersion + 1), client.users.size)
		}
		if (message.author.id !== OwnerID){
			message.reply('You are not the owner of AGN. Please kindly heck off.')
		}
	}
	if (command === 'membercount'){
		updateJSON(info.serverVersion, client.users.size)
		message.reply('We have ' + client.users.size + ' Members!')
	}
	
});

client.on("ready", () => {
	console.log('|-------------------------------------------------------------|');
    console.log(` Bot has started, with ` + client.users.size + ` users, in ` + client.channels.size + ` channels of ` + client.guilds.size + ` guilds.`);
	console.log('|-------------------------------------------------------------|');
});

const music = require("discord.js-musicbot-addon");
music.start(client, {
  youtubeKey: APIToken,
  botPrefix: prefix,
  inlineEmbeds: true,
  logging: false,
  help: {
	enabled: true,
	name: 'mhelp',
	exclude: true
  },
  anyoneCanAdjust: false,
  anyoneCanSkip: false
});

client.login(botToken); // Connect the bot

