
async function getDeltaruneCountdown() {
  try {
 
    const date = new Date('2026-06-24T23:00:00').getTime();
    console.log(date);

    // Calculate the difference in milliseconds
    const now = new Date().getTime();
    console.log(now);
    const timeDifference = date - now;

    // Time calculations for days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);


    if (timeDifference <= 0) {
      console.log("# HOLY SHIT DELTARUNE RIGHT FUCKING NOW!!!");
      return "HOLY SHIT DELTARUNE RIGHT FUCKING NOW!!!";
    }
    

    console.log(`Time Remaining: ${days}d ${hours}h ${minutes}m ${seconds}s`);

    return (`# DELTARUNE IN: ${days} days, ${hours} hours and ${minutes} minutes !!!!`);

  } catch (error) {
    console.error("Error fetching the countdown:", error.message);
  }
}


const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('howlong').setDescription('Prints how long until chapter 5!'),
	async execute(interaction) {
        const date = await getDeltaruneCountdown()
		await interaction.reply(date);
	},
};
