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
            str = str.replace(/"/g, "");
            str = str.replace(/:/g, ": ");
            str = str.replace(/\[{/g, "");
            str = str.replace(/\,{/g, "");
            str = str.replace(/\]/g, "");
            str = str.replace(/,/g, ", ");
            str = str.replace(/result_status: false/g, "");
            str = str.replace(/result_status: true/g, "");
            str = str.replace(/reminder_status: false/g, "");
            str = str.replace(/reminder_status: true/g, "");
            str = str.replace(/total_hours:/g, "");
            str = str.replace(/spent_hours:/g, "");
            str = str.replace(/date:/g, "");
            str = str.replace(/name:/g, "");
            str = str.replace(/id:/g, "");
            str = str.replace(/status:/g, "");
            str = str.replace(/status:/g, "");
            str = str.replace(/status:/g, "");
            str = str.replace(/status:/g, "");
            yield ctx.render('overview', { exams: str });
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
}
exports.ExamController = ExamController;
//# sourceMappingURL=ExamController.js.map