import { members } from '../members.js';

export function getMemberList() {
    return members
        .filter(member => !member.exclude)
        .map(member => member.name);
}

export function getPhoneNumberList() {
    return members.map(member => {
        const obj = {};
        obj[member.name] = member.phoneNumber;
        return obj;
    }).reduce((curr, prev) => {
        return {
            ...curr,
            ...prev
        };
    }, {});
}