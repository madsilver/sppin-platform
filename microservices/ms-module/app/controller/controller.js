const appRoot = require('app-root-path');
const model = require(appRoot + '/app/model/model');

response = (res, data, msg) => {
    const response = {
        success: !data.error,
        data: data,
        message: msg || ''
    };

    res.send(response);
}

module.exports = {

    get: (req, res) => {
        model.get(modules => response(res, modules), req.query);
    },

    post: (req, res) => {
        model.post(req.body, cb => {
            res.status(cb.errno ? 400: 200);
            response(res, {}, 'Registro inserido com sucesso');
        });
    }

};