const appRoot = require('app-root-path');
const model = require(appRoot + '/app/model/model');
const md5 = require('md5');

module.exports = {

    get: (req, res) => {
        model.get(users => res.send(users));
    },

    getPage: (req, res) => {
        model.getAll(req.query, users => res.send(users));
    },

    post: (req, res) => {
        let dt = new Date();
        req.body.permissions = JSON.stringify([{ module:'home', read:1, write:1 }]);
        req.body.created_at = dt;
        req.body.updated_at = dt;
        req.body.password = md5('sppin123');
        model.post(req.body, () => {
            res.sendStatus(200);
        });
    },

    put: (req, res) => {
        req.body.created_at = new Date(req.body.created_at);
        req.body.updated_at = new Date();
        model.put(req.body, cb => {
            res.sendStatus(cb.errno ? 400: 200);
        });
    },

    postLogin: (req, res) => {
        if(req.body.username == "" || req.body.password == "") {
            res.sendStatus(400);
            return;
        }

        model.getByLogin(req.body, user => {
            if(user.errno) {
                res.sendStatus(500);
                return;
            }

            res.send(user);
        });
    }

};