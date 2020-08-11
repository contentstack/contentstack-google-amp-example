/**
 * Module dependencies.
 */

const async = require('async');
const Contentstack = require('contentstack');
const configVars = require('../config');

// Initialize stack

const Stack = Contentstack.Stack(configVars.apiKey, configVars.accessToken, configVars.env);

// Below method will fetch header & footer data

module.exports = (req, res, next) => {
  async.parallel(
    [
      // Here in this function we get the data for header
      (callback) => {
        const Query = Stack.ContentType(configVars.contentTypeUid.headerContentTypeUid).Query();
        Query.toJSON()
          .find()
          .then((result) => {
            callback(null, result[0][0]);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      // Here in this function we get the data for footer
      (callback) => {
        const Query = Stack.ContentType(configVars.contentTypeUid.footerContentTypeUid).Query();
        Query.toJSON()
          .find()
          .then((result) => {
            callback(null, result[0][0]);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    ],
    (error, success) => {
      // Here the variable header & footer is used into the template directly for your header and footer
      if (error) return next(error);
      res.locals.header = success[0];
      res.locals.footer = success[1];
      next();
    },
  );
};
