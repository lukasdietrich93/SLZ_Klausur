"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ConnectionClass_1 = require("../class/ConnectionClass");
var Student_1 = require("../entity/Student");
var Exam_1 = require("../entity/Exam");
require("reflect-metadata");
var Koa = require("koa");
var Router = require("koa-router");
var bodyParser = require('koa-body');
var app = new Koa();
var router = new Router();
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.createLogin = function (mail, password, faculty) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, student, studentRepo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ConnectionClass_1.ConnectionClass.getInstance()];
                    case 1:
                        connection = _a.sent();
                        student = new Student_1.Student();
                        //jetzt käme das ausgelesene Formular
                        student.mail = mail;
                        student.password = password;
                        student.active = false;
                        student.faculty_id = faculty;
                        studentRepo = connection.getRepository(Student_1.Student);
                        //persist?
                        return [4 /*yield*/, studentRepo.save(student)];
                    case 2:
                        //persist?
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginController.prototype.createExam = function (name, date, total_hours, spent_hours, status) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, exam, examRepo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ConnectionClass_1.ConnectionClass.getInstance()];
                    case 1:
                        connection = _a.sent();
                        exam = new Exam_1.Exam();
                        //jetzt käme das ausgelesene Formular
                        exam.name = name;
                        exam.date = date;
                        exam.total_hours = total_hours;
                        exam.spent_hours = spent_hours;
                        exam.status = status;
                        examRepo = connection.getRepository(Exam_1.Exam);
                        return [4 /*yield*/, examRepo.save(exam)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginController.prototype.login = function () {
        //Set up Pug
        var Pug = require('koa-pug');
        var pug = new Pug({
            viewPath: '../views',
            basedir: '../views',
            app: app //Equivalent to app.use(pug)
        });
        pug.use(app);
        //Set up body parsing middleware
        app.use(bodyParser({
            formidable: { uploadDir: '/views' },
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
            console.log(ctx.request.body);
        }
        app.use(router.routes());
        app.listen(3000);
    };
    return LoginController;
}());
exports.LoginController = LoginController;
//# sourceMappingURL=LoginController.js.map