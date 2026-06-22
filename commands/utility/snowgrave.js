const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

const data = new SlashCommandBuilder()
	.setName('snowgrave')
	.setDescription('Select a member and use a fatal spell on them.')
	.addUserOption((option) => option.setName('target').setDescription('The member to cast Snowgrave on ').setRequired(true))
    .addStringOption((option) => 
        option
            .setName('time-classification')
            .setDescription('The classification of time (miilliseconds, seconds, etc)')
            .setRequired(true)
            .addChoices(
                {name: 'milliseconds', value: 'milliseconds'},
                {name: 'seconds', value: 'seconds'},
                {name: 'minutes', value: 'minutes'},
                {name: 'hours', value: 'hours'},
            )

        )
    .addIntegerOption((option) => option.setName('time').setDescription('Amount of time').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

module.exports = {
    data: data,
    
    async execute(interaction) {
		await interaction.deferReply();
        
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)){
            return interaction.reply({
                content: "Noelle doesn't listen to you",
                ephemeral: true,
            });
        }

        const targetMember = interaction.options.getMember('target');
        const timeClass = interaction.options.getString('time-classification')
        const time_of_timeout = interaction.options.getInteger('time')

        var time

        if (timeClass === 'seconds'){
            time = time_of_timeout * 1000;
        }

        else if (timeClass === 'minutes'){
            time = time_of_timeout * 60000;
        }

        else if (timeClass === 'hours'){
            time = (time_of_timeout * 60000)*60;
        }

        else{
            time = time_of_timeout;
        }




        //get avatar
        const avatarURL = targetMember.displayAvatarURL({ extension: 'png', size: 512 });

        //create canvas
        const canvas = createCanvas(540, 820);
        const ctx = canvas.getContext('2d');

        //load images
        const avatar = await loadImage(avatarURL);
        const overlay = await loadImage('././images/snowgrave.png'); // your custom PNG
        

        //draw avatar
        ctx.drawImage(avatar, 540/6, 820/4, 256*1.5, 256*1.5);

        ctx.save();

        ctx.globalAlpha = .7;

        //draw ice
        ctx.drawImage(overlay, 0, 0, 540, 820);

        ctx.restore();

        const buffer = canvas.toBuffer('image/png');
        const file = new AttachmentBuilder(buffer, { name: 'result.png' });




		await interaction.editReply({
            content:
                `### Watch what happens when I cast a spell I don't know!\n\n` +
                `## Noelle casts SNOWGRAVE on ${targetMember}!\n\n` +
                `-# ${targetMember} was timed-out for ${time_of_timeout} ${timeClass}`,

            files: [file],
        });
        await targetMember.timeout(time);
        
        
	},
}