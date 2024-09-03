// Define um padrão para criação de comandos
import { ApplicationCommandData, ButtonInteraction, Collection, CommandInteraction, CommandInteractionOptionResolver, ModalSubmitInteraction, StringSelectMenuInteraction } from 'discord.js';
import { ExtendedClient } from '../ExtendedClient';

interface CommandProps {
    client: ExtendedClient,
    interaction: CommandInteraction,
    options: CommandInteractionOptionResolver
}

// São interações (como botões e formulários).
export type componentsButton = Collection<string, (interaction: ButtonInteraction) => any>
export type componentsSelect = Collection<string, (interaction: StringSelectMenuInteraction) => any>
export type componentsModal = Collection<string, (interaction: ModalSubmitInteraction) => any>

// Define propriedades opcionais para os comandos.
interface CommandComponents {
    buttons?: componentsButton,
    selects?: componentsSelect,
    modals?: componentsModal
}

/*
Comando em si (com propriedades básicas de um comando de Discord, possíveis componentes para interação
e o que a execução do comando faz por si só através de uma função).
*/
export type CommandType = ApplicationCommandData & CommandComponents & {
    run(props: CommandProps): any
}

// Classe que representa o comando, um molde.
export class Command {
    constructor(options: CommandType) {
        // Impede que o comando seja executado na DM do bot e seja possível apenas no servidor.
        options.dmPermission = false;
        Object.assign(this, options);
    }
}