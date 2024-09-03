import { ApplicationCommandType } from "discord.js";
import { Command } from "../../structs/types/Command";

export default new Command({
    name: "ping",
    description: "Obtém a latência da API",
    type: ApplicationCommandType.ChatInput,
    run({interaction}) {
        const apiLatency = interaction.client.ws.ping;
        interaction.reply({ephemeral: true, content: `🏓  Pong! \n\n📡 Latência da API: ${apiLatency}ms`});
    },
});