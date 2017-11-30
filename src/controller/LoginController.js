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
<<<<<<< HEAD
const MailController_1 = require("./MailController");
=======
const TipController_1 = require("./TipController");
>>>>>>> 0e4c804ea99ee530271b69c0615ef5564764ae89
const ConnectionClass_1 = require("../class/ConnectionClass");
const Student_1 = require("../entity/Student");
const Exam_1 = require("../entity/Exam");
require("reflect-metadata");
const HashNo_1 = require("../entity/HashNo");
const HashController_1 = require("./HashController");
class LoginController {
    renderLogin(ctx, next) {
        ctx.render('form');
    }
    createLogin(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            try {
                let studentRepo = connection.getRepository(Student_1.Student);
                let hashRepo = connection.getRepository(HashNo_1.HashNo);
                let a = ctx.request.body;
                let b = Object.values(a);
                let student = new Student_1.Student();
                let hashcontroller = new HashController_1.HashNoController;
                student.mail = b[0];
                student.password = b[1],
                    student.faculty_id = b[2];
                student.active = false;
                let actualhash = hashcontroller.saveAndReturnHash();
                student.hash = yield actualhash;
                let mailcontr = new MailController_1.MailController;
                let persist = mailcontr.sendRegLink(student.mail, student.hash);
                console.log(yield persist);
                if ((yield persist) == 1) {
                    yield studentRepo.save(student);
                }
                let activate = new HashController_1.HashNoController;
                // activate.activateAccount(student.mail, student.hash);
                ctx.render('success');
            }
            catch (e) {
                ctx.render('failed');
            }
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
}
exports.LoginController = LoginController;
let tip = new TipController_1.TipController;
tip.getRandomTip();
//# sourceMappingURL=LoginController.js.map