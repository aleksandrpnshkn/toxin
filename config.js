const isProduction = process.env.NODE_ENV === 'prod';

module.exports = {
  baseUrl: (isProduction) ? '/toxin/' : '/',
};
