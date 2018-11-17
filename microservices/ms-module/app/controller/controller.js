const appRoot = require('app-root-path');
const model = require(appRoot + '/app/model/model');

module.exports = {

    get: (req, res) => {
        model.get(function(modules) {
            res.send(modules);
        });
    },

    post: (req, res) => {
        model.post(req.body, function() {
            res.sendStatus(200);
        });
    }

};