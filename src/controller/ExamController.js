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
const Exam_1 = require("../entity/Exam");
require("reflect-metadata");
class ExamController {
    renderExam(ctx, next) {
        ctx.render('addpage');
    }
    renderOverview(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var examcontroller = new ExamController;
            var exams = examcontroller.findExams();
            ctx.render('overview', { exams: yield exams });
        });
    }
    createExam(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let exam = new Exam_1.Exam();
            //jetzt käme das ausgelesene Formular
            let a = ctx.request.body;
            let b = Object.values(a);
            exam.name = b[0];
            exam.date = b[1];
            exam.total_hours = b[2];
            exam.spent_hours = b[3];
            exam.status = b[4];
            let examRepo = connection.getRepository(Exam_1.Exam);
            yield examRepo.save(exam);
            var examcontroller = new ExamController;
            var exams = examcontroller.findExams();
            var str = JSON.stringify(yield exams);
            yield ctx.render('overview', { exams: yield exams });
        });
    }
    findExams() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let allExamsRepo = connection.getRepository(Exam_1.Exam);
            let allExams = yield allExamsRepo.find();
            return yield allExams;
        });
    }
    showDetail(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = Object.values(ctx.params)[0];
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let editRepo = connection.getRepository(Exam_1.Exam);
            let editExam = yield editRepo.findOneById(id);
            yield ctx.render('editpage', { exam: yield editExam });
        });
    }
    editExam(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let editRepo = connection.getRepository(Exam_1.Exam);
            let name = ctx.request.header.referer;
            name = name.replace("http://localhost:3000/exam/", "");
            let currentExam = yield editRepo.findOneById({ id: name });
            currentExam.name = ctx.request.body.name;
            currentExam.date = ctx.request.body.date;
            currentExam.total_hours = ctx.request.body.total_hours;
            currentExam.spent_hours = ctx.request.body.spent_hours;
            currentExam.reminder_status = ctx.request.body.reminder_status;
            yield editRepo.save(currentExam);
            var examcontroller = new ExamController;
            var exams = examcontroller.findExams();
            var str = JSON.stringify(yield exams);
            yield ctx.render('overview', { exams: yield exams });
            ctx.render('examedited', { exams: yield exams });
        });
    }
}
exports.ExamController = ExamController;
//# sourceMappingURL=ExamController.js.map