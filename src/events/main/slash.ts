import { CommandInteractionOptionResolver } from 'discord.js';
import { client } from '../..';
import { Event } from '../../structs/types/Event';

// Evento que responde aos comandos de barra.
export default new Event({
    name: 'interactionCreate',
    run(interaction) {
        // Verifica se a interação é um comando.
        if (!interaction.isCommand()) return;

        // Obtém o comando através de seu nome.
        const command = client.commands.get(interaction.commandName);

        // Verifica se o comando existe.
        if (!command) return;

        // Obtém as opções do comando.
        const options = interaction.options as CommandInteractionOptionResolver;

        // Executa o comando.
        command.run({client, interaction, options});
    }
})