const appRoot = require('app-root-path');
const model = require(appRoot + '/app/model/model');

module.exports = {

    get: (req, res) => {
        model.get(req.query, logs => {
            if(logs.error) {
                res.status(400);
            }
            res.send(logs);
        });
    }

};