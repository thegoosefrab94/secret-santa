import * as path from 'path';

export const currentYearPath = (listName) => path.join(process.cwd(), 'files', listName, 'currentYear.txt');
export const historyPath = (listName) => path.join(process.cwd(), 'files', listName, 'history.txt');
