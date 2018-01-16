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
const session = require('koa-session');
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
router.get('/editpage/:id', examController.showDetail);
router.get('/examedited/:id', examController.renderOverview);
router.get('/examdeleted/:id', examController.renderOverview);
router.get('/examarchived/:id', examController.renderOverview);
router.get('/deletepage/:id', examController.showDelete);
router.get('/archivepage/:id', examController.showArchive);
router.get('/addpage/:id', examController.renderExam);
router.post('/register', loginController.createLogin);
router.post('/login', loginController.Login);
router.post('/activate', loginController.activateAccount);
router.get('/changepw', loginController.changePassword);
router.post('/pwreset', loginController.resetPassword);
router.post('/overview/:id', examController.createExam);
router.post('/examedited/:id', examController.editExam);
router.post('/examdeleted/:id', examController.deleteExam);
router.post('/examarchived/:id', examController.archiveExam);
router.get('/overview/:id', examController.renderOverview);
router.get('/archiv', examController.renderArchive);
app.keys = ["key1", "key2"];
app.use(router.routes());
app.listen(3000);
//# sourceMappingURL=index.js.map