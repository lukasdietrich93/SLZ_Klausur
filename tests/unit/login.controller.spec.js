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
const chai_1 = require("chai");
require("reflect-metadata");
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require('koa-body');
const app = new Koa();
const router = new Router();
describe("createLogin", () => {
    it("should create a DB entry with the parameter data", () => __awaiter(this, void 0, void 0, function* () {
        // arrange & act
        let lc = new LoginController_1.LoginController;
        const router = new Router;
        router.get('/', lc.renderLogin);
        app.use(router.routes());
        app.listen(3000);
        const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
        let studentRepo = connection.getRepository(Student_1.Student);
        let testdata = yield studentRepo.findOneById(1);
        chai_1.expect(testdata.mail).to.eql("1");
    }));
});
//# sourceMappingURL=login.controller.spec.js.map