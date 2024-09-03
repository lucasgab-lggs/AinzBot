import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, Collection } from 'discord.js';
import { Command } from '../../structs/types/Command';

export default new Command({
    name: 'ping',
    description: 'Obtém a latência da API',
    type: ApplicationCommandType.ChatInput,
    run({interaction}) {
        // Cria uma linha de ação com um botão.
        const row = new ActionRowBuilder<ButtonBuilder>({components: [
            new ButtonBuilder({custom_id: 'ping-button', label: 'Ping', style: ButtonStyle.Success})
        ]})

        const apiLatency = interaction.client.ws.ping;

        // Responde ao usuário com a latência da API e adiciona a linha de ação com um botão.
        interaction.reply({ephemeral: true, 
            content: `🏓  Pong! \n\n📡 Latência da API: ${apiLatency}ms`, 
            components: [row]
        });
    },
    /*
    Cria uma função para o componente de botão. 
    O mesmo código abaixo pode ser adaptado para os outros componentes..
    */
    buttons: new Collection([
        // Cada botão do comando, um array de botões.
        ['ping-button', async (interaction) => {
            // Atualiza a resposta original com um novo conteúdo e deixa sem componentes.
            interaction.update({content: '🏓  Pong!', components: []});
        }]
    ])
});