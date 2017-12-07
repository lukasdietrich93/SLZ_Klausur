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
const MailController_1 = require("./MailController");
const ConnectionClass_1 = require("../class/ConnectionClass");
const Student_1 = require("../entity/Student");
require("reflect-metadata");
const session = require('koa-session');
const Koa = require('koa');
const app = new Koa();
app.keys = ["key1", "key2"];
class LoginController {
    renderLogin(ctx, next) {
        ctx.render('registerform');
    }
    createLogin(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            try {
                let studentRepo = connection.getRepository(Student_1.Student);
                let a = ctx.request.body;
                let b = Object.values(a);
                let student = new Student_1.Student();
                student.mail = b[0];
                student.password = b[1],
                    student.faculty_id = b[2];
                student.active = false;
                student.hash = Math.random().toString(36).substring(7);
                let mailcontr = new MailController_1.MailController;
                let persist = mailcontr.sendRegLink(student.mail, student.hash);
                if ((yield persist) == 1) {
                    yield studentRepo.save(student);
                    ctx.render('success');
                }
                else {
                    ctx.render('alreadyexisting');
                }
            }
            catch (e) {
                ctx.render('failed');
            }
        });
    }
    Login(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let studentRepo = connection.getRepository(Student_1.Student);
            const mail = ctx.request.body.mail2;
            const student = yield studentRepo.findOne({ mail: mail });
            ctx.cookies.set('name', mail, { signed: true });
            let cookie = (Object.values(ctx.response.header));
            if (ctx.request.body.mail2 == student.mail) {
                if (ctx.request.body.password2 == student.password) {
                    ctx.render('loginsuccess', { context: yield student.id });
                    return;
                }
                else {
                    ctx.render('loginfailed');
                }
            }
        });
    }
    activateAccount(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let studentRepo = connection.getRepository(Student_1.Student);
            const mail = ctx.request.body.mail;
            const student = yield studentRepo.findOne({ mail: mail });
            if (student.active == true) {
                ctx.render('alreadyactivated');
                return;
            }
            if (ctx.request.body.Code == student.hash) {
                student.active = true;
                yield studentRepo.save(student);
                ctx.render('registrationsuccess');
            }
            else {
                ctx.render('failed');
            }
        });
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=LoginController.js.map