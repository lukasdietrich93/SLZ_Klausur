"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const LoginController_1 = require("./controller/LoginController");
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require('koa-body');
const app = new Koa();
const router = new Router();
var loginController = new LoginController_1.LoginController;
//Set up Pug
var Pug = require('koa-pug');
var pug = new Pug({
    viewPath: '../src/views',
    basedir: '../src/views',
    app: app //Equivalent to app.use(pug)
});
pug.use(app);
//Set up body parsing middleware
app.use(bodyParser({
    formidable: { uploadDir: '../src/views' },
    multipart: true,
    urlencoded: true
}));
router.get('/', loginController.renderLogin);
router.post('/', loginController.createLogin);
app.use(router.routes());
app.listen(3000);
//# sourceMappingURL=index.js.map