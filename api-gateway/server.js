const express = require('express')
const app = express()
const httpProxy = require('express-http-proxy')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const helper = require('./helper');

require('dotenv-safe').load();

app.use(logger('dev'));
app.use(helmet());
app.use(cookieParser());

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

const proxyUser = httpProxy(process.env.PROXY_USER);
const proxyModule = httpProxy(process.env.PROXY_MODULE);
const proxyLog = httpProxy(process.env.PROXY_LOG);

app.post('/login', httpProxy(process.env.PROXY_USER, {
    userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
        let s = proxyResData.toString('utf8');
        let data = JSON.parse(s);
        let res = helper.auth(data);
        return JSON.stringify(res);
    }
}));

app.use('/users', helper.verifyJWT, (req, res, next) => proxyUser(req, res, next));

app.use('/modules', helper.verifyJWT, (req, res, next) => proxyModule(req, res, next));

app.use('/logs', helper.verifyJWT, (req, res, next) => proxyLog(req, res, next));

app.get('/logged', helper.verifyJWT, (req, res) => {
    res.json({auth: req.userId});
});

app.get('/healthcheck', (req, res) => {
    res.sendStatus(200);
});

app.listen(process.env.PORT, () => {
    console.log(`server running at port ${process.env.PORT}`)
});