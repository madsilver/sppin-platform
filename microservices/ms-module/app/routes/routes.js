const express = require("express");
const appRoot = require('app-root-path');
const router = express.Router();
const controller = require(appRoot + '/app/controller/controller');

router.route('/')
    .get(controller.get);

module.exports = router;