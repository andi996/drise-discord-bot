import dotenv from "dotenv";
import { Client, GatewayIntentBits, SlashCommandBuilder } from "discord.js";
import express from "express";

// Load environment variables from .env file
dotenv.config();

const app = express();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const port = process.env.PORT;
//=============
app.listen(port, () => {
  console.log(`project sedang berjalan! di port ${port}`);
});

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.get("/bot", (req, res) => {
  res.send("ini adalah bot percobaan, created by Andri Setiawan!");
});
//=============

client.on("ready", (x) => {
  console.log(`bot ${x.user.tag} is ready!`);

  const ping = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("This is a ping command");

  const hello = new SlashCommandBuilder()
    .setName("hello")
    .setDescription("This is a hello command");

  client.application.commands.create(ping);
  client.application.commands.create(hello);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "ping") {
    interaction.reply("pong!");
  }

  if (interaction.commandName === "hello") {
    interaction.reply(`hello! i'am ${client.user.tag}`);
  }
});

const prefix = "!";

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    message.reply(`Pong`);
  }

  if (command === "haha") {
    message.reply(`hehe`);
  }
});

//===================== TRYING VOICE CHANNEL DETECTION =================
// Add the following code to your existing bot code

const voiceChannelMessages = {
  "1157590949229248532": "Silahkan ketik '/play' untuk memainkan musik.",
  "1152463899392749568":
    "Silahkan ketik 'm!play `link`' untuk memainkan musik.",
};

client.on("voiceStateUpdate", (oldState, newState) => {
  // Check if the user joined a voice channel
  if (!oldState.channel && newState.channel) {
    const voiceChannel = newState.channel;

    // Check if the user joined the specific voice channel you're interested in
    if (voiceChannel && voiceChannel.id in voiceChannelMessages) {
      const message = voiceChannelMessages[voiceChannel.id];
      const textChannel = newState.guild.channels.cache.find(
        (channel) => channel.name === voiceChannel.name
      );

      // Check if the voice channel became non-empty
      if (voiceChannel.members.size === 1) {
        // Check if the text channel exists
        if (textChannel) {
          textChannel.send(message);
        }
      }
    }
  }
});

//======================================================================

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token
