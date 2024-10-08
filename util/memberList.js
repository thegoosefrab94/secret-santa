import { members } from '../members.js';

export function getMemberList(listName) {
    return members[listName]
        .filter(member => !member.exclude)
        .map(member => member.name);
}

export function getPhoneNumberList(listName) {
    return members[listName].map(({name, phoneNumber}) => ({[name]: phoneNumber}))
    .reduce((curr, prev) => {
        return {
            ...curr,
            ...prev
        };
    }, {});
}