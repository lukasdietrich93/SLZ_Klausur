"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectionClass_1 = require("../class/ConnectionClass");
const Student_1 = require("../entity/Student");
const Exam_1 = require("../entity/Exam");
require("reflect-metadata");
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require('koa-body');
const app = new Koa();
const router = new Router();
class LoginController {
    createLogin(mail, password, faculty) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let student = new Student_1.Student();
            //jetzt käme das ausgelesene Formular
            student.mail = mail;
            student.password = password;
            student.active = false;
            student.faculty_id = faculty;
            //...weitere properties
            let studentRepo = connection.getRepository(Student_1.Student);
            //persist?
            yield studentRepo.save(student);
        });
    }
    createExam(name, date, total_hours, spent_hours, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let exam = new Exam_1.Exam();
            //jetzt käme das ausgelesene Formular
            exam.name = name;
            exam.date = date;
            exam.total_hours = total_hours;
            exam.spent_hours = spent_hours;
            exam.status = status;
            let examRepo = connection.getRepository(Exam_1.Exam);
            yield examRepo.save(exam);
        });
    }
    login() {
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
        router.get('/', renderForm);
        router.post('/', handleForm);
        function renderForm(ctx, next) {
            console.log("test");
            ctx.render('form');
        }
        function handleForm(ctx, next) {
            var a = ctx.request.body;
            let b = Object.values(a);
            console.log(b);
        }
        app.use(router.routes());
        app.listen(3000);
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=LoginController.js.map