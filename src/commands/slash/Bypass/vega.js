const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('vega')
        .setDescription('Bypass Vega')
        .addStringOption(option =>
            option.setName('hwid')
                .setDescription('Nhập link vào đây')
                .setRequired(true)
            ),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const link = interaction.options.getString('hwid');

        try {
            // // Send a waiting message
            const waitEmbed = new EmbedBuilder()
                .setTitle("Loading your request <a:loading:1163773982399549462>")
                .setDescription("<a:dev_load:1226190319595421910> Proceed with the bypass process <a:dev_load:1226190319595421910>")
                .setColor(0xFFFF00);
            await interaction.reply({ embeds: [waitEmbed] });
    
            // Make the GET request to the API
            const apiKey = "Bearer Byte_Boulevard_f848663f-811d-4ff9-9953-e4aac9a936a5";
            const response = await fetch(`http://45.88.188.104:6269/bypass/?url=${link}`, {
        headers: {
            'Authorization': apiKey
        }
    });
            const data = await response.json(); // Parse the JSON response
    
            // Check if the 'key' in the response indicates a successful bypass
            if (data.result) {
                // Handle the success case
                const successEmbed = new EmbedBuilder()
                    .setTitle("Success <a:yes:1157935616764424252> !!")
                    .setDescription(`<a:tin_laplanh:1164087803232133120> Your Bypass Request has been Completed!
                    And check the result <a:tin_laplanh:1164087803232133120> !!!`) // Include the actual key from the response
                    .setColor(0x00FF00)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1226146343735525397/1230176926941970452/V_logo_white.png') // Yall can change this.
                    .addFields(
                        { name: '**Your key : **', value: `\`\`\`${data.result}\`\`\`` },
                    )
                    .setTimestamp()
                    .setFooter({ text: 'Developer : Litterium', iconURL: 'https://cdn.discordapp.com/avatars/1011242519218094121/1468475022a514914001e526984bf2bc.webp' }); 
                    // Yall can change it if ya want.
                await interaction.editReply({ embeds: [successEmbed] });
                await interaction.editReply({ content : "https://discord.gg/menoobgaming" , ephemeral : true});
                
            } else {
                // Handle the error case
                const errorEmbed = new EmbedBuilder()
                    .setTitle("Failed <a:no:1157935620488970321> !")
                    .setDescription("Đã xảy ra lỗi trong quá trình Bypass")
                    .setColor(0xFF0000);
                await interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
                
            }
        } catch (error) {
            if (error.code === 'ERR_INVALID_URL') {
                // If the URL is invalid, reply with a custom message
                await interaction.deferReply(({ content : "<a:no:1157935620488970321> Có gì đó sai sai. Hãy cung cấp đúng link"}));
            } else {
                // Handle other potential errors
                await interaction.editReply(`<a:no:1157935620488970321> Đã xảy ra lỗi: ${error.message}`);
            }
        }
        }
    }
