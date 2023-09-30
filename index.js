// const express = require("express");
// const app = express();

require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const app = express();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

//=============
app.listen(3000, () => {
  console.log("project sedang berjalan!");
});

app.get("/", (req, res) => {
  res.send("hello world!");
});
//=============

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const prefix = "!";

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  console.log("message", message);
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    message.reply(`Pong`);
  }
});

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token
