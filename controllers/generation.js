import { getMemberList } from '../util/memberList.js';
import { getPreviousYearBuffer, recordHistory } from '../controllers/recordKeeping.js';
import { parse } from '../util/parse.js';

const members = getMemberList();
const availableNames = members.slice();

function roll() {
    return Math.floor(Math.random() * availableNames.length);
}

export async function generate() {
    console.log('Generating Secret Santa');
    const previousBuffer = await getPreviousYearBuffer();
    const previousYearResults = parse(previousBuffer);
    const currentSecretSantas = {};
    members.forEach(name => {
        let randomIndex = roll();
        while (name === availableNames[randomIndex] || previousYearResults[name] === availableNames[randomIndex]) {
            randomIndex = roll();
        }
        currentSecretSantas[name] = availableNames.splice(randomIndex, 1)[0];
    });
    await recordHistory(previousBuffer);
    return currentSecretSantas;
}