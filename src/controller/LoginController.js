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
class LoginController {
    renderLogin(ctx, next) {
        console.log("test");
        ctx.render('form');
    }
    createLogin(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let a = ctx.request.body;
            let b = Object.values(a);
            let student = new Student_1.Student();
            student.mail = b[0];
            student.password = b[1],
                student.faculty_id = b[2];
            student.active = false;
            let studentRepo = connection.getRepository(Student_1.Student);
            yield studentRepo.save(student);
            ctx.render('success');
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
//# sourceMappingURL=LoginController.js.map