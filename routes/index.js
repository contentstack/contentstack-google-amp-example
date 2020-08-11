// routes

module.exports = (app) => {
  app.use('/', require('../middleware'));
  app.use('/', require('./home'));
  app.use('/blogs', require('./blog-list'));
  app.use('/blogs/:blog', require('./blog-page'));
};
