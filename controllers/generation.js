import { getMemberList } from '../util/memberList.js';
import { getPreviousYearBuffer, recordHistory } from '../controllers/recordKeeping.js';
import { parse } from '../util/parse.js';
/**
 * 
 * @param {number} max 
 * @returns 
 */
function roll(max) {
    return Math.floor(Math.random() * max);
}

export async function generate(listName) {
    console.log('Generating Secret Santa');
    const previousBuffer = await getPreviousYearBuffer(listName);
    const previousYearResults = parse(previousBuffer);
    const currentSecretSantas = {};
    const members = getMemberList(listName);
    const availableNames = members.slice();
    members.forEach(name => {
        let randomIndex = roll(availableNames.length);
        while (name === availableNames[randomIndex] || previousYearResults[name] === availableNames[randomIndex]) {
            randomIndex = roll(availableNames.length);
        }
        currentSecretSantas[name] = availableNames.splice(randomIndex, 1)[0];
    });
    await recordHistory(previousBuffer, listName);
    return currentSecretSantas;
}