"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HashController_1 = require("./controller/HashController");
require("reflect-metadata");
const LoginController_1 = require("./controller/LoginController");
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require('koa-body');
const app = new Koa();
const router = new Router();
var loginController = new LoginController_1.LoginController;
var hashController = new HashController_1.HashNoController;
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
router.post('/activate', loginController.activateAccount);
app.use(router.routes());
app.listen(3000);
//# sourceMappingURL=index.js.map