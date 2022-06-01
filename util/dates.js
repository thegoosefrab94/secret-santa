import {format, subYears} from 'date-fns';

export function getCurrentYear() {
    return format(new Date(), 'yyyy');
}

export function getLastYear() {
    return format(subYears(new Date(), 1), 'yyyy');
}