// https://stackoverflow.com/questions/49274713/get-mode-in-webpack-config-webpack-4
const isProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production';

module.exports = {
  baseUrl: (isProduction) ? 'https://aleksandrpnshkn.github.io/' : '/',
};
