/**
 * Module dependencies.
 */

const async = require('async');
const configVars = require('../config');
const utils = require('../utils');

module.exports = (req, res, next) => {
  async.parallel(
    [
      // Here in this function we get the data for header
      (callback) => {
        utils
          .getData(
            `${configVars.baseUrlContentStack}/content_types/${configVars.headerSection.headerContentTypeId}/entries?environment=${configVars.env}`,
          )
          .then((data) => {
            callback(null, data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      // Here in this function we get the data for footer

      (callback) => {
        utils
          .getData(
            `${configVars.baseUrlContentStack}/content_types/${configVars.footerSection.footerContentTypeId}/entries?environment=${configVars.env}`,
          )
          .then((data) => {
            callback(null, data.data);
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
