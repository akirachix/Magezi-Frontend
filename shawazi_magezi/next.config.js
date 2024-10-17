const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});
module.exports = withPWA({
  env:{
    BASE_URL: process.env.BASE_URL,
  }
});