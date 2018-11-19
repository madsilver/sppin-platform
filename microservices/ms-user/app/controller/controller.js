const appRoot = require('app-root-path');
const model = require(appRoot + '/app/model/model');
const md5 = require('md5');

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
        model.get(users => response(res, users), req.query);
    },

    post: (req, res) => {
        let dt = new Date();
        req.body.permissions = JSON.stringify([{ module:'home', read:1, write:1 }]);
        req.body.created_at = dt;
        req.body.updated_at = dt;
        req.body.password = md5('sppin123');
        model.post(req.body, cb => {
            res.status(cb.errno ? 400: 200);
            response(res, {}, 'Registro inserido com sucesso');
        });
    },

    put: (req, res) => {
        req.body.created_at = new Date(req.body.created_at);
        req.body.updated_at = new Date();
        model.put(req.body, cb => {
            res.status(cb.errno ? 400: 200);
            response(res, {}, 'Registro alterado com sucesso');
        });
    },

    postLogin: (req, res) => {
        if(req.body.username == "" || req.body.password == "") {
            res.sendStatus(400);
            return;
        }

        model.getByLogin(req.body, user => {
            if(user.errno) {
                res.status(500);
            }

            res.send(user);
        });
    }

};