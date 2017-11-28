import { TipController } from './../../de.uni-kl.disc.slz/SLZ_Klausur/src/controller/TipController';
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


describe("Tipcontroller", async() => {
    let sandbox: sinon.SinonSandbox;
    
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });
    describe("getRandomTip", () =>{
        it("should find Tip DB entry via id", async ()=> {

            // arrange
            // Hiermit wird await ConnectionClass.getInstance überschrieben
            const connection = {
                getRepository() {}
            };
            const spyOnGetInstance = sandbox.stub(ConnectionClass, "getInstance").returns(connection)

            // Hiermit wird connection.getRepository überschrieben
            const tipRepoStub = {
                findOneById() {}
            };
            const spyOnGetRepository = sandbox.stub(connection, "getRepository").returns(tipRepoStub);
            
            // Hiermit wird fineOneById überschreiben
            const spyOnfind = sandbox.spy(tipRepoStub, "findOneById");

            let tip = new Tips;
            tip.id = 1;
            tip.content = "hallo";

            // act
            const tipcntrl = new TipController;
            await tipcntrl.getRandomTip();


            // assert
            sinon.assert.calledWith(spyOnGetRepository, Tips);
            sinon.assert.calledWith(spyOnfind, tip);
        })
    })
})