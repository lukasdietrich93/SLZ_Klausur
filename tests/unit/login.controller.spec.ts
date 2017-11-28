import { Student } from './../../src/entity/Student';
import { ConnectionClass } from './../../src/class/ConnectionClass';
import { LoginController } from './../../src/controller/LoginController';
import { expect } from "chai";
import * as sinon from "sinon";
import "reflect-metadata";
import { Connection } from "typeorm";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as _ from 'lodash';
import { Tips } from '../../src/entity/Tips';
const bodyParser = require('koa-body');
const app = new Koa();
const router = new Router();


describe("LoginController", async () => {
    let sandbox: sinon.SinonSandbox;
    
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("#createLogin", () => {

        // Frage: createLogin ist ja eher ein "register" - der Login selbst sollte ja nur prüfen ob es
        // Nutzer & Pwd gibt und dann entscheiden ob der Nutzer weiter darf

        it("should call save method with correct parameters", async () => {
            // arrange
            // Hiermit wird await ConnectionClass.getInstance überschrieben
            const connection = {
                getRepository() {}
            };
            const spyOnGetInstance = sandbox.stub(ConnectionClass, "getInstance").returns(connection)
            
            // Hiermit wird connection.getRepository überschrieben
            const studenRepoStub = {
                save() {}
            };
            const spyOnGetRepository = sandbox.stub(connection, "getRepository").returns(studenRepoStub);
            
            // Hiermit wird studentRepo.save überschrieben
            const spyOnSave = sandbox.spy(studenRepoStub, "save");
            
            // ein Hilfscontext, da wir keinen richtigen ctx haben
            const ctx = {
                request: {
                    body: {
                        mail: "info@netnexus.de",
                        password: "123",
                        faculty_id: "1",
                    }
                },
                render() {},
            }
            // Diesen Student nutzen wir später in der assertion
            let student = new Student();
            student.mail = "info@netnexus.de";
            student.password = "123",
            student.faculty_id = "1";
            student.active = false;

            // act
            const controller = new LoginController();            
            await controller.createLogin(ctx as any, null);

            // assert
            sinon.assert.calledWith(spyOnGetRepository, Student); // Klasse
            sinon.assert.calledWith(spyOnSave, student); // Objekt
        });

        it("should call ctx.render()", () => {
            // ...
        });
    })
})
