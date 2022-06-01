import { program } from 'commander';
import { generate } from './controllers/generation.js';
import { recordCurrentYear } from './controllers/recordKeeping.js';
import { checkQuota, notifyParticipents } from './controllers/notifications.js';

program
    .option('-s, --skip-text', 'Skips sending texts');

program.parse();

async function main() {
    const options = program.opts();
    const results = await generate();
    if (!options.skipText) {
        const metQuota = await checkQuota();
        if (!metQuota) {
            await notifyParticipents(results);
        } else {
            console.log('Did not send text results as you have reached the text quota');
        }
    } else {
        console.log('Skipping notifications');
    }
    await recordCurrentYear(results);
    console.log('All done!')
}

main().catch(console.error);