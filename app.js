const Koa = require('koa');

const path = require('path');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

const convert = require('koa-convert')

const static = require('koa-static')

const app = new Koa();

var io = require('socket.io').listen(app);

const isProduction = process.env.NODE_ENV === 'production';

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

app.use(convert(static(
    path.join(__dirname, '/static')
)));

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');