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
const TipController_1 = require("./../../de.uni-kl.disc.slz/SLZ_Klausur/src/controller/TipController");
const ConnectionClass_1 = require("./../../src/class/ConnectionClass");
const sinon = require("sinon");
require("reflect-metadata");
const Koa = require("koa");
const Router = require("koa-router");
const Tips_1 = require("../../src/entity/Tips");
const bodyParser = require('koa-body');
const app = new Koa();
const router = new Router();
describe("Tipcontroller", () => __awaiter(this, void 0, void 0, function* () {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
        sandbox.restore();
    });
    describe("getRandomTip", () => {
        it("should find Tip DB entry via id", () => __awaiter(this, void 0, void 0, function* () {
            // arrange
            const connection = {
                getRepository() { }
            };
            const spyOnGetInstance = sandbox.stub(ConnectionClass_1.ConnectionClass, "getInstance").returns(connection);
            // Hiermit wird connection.getRepository überschrieben
            const tipRepoStub = {
                findOneById() { }
            };
            const spyOnGetRepository = sandbox.stub(connection, "getRepository").returns(tipRepoStub);
            const spyOnfind = sandbox.spy(tipRepoStub, "findOneById");
            // act
            const tipcntrl = new TipController_1.TipController;
            yield tipcntrl.getRandomTip();
            // assert
            sinon.assert.calledWith(spyOnGetRepository, Tips_1.Tips);
            sinon.assert.calledWith(spyOnfind, 1);
        }));
    });
}));
//# sourceMappingURL=tip.controller.spec.js.map