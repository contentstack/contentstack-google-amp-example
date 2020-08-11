/**
 * Module dependencies.
 */ 

const express = require('express');

const router = express.Router();
const Contentstack = require('contentstack');
const configVars = require('../config');

// Initialize stack

const Stack = Contentstack.Stack(configVars.apiKey, configVars.accessToken, configVars.env);

// Below middleware router will render the blog list page

router.get('/', (req, res) => {
  Stack.ContentType(configVars.contentTypeUid.blogContentTypeUid).Query()
    .toJSON()
    .find()
    .then((result) => {
      const blogList = result[0].find((blog) => blog.url === '/blogs');
      res.render('pages/blog-list.html', { blogData: blogList });
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = router;
