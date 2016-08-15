const express = require('express'),
app = express(),
http = require('http'),
bodyParser = require('body-parser'),
db = require('./db');
config = require('./config'),
server = require('./server')
presetRouter = require('./routes/presets'),
publicRouter = require('./routes/public'),
cors = require('cors'),
path = require('path'),
morgan = require('morgan');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
//app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
app.use(bodyParser.urlencoded({
    limit: '5mb', // to support URL-encoded bodies
    extended: true
}));
app.use(function(err, req, res, next){ // logic
    console.log(err);
    next();
});
presetRouter(app);
publicRouter(app);





server(app);