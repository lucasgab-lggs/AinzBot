import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, TextChannel } from "discord.js";
import { Command } from "../../structs/types/Command";

export default new Command({
    name: 'mensagem',
    description: 'Envia uma mensagem para algum chat',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'chat',
            description: 'Selecione o chat para enviar a mensagem',
            type: ApplicationCommandOptionType.Channel,
            required: true,
            channelTypes: [ChannelType.AnnouncementThread, ChannelType.GuildText]
        },
        {
            name: 'texto',
            description: 'Digite o texto da mensagem',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async run({interaction, options}) {
        if (!interaction.isChatInputCommand()) return;

        await interaction.deferReply({ephemeral: true});

        const channel = options.getChannel('chat', true);
        const text = options.getString('texto', true);

        if (channel instanceof TextChannel) {
            const msg = await channel.send(text);

            await interaction.editReply(`Mensagem enviada com sucesso! (${msg.url})`);
        }
    }
})