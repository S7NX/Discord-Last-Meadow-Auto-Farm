# Last Meadow Online AutoFarm 🍃

Auto-farm script for Discord activities. Runs continuously, respecting cooldowns.

## ✨ Features
- **Gathering (Adventure)**: Every 150ms (no cooldown)
- **Combat**: Every 180s (waits for cooldown)
- **Crafting**: Every 120s (waits for cooldown)


## 🛠️ How to Use

1. **Open Developer Tools:** Press `Ctrl + Shift + I` in your Discord client. (See **Troubleshooting** if this doesn't work).
2. **Access the Console:** Click on the **Console** tab at the top of the developer window.
3. **Enable Pasting:** If prompted by Discord, type `allow pasting` and hit **Enter**.
4. **Run the Script:** Paste the provided code into the console and press **Enter**.
   > ⚠️ Only run the script when your abilities are on cooldown: <img width="1000" height="103" alt="Cooldown Example" src="https://github.com/user-attachments/assets/fc8a2043-9ebb-412b-9a3b-81c424f54ea2" />
6. **Finalize:**
   * Close the Developer Tools and wait.

## 💬 Support

Need help or found an issue?  
Join the support server and ping me:

👉 https://discord.gg/WHteqMY2kn

## 🛠️ Troubleshooting (Console won't open?)

If `Ctrl + Shift + I` does not work, do one of the following:
* **Install Vencord:** Use [Vencord](https://vencord.dev/) to enable developer tools.
* **Use Discord PTB:** Download the [Public Test Build (PTB)](https://discord.com/api/downloads/distributions/app/installers/latest?channel=ptb&platform=win&arch=x64).
* **Manual Override:** 1. Press `Win + R` and type `%appdata%/discord/settings.json`.
    2. Add the following line to the file:
    `"DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING": true`

## ⚠️ Disclaimer
Use this tool at your own risk. Using automated scripts on Discord can technically be against their Terms of Service. 

## 📜 License
[MIT](LICENSE)
