const { composePlugins, withNx } = require("@nrwl/webpack");
const { withReact } = require("@nrwl/react");
const Dotenv = require('dotenv-webpack');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  const path = process.env['NODE_ENV'] === 'production' ? '.prod.env' : '.dev.env';
  config.plugins.push(new Dotenv({ path, ignoreStub: true }));

  return config;
});
