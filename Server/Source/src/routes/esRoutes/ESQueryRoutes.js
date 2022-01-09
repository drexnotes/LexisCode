const router = require('express').Router();
const ESQueryController = require('./ESQueryController');
const RouteConstant = require('../../constant/Routes');
const Middleware = require('../../cors/middleware').checkToken;
const Validation = require('../../validation/ESQueryValidation');

module.exports = (app) => {
  router.route('/search')
    .post(
     // Validation.searchES(),
      ESQueryController.searchES
    );

  app.use(
    RouteConstant.ES,
    // NOTE: kellyj2 middleware will be added to validate proper security headers
    //   Middleware,
    router
  );
};