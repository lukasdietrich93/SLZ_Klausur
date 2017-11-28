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
const Student_1 = require("./../../src/entity/Student");
const ConnectionClass_1 = require("./../../src/class/ConnectionClass");
const LoginController_1 = require("./../../src/controller/LoginController");
const sinon = require("sinon");
require("reflect-metadata");
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require('koa-body');
const app = new Koa();
const router = new Router();
describe("LoginController", () => __awaiter(this, void 0, void 0, function* () {
    let sandbox;
    const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
        sandbox.restore();
    });
    describe("#createLogin", () => {
        // Frage: createLogin ist ja eher ein "register" - der Login selbst sollte ja nur prüfen ob es
        // Nutzer & Pwd gibt und dann entscheiden ob der Nutzer weiter darf
        it("should call save method with correct parameters", () => __awaiter(this, void 0, void 0, function* () {
            // arrange
            const studenRepoStub = {
                save() { }
            };
            const spyOnSave = sandbox.spy(studenRepoStub, "save");
            const spyOnGetRepository = sandbox.stub(connection, "getRepository").returns(studenRepoStub);
            const ctx = {
                request: {
                    body: {
                        mail: "info@netnexus.de",
                        password: "123",
                        faculty_id: "1",
                    }
                }
            };
            const controller = new LoginController_1.LoginController();
            let student = new Student_1.Student();
            student.mail = "info@netnexus.de";
            student.password = "123",
                student.faculty_id = "1";
            student.active = false;
            // act
            yield controller.createLogin(ctx, null);
            // arrange & act
            sinon.assert.calledWith(spyOnGetRepository, Student_1.Student);
            sinon.assert.calledWith(spyOnSave, student);
        }));
        it("should call ctx.render()", () => {
            // ...
        });
    });
}));
//# sourceMappingURL=login.controller.spec.js.map