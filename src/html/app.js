var koa = require('koa');
var router = require('koa-router');
var bodyParser = require('koa-body');
var app = new koa();
var _ = new router();

//Set up Pug
var Pug = require('koa-pug');
var pug = new Pug({
   viewPath: '../views',
   basedir: '../views',
   app: app //Equivalent to app.use(pug)
});

//Set up body parsing middleware
app.use(bodyParser({
   formidable:{uploadDir: '/views'},
   multipart: true,
   urlencoded: true
}));

_.get('/', renderForm);
_.post('/', handleForm);

function * renderForm(){
   this.render('form');
}
function *handleForm(){
   console.log(this.request.body);
   console.log(this.req.body);
   this.body = this.request.body; //This is where the parsed request is stored
}

app.use(_.routes()); 

app.listen(3000);