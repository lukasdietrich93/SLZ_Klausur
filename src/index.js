"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const LoginController_1 = require("./controller/LoginController");
const Koa = require("koa");
const Router = require("koa-router");
const ExamController_1 = require("./controller/ExamController");
const bodyParser = require('koa-body');
const app = new Koa();
const router = new Router();
var loginController = new LoginController_1.LoginController;
var examController = new ExamController_1.ExamController;
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
router.get('/exam/:id', examController.showDetail);
router.get('/addpage', examController.renderExam);
router.post('/register', loginController.createLogin);
router.post('/login', loginController.Login);
router.post('/activate', loginController.activateAccount);
router.post('/overview', examController.createExam);
router.post('/examedited', examController.editExam);
app.use(router.routes());
app.listen(3000);
//# sourceMappingURL=index.js.map