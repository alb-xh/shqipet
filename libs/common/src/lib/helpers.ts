import shortUniqId from 'short-unique-id';

export const randomId = (length = 10) =>  new shortUniqId({ length }).randomUUID();

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const isProduction = () => [ process.env['NODE' + '_ENV'], process.env['NODE_ENV'] ].includes('production');

export const getEnvFile = () => isProduction() ? '.prod.env' : '.dev.env';
