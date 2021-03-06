import "reflect-metadata";
import {createConnection} from "typeorm";
import {Student} from "./entity/Student";
import {Exam} from "./entity/Exam";
import {Tips} from "./entity/Tips";
import { LoginController } from "./controller/LoginController"
import { TipController } from "./controller/TipController"
import * as Koa from "koa";
import * as Router from "koa-router";
import * as _ from 'lodash';
import { ExamController } from "./controller/ExamController";
const bodyParser = require('koa-body');
const app = new Koa();
const router = new Router();
const session = require('koa-session');

/**
 * Make sure koa request knows the new "body" property.
 */
declare module "koa" {
    // tslint:disable-next-line:interface-name
    interface Request {
        body: any;
    }
}


var loginController = new LoginController;
var examController = new ExamController;
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
router.get('/changepw',loginController.changePassword);
router.post('/pwreset',loginController.resetPassword);
router.post('/overview/:id', examController.createExam);
router.post('/examedited/:id', examController.editExam);
router.post('/examdeleted/:id', examController.deleteExam);
router.post('/examarchived/:id', examController.archiveExam);
router.get('/overview/:id', examController.renderOverview);
router.get('/archiv/:id', examController.renderArchive);
router.get('/reactivate/:id', examController.showReactivate);
router.post('/examreactivated/:id', examController.reactivateExam);


app.keys = ["key1","key2"];
    app.use(router.routes());
    app.listen(3000);