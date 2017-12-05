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
router.get('/exam/:id', examController.showDetail);
router.get('/addpage', examController.renderExam);
router.post('/register', loginController.createLogin);
router.post('/login', loginController.Login);
router.post('/activate', loginController.activateAccount);
router.post('/overview', examController.createExam);
router.post('/examedited', examController.editExam);
    app.use(router.routes());

    app.listen(3000);