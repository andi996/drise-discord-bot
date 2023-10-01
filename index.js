import dotenv from "dotenv";
import { Client, GatewayIntentBits, SlashCommandBuilder } from "discord.js";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const BOT_PREFIX = "!";

client.on("ready", (x) => {
  console.log(`Our ${x.user.tag} is ready to use!`);

  const ping = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("This is a ping command");

  client.application.commands.create(ping);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "ping") {
    interaction.reply("pong!");
  }
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(BOT_PREFIX)) return;

  const commandBody = message.content.slice(BOT_PREFIX.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    message.reply(`Pong`);
  }

  if (command === "haha") {
    message.reply(`hehe`);
  }

  if (command === "name") {
    message.reply(`My name is ${client.user.tag}`);
  }

  if (command === "author") {
    message.reply(`My author is **Andri Setiawan**`);
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


export default client; // Assuming 'client' is your Discord bot client
