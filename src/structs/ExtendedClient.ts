import { Client, Partials, IntentsBitField, BitFieldResolvable, GatewayIntentsString, Collection, ApplicationCommandDataResolvable } from "discord.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { CommandType, componentsButton, componentsModal, componentsSelect } from "./types/Command";
dotenv.config();

// O Client serve para criar uma conexão com a API do Discord. 
export class ExtendedClient extends Client {
    // Define as coleções de comandos, botões, selects e modais.
    public commands: Collection<string, CommandType> = new Collection();
    public buttons: componentsButton = new Collection();
    public selects: componentsSelect = new Collection();
    public modals: componentsModal = new Collection();
    constructor() {
        super({
            /*
            Intents definem quais as interações do Discord que o bot pode receber.
            Esse trecho permite que o bot receba todas as interações possíveis
            */
            intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<GatewayIntentsString, number>,
            partials: [
                Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent, 
                Partials.Message, Partials.Reaction, Partials.ThreadMember, Partials.User
            ]
        });    
    }
    // Inicia o bot registrando seus módulos e logando através do token.
    public start() {
        this.registerModules();
        this.login(process.env.BOT_TOKEN);
    }
    // Define os slash commands.
    private registerCommands(commands: Array<ApplicationCommandDataResolvable>) {
        this.application?.commands.set(commands)
        .then(() => {
            console.log("✅ Slash (/) Commands defined".green);
        })
        .catch((error) => {
            console.log(`❌ Error defining Slash (/) Commands: \n${error}`.red);
        });

    }
    // Define os comandos (módulos) do bot.
    private registerModules() {
        // Define um conjunto de slash commands
        const slashCommands: Array<ApplicationCommandDataResolvable> = new Array();

        // Obtem a pasta de comandos.
        const commandsPath = path.join(__dirname, "..", "commands");
        // Determina quais arquivos devem ser lidos na pasta commands.
        const fileCondition = (fileName: string) => fileName.endsWith(".ts") || fileName.endsWith(".js");

        // Lê os arquivos da pasta commands.
        fs.readdirSync(commandsPath).forEach(local => {
            fs.readdirSync(commandsPath + `/${local}/`).filter(fileCondition).forEach(async fileName => {
                // Importa o comando.
                const command: CommandType = (await import(`../commands/${local}/${fileName}`))?.default;
                // Extrai as propriedades do comando.
                const { name, buttons, selects, modals } = command;

                if (name) {
                    this.commands.set(name, command);
                    slashCommands.push(command);

                    // Percorre todos os botões, selects e modais e adiciona às respectivas coleções.
                    if (buttons) buttons.forEach((run, key) => this.buttons.set(key, run));
                    if (selects) selects.forEach((run, key) => this.selects.set(key, run));
                    if (modals) modals.forEach((run, key) => this.modals.set(key, run));
                }
            });
        });

        // Define os slash commands quando o bot estiver pronto.
        this.on("ready", () => this.registerCommands(slashCommands));
    }
}
