const jwt = require('jsonwebtoken');
require('dotenv-safe').load();

module.exports = {

    verifyJWT: (req, res, next) => {
        if(req.method == "OPTIONS") {
            res.sendStatus(200);
            return;
        }
    
        var token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        } 
        
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
            
            req.userId = decoded.id;
            next();
        });
    },

    auth: (data) => {
        let token;
        let auth = false;
    
        if(data.length > 0) {
            const id = data[0].id;
            token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 600
            });
            auth = true;
        }
    
        const res = {
            data: data,
            token: token,
            auth: auth
        };
    
        return res;
    }

};