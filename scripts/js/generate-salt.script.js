const argv = require('minimist')(process.argv.slice(2));
const shortUniqId = require('short-unique-id');

const length = argv.l || argv.length || 10;
const salt = new shortUniqId({ length }).randomUUID();

console.log(`Salt: ${salt}`);
