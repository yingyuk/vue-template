const home = require('./controller/home');

module.exports = app => {
  app.use(home);
};
