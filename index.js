const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  PermissionFlagsBits
} = require("discord.js");

// ===============================
// CONFIG
// ===============================

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = "1544671841732403270";

// ===============================
// COMMANDS
// ===============================

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check if Gamer Daksh Bot is online."),

  new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show all Gamer Daksh Bot commands."),

  new SlashCommandBuilder()
    .setName("content")
    .setDescription("Show Gamer Daksh content information."),

  new SlashCommandBuilder()
    .setName("announce")
    .setDescription("Send a content announcement.")
    .addStringOption(option =>
      option
        .setName("message")
        .setDescription("Announcement message")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  new SlashCommandBuilder()
    .setName("youtube")
    .setDescription("Show the Gamer Daksh YouTube channel.")
].map(command => command.toJSON());

// ===============================
// REGISTER COMMANDS
// ===============================

const rest = new REST({ version: "10" }).setToken(TOKEN);

async function registerCommands() {
  try {
    console.log("Registering slash commands...");

    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );

    console.log("✅ Slash commands registered!");
  } catch (error) {
    console.error("❌ Command registration failed:", error);
  }
}

// ===============================
// DISCORD CLIENT
// ===============================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

// ===============================
// BOT READY
// ===============================

client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
  console.log("🎮 Gamer Daksh Bot is online!");
});

// ===============================
// COMMAND HANDLER
// ===============================

client.on("interactionCreate", async interaction => {

  if (!interaction.isChatInputCommand()) return;

  const command = interaction.commandName;

  // /ping
  if (command === "ping") {
    await interaction.reply("🏓 Pong! Gamer Daksh Bot is online!");
  }

  // /help
  else if (command === "help") {

    await interaction.reply({
      content:
`🤖 **Gamer Daksh Bot**

🎮 **Content Commands**
\`/content\` — Content information
\`/youtube\` — Gamer Daksh YouTube
\`/announce\` — Send an announcement

🛠️ **Utility**
\`/ping\` — Check bot status
\`/help\` — Show commands

🔥 More features coming soon!`,
      ephemeral: true
    });

  }

  // /content
  else if (command === "content") {

    await interaction.reply(
`🎬 **Gamer Daksh Content**

📺 YouTube: https://www.youtube.com/channel/UCVFSsBToTvr3FME7xY-zb7w

🎮 Gaming
⚔️ PvP
🍎 Roblox
🔥 More videos coming soon!

Don't forget to 👍 Like and 🔔 Subscribe!`
    );

  }

  // /youtube
  else if (command === "youtube") {

    await interaction.reply(
`📺 **Gamer Daksh YouTube**

🎬 Check out the latest videos!

https://www.youtube.com/channel/UCVFSsBToTvr3FME7xY-zb7w

👍 Like
💬 Comment
🔔 Subscribe`
    );

  }

  // /announce
  else if (command === "announce") {

    const message =
      interaction.options.getString("message");

    await interaction.reply({
      content:
`📢 **NEW CONTENT ANNOUNCEMENT**

${message}

🎮 **Gamer Daksh**
🔔 Stay tuned for more!`,
      allowedMentions: { parse: [] }
    });

  }

});

// ===============================
// START BOT
// ===============================

async function start() {
  await registerCommands();
  await client.login(TOKEN);
}

start();
