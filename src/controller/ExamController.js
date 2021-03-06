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
const Student_1 = require("./../entity/Student");
const TipController_1 = require("./TipController");
//import { Istatus } from '../entity/Exam';
const ConnectionClass_1 = require("../class/ConnectionClass");
const Exam_1 = require("../entity/Exam");
require("reflect-metadata");
class ExamController {
    renderExam(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = yield ctx.request.url;
            id = id.replace("/addpage/", "");
            id = id.replace("?", "");
            var examcontroller = new ExamController;
            var exams = examcontroller.findExams();
            ctx.render('addpage', { id: id });
        });
    }
    renderOverview(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = yield ctx.request.url;
            id = id.replace("/overview/", "");
            id = id.replace("?", "");
            var examcontroller = new ExamController;
            var exams = yield examcontroller.findExams(id);
            let tipcontroller = new TipController_1.TipController;
            let newtip = yield tipcontroller.getRandomTip();
            ctx.render('overview', { exams: exams, id: id, tip: newtip.content });
        });
    }
    renderArchive(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = yield ctx.request.url;
            id = id.replace("/archiv/", "");
            id = id.replace("?", "");
            var examcontroller = new ExamController;
            var exams = yield examcontroller.findExams(id);
            let tipcontroller = new TipController_1.TipController;
            let newtip = yield tipcontroller.getRandomTip();
            ctx.render('archiv', { exams: exams, id: id, tip: newtip.content });
        });
    }
    createExam(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let id = ctx.cookies.request.rawHeaders[19];
            id = id.replace("http://localhost:3000/addpage/", "");
            id = id.replace("?", "");
            let exam = new Exam_1.Exam();
            //jetzt käme das ausgelesene Formular
            let a = ctx.request.body;
            let b = Object.values(a);
            exam.name = b[0];
            exam.date = b[1];
            exam.total_hours = b[2];
            exam.spent_hours = b[3];
            exam.status = b[4];
            let studentRepo = connection.getRepository(Student_1.Student);
            exam.student = yield studentRepo.findOneById(id);
            let examRepo = connection.getRepository(Exam_1.Exam);
            yield examRepo.save(exam);
            ctx.redirect('/overview/' + id);
        });
    }
    findExams(id = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let allExamsRepo = connection.getRepository(Exam_1.Exam);
            let allExams = yield allExamsRepo.find({ student: id });
            return allExams;
        });
    }
    findAllExams(id = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let allExamsRepo = connection.getRepository(Exam_1.Exam);
            let allExams = yield allExamsRepo.find();
            return allExams;
        });
    }
    showDetail(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let id2 = ctx.request.header.referer;
            id2 = id2.replace("http://localhost:3000/overview/", "");
            let id = Object.values(ctx.params)[0];
            let origin = ctx.cookies.request.rawHeaders[11];
            origin = origin.replace("http://localhost:3000/overview/", "");
            let editRepo = connection.getRepository(Exam_1.Exam);
            let editedExam = yield editRepo.findOneById(id);
            yield ctx.render('editpage', { exam: yield editedExam, origin: origin, object: editedExam, id2: id2 });
        });
    }
    showDelete(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let id = Object.values(ctx.params)[0];
            let origin = ctx.cookies.request.rawHeaders[11];
            origin = origin.replace("http://localhost:3000/overview/", "");
            let editRepo = connection.getRepository(Exam_1.Exam);
            let editedExam = yield editRepo.findOneById(id);
            yield ctx.render('deletepage', { exam: yield editedExam, origin: origin });
        });
    }
    showReactivate(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let id = Object.values(ctx.params)[0];
            let origin = ctx.cookies.request.rawHeaders[11];
            origin = origin.replace("http://localhost:3000/archiv/", "");
            let editRepo = connection.getRepository(Exam_1.Exam);
            let editedExam = yield editRepo.findOneById(id);
            yield ctx.render('reactivate', { exam: yield editedExam, origin: origin });
        });
    }
    showArchive(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let id = Object.values(ctx.params)[0];
            let origin = ctx.cookies.request.rawHeaders[11];
            origin = origin.replace("http://localhost:3000/overview/", "");
            let editRepo = connection.getRepository(Exam_1.Exam);
            let editedExam = yield editRepo.findOneById(id);
            yield ctx.render('archivepage', { exam: yield editedExam, origin: origin });
        });
    }
    editExam(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let editRepo = connection.getRepository(Exam_1.Exam);
            let id = ctx.request.header.referer;
            id = id.replace("http://localhost:3000/editpage/", "");
            let currentExam = yield editRepo.findOneById({ id: id });
            currentExam.name = ctx.request.body.name;
            currentExam.date = ctx.request.body.date;
            currentExam.total_hours = ctx.request.body.total_hours;
            currentExam.spent_hours = ctx.request.body.spent_hours;
            currentExam.status = ctx.request.body.status;
            let url = ctx.url;
            url = url.replace("/examedited/", "");
            url = url.replace("?", "");
            yield editRepo.save(currentExam);
            var examcontroller = new ExamController;
            var exams = yield examcontroller.findExams(currentExam.student);
            ctx.redirect('/overview/' + url);
        });
    }
    deleteExam(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let deleteRepo = connection.getRepository(Exam_1.Exam);
            let id = ctx.request.header.referer;
            id = id.replace("http://localhost:3000/deletepage/", "");
            let currentExam = yield deleteRepo.findOneById({ id: id });
            yield deleteRepo.remove(currentExam);
            var examcontroller = new ExamController;
            var exams = examcontroller.findExams(id);
            let url = ctx.url;
            url = url.replace("/examdeleted/", "");
            url = url.replace("?", "");
            ctx.redirect('/overview/' + url);
        });
    }
    archiveExam(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let archiveRepo = connection.getRepository(Exam_1.Exam);
            let id = ctx.request.header.referer;
            id = id.replace("http://localhost:3000/archivepage/", "");
            let currentExam = yield archiveRepo.findOneById({ id: id });
            currentExam.archived = true;
            yield archiveRepo.save(currentExam);
            var examcontroller = new ExamController;
            var exams = examcontroller.findExams(id);
            let url = ctx.url;
            url = url.replace("/examarchived/", "");
            url = url.replace("?", "");
            ctx.redirect('/overview/' + url);
        });
    }
    reactivateExam(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let reactivateRepo = connection.getRepository(Exam_1.Exam);
            let id = ctx.request.header.referer;
            id = id.replace("http://localhost:3000/reactivate/", "");
            let currentExam = yield reactivateRepo.findOneById({ id: id });
            currentExam.archived = false;
            yield reactivateRepo.save(currentExam);
            let url = ctx.url;
            url = url.replace("/examreactivated/", "");
            url = url.replace("?", "");
            ctx.redirect('/archiv/' + url);
        });
    }
    findId(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let studentRepo = connection.getRepository(Student_1.Student);
            let mail = ctx.response.header;
            let student = yield studentRepo.findOneById({ mail: mail });
            return student.id;
        });
    }
}
exports.ExamController = ExamController;
//# sourceMappingURL=ExamController.js.map