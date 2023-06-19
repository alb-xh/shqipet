import shortUniqId from 'short-unique-id';

export const randomId = (length = 10) =>  new shortUniqId({ length }).randomUUID();

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
