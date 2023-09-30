import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import express from "express";

// Load environment variables from .env file
dotenv.config();

const app = express();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

//=============
app.listen(3000, () => {
  console.log("project sedang berjalan!");
});

app.get("/", (req, res) => {
  res.send("hello world!");
});
//=============

client.on("ready", (x) => {
  console.log(`bot ${x.user.tag} is ready!`);
});

const prefix = "!";

// client.on("messageCreate", (message) => {
//   if (message.author.bot) return;
//   if (!message.content.startsWith(prefix)) return;
//   console.log("message", message);
//   const commandBody = message.content.slice(prefix.length);
//   const args = commandBody.split(" ");
//   const command = args.shift().toLowerCase();

//   if (command === "ping") {
//     message.reply(`Pong`);
//   }
// });

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token
