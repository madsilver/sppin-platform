const express = require("express");
const appRoot = require('app-root-path');
const router = express.Router();
const controller = require(appRoot + '/app/controller/controller');

router.route('/')
    .get(controller.get)
    .post(controller.post)
    .put(controller.put);

router.route('/page').get(controller.getPage);

router.route('/login').post(controller.postLogin);

module.exports = router;