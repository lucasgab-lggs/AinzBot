import { Client, Partials, IntentsBitField, BitFieldResolvable, GatewayIntentsString, Collection } from "discord.js";
import dotenv from "dotenv";
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
    // Inicia o bot com seu respectivo token para acesso a API do Discord.
    public start() {
        this.login(process.env.BOT_TOKEN);
    }
}
