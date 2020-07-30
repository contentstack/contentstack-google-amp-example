/**
 * Module dependencies.
 */

const express = require('express');

const router = express.Router();
const configVars = require('../config');
const utils = require('../utils');

/**
 * The below router middleware function gets the data from contentstack using a CDA call and stores it in a variable called "blog"
 * This variable "blog" is later used to provide data to the blog-list template
 * The 'blogPageHeading' key will fetch the heading for blog-list page and render the heading for heading respectivily.
 */

router.get('/', (req, res) => {
  utils
    .getData(
      `${configVars.baseUrlContentStack}/content_types/${configVars.expressBlogSection.blogContentTypeId}/entries?environment=${configVars.env}`,
    )
    .then((response) => {
      utils
        .getData(
          `${configVars.baseUrlContentStack}/content_types/${configVars.expressBlogSection.blogPageHeadingId}/entries?environment=${configVars.env}`,
        )
        .then((data) => {
          res.render('pages/blogs.html', {
            blog: response.data,
            blogPageHeading: data.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * The below router middleware function gets the data from contentstack using a CDA call and stores it in a variable called "content"
 * This variable "content" is later used to provide data to the blog-page template
 * Note : It will fetch only the specific blog using "find" method by matching the URL and then pass the data
 */

router.get('/:url', (req, res) => {
  utils
    .getData(
      `${configVars.baseUrlContentStack}/content_types/${configVars.expressBlogSection.blogContentTypeId}/entries?environment=${configVars.env}`,
    )
    .then((data) => {
      const dataContent = data.data.entries.find(
        (blog) => blog.url === `/${req.params.url}`,
      );
      res.render('pages/blogpage.html', { content: dataContent });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
