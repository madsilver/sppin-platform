const express = require('express')
const app = express()
const httpProxy = require('express-http-proxy')
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const helper = require('./helpers/auth');
const morgan = require('morgan');
const winston = require('./helpers/winston');

const proxyUser = httpProxy(process.env.PROXY_USER);
const proxyModule = httpProxy(process.env.PROXY_MODULE);
const proxyLog = httpProxy(process.env.PROXY_LOG);

require('dotenv-safe').load();

app.use(helmet());
app.use(cookieParser());

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use(morgan('combined', { stream: winston.stream }));

// cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

app.post('/login', httpProxy(process.env.PROXY_USER, {
    userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
        let s = proxyResData.toString('utf8');
        let data = JSON.parse(s);
        let res = helper.auth(data);
        return JSON.stringify(res);
    }
}));

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // add this line to include winston logging
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

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