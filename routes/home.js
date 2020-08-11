/**
 * Module dependencies.
 */

const express = require('express');

const router = express.Router();
const Contentstack = require('contentstack');
const configVars = require('../config');

// Initialize stack

const Stack = Contentstack.Stack(configVars.apiKey, configVars.accessToken, configVars.env);

// Below middleware router method will fetch & render home page

router.get('/', (req, res) => {
  const Query = Stack.ContentType(configVars.contentTypeUid.homeContentTypeUid).Query();
  Query
    .toJSON()
    .find()
    .then((result) => {
      res.render('pages/home.html', { homeData: result[0][0] });
    }).catch((err) => {
      console.log(err);
    });
});

module.exports = router;
