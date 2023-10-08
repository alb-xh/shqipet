const argv = require('minimist')(process.argv.slice(2));
const { genSaltSync } = require('bcrypt');

const rounds = argv.r || argv.rounds || 10;
const salt = genSaltSync(rounds);

console.log(`Salt: ${salt}`);
