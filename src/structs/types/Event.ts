// Define um padrão para criação de eventos.
import { ClientEvents } from "discord.js";

/* 
Evento em si (com propriedades básicas de um evento de Discord e o que a execução do evento faz por si só).
*/
export type EventType<Key extends keyof ClientEvents> = {
    name: Key,
    once?: boolean,
    run(...args: ClientEvents[Key]): any
}

// Classe que representa o evento, um molde.
export class Event<Key extends keyof ClientEvents> {
    constructor(options: EventType<Key>) {
        Object.assign(this, options);
    }
}
