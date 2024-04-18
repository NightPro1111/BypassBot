const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping của bot'),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {[]} args 
     */
    options: {
        cooldown: 5000
    },
    run: async (client, interaction, args) => {

        const embed = new EmbedBuilder()
        .setTitle(`\`${client.user.username}'s Ping\``)
        .setDescription(`\`\`\`ini\n[ ${client.ws.ping}ms ]\n\`\`\``)
        .setColor('Random')
        .setFooter({ text: "© Developer: Litterium | Bypasser", iconURL: "https://cdn.discordapp.com/avatars/1011242519218094121/1468475022a514914001e526984bf2bc.webp"})
        .setTimestamp()
        
        await interaction.reply({
            embeds: [embed]
        });
    }
};
