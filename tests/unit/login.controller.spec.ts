import { Student } from './../../src/entity/Student';
import { ConnectionClass } from './../../src/class/ConnectionClass';
import { LoginController } from './../../src/controller/LoginController';
import { expect } from 'chai';
import "reflect-metadata";
import {createConnection, Connection} from "typeorm";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as _ from 'lodash';
const bodyParser = require('koa-body');
const app = new Koa();
const router = new Router();



describe ("createLogin", () =>{
    it("should create a DB entry with the parameter data",async () =>{
        // arrange & act
        let lc = new LoginController;
        const router = new Router;
        router.get('/', lc.renderLogin);
        app.use(router.routes());
            app.listen(3000);
            const connection: Connection = await ConnectionClass.getInstance();
            let studentRepo = connection.getRepository(Student);
            let testdata = await studentRepo.findOneById(1);
            expect(testdata.mail).to.eql("1");

    })
})