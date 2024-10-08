import { program } from 'commander';
import { generate } from './controllers/generation.js';
import { recordCurrentYear } from './controllers/recordKeeping.js';
import { checkQuota, notifyParticipents } from './controllers/notifications.js';

program
    .option('-s, --skip-text', 'Skips sending texts')
    // Just a command to test the application
    .option('-t, --test', 'Run the script in test mode');

program.parse();

async function main(listName) {
    const options = program.opts();
    global.asTest = !!options.test; // Would never use something like this in a real app
    const results = await generate(listName);
    if (!options.skipText) {
        const hasRemainingTexts = await checkQuota(listName);
        if (hasRemainingTexts) {
            await notifyParticipents(results, listName);
        } else {
            console.log('Did not send text results as you have reached the text quota');
        }
    } else {
        console.log('Skipping notifications');
    }
    await recordCurrentYear(results, listName);
    console.log('All done!')
}

main(process.argv[2]).catch(console.error);