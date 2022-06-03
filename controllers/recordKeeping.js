import { currentYearPath, historyPath } from '../constants/filePaths.js';
import { getLastYear } from '../util/dates.js';
import { appendFile, writeFile, readFile, unlink } from 'fs/promises';

export async function recordHistory(buffer) {
    if (!buffer) return;
    try {
        console.log('Recording history of previous year');
        if (!global.asTest) {
            await appendFile(historyPath, `${getLastYear()}\n${buffer}\n\n`, 'utf-8');
        }
    } catch (error) {
        console.log(`Failed to record history for ${getLastYear()}. Error: ${error}`);
    }
}

export async function recordCurrentYear(results) {
    try {
        console.log('Recording current year results');
        let list = Object.entries(results).map(([name, victim]) => `${name}-${victim}`).join('\n');
        if (!global.asTest) {
            await writeFile(currentYearPath, list, 'utf-8');
        } else {
            console.log('Generated:', list);
            console.log('Ran as test, nothing recorded.');
        }
    } catch (error) {
        console.log('Current Year results: ' + results);
        console.log(`Failed to record current year results. Error: ${error}`);
    }
}

export async function getPreviousYearBuffer() {
    try {
        console.log('Checking previous year record');
        return await readFile(currentYearPath, 'utf-8');
    } catch (error) {
        console.log(`Could not find previous year record. Error: ${error}`);
        return null;
    }
}

export async function removeCurrentYearFile() {
    try {
        unlink(currentYearPath);
    } catch (error) {
        throw error;
    }
}
