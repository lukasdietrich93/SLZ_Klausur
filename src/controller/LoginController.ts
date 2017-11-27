import { Istatus } from '../entity/Exam';
import { ConnectionClass } from '../class/ConnectionClass';
import { Student } from "../entity/Student";
import { Exam } from "../entity/Exam";
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import * as Koa from "koa";
import * as Router from "koa-router";
const bodyParser = require('koa-body');
const app = new Koa();
const router = new Router();
/**
 * Make sure koa request knows the new "body" property.
 */
declare module "koa" {
    // tslint:disable-next-line:interface-name
    interface Request {
        body: any;
    }
}


export class LoginController {


    public async createLogin(mail: string, password: string, faculty: number) {
        const connection: Connection = await ConnectionClass.getInstance();

        let student = new Student();
        //jetzt käme das ausgelesene Formular
        student.mail = mail;
        student.password = password;
        student.active = false;
        student.faculty_id = faculty;
        //...weitere properties
        let studentRepo = connection.getRepository(Student);
        //persist?
        await studentRepo.save(student);
    }
    public async createExam(name: string, date: string, total_hours: number, spent_hours: number, status: Istatus) {
        const connection: Connection = await ConnectionClass.getInstance();
        let exam = new Exam();
        //jetzt käme das ausgelesene Formular
        exam.name = name;
        exam.date = date;
        exam.total_hours = total_hours;
        exam.spent_hours = spent_hours;
        exam.status = status;
        let examRepo = connection.getRepository(Exam);
        await examRepo.save(exam);
    }


    public login() {
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

        function renderForm(ctx: Router.IRouterContext, next: any) {
            console.log("test");
            ctx.render('form');
        }
        function handleForm(ctx: Router.IRouterContext, next: any) {
            console.log(ctx.request.body);
        }

        app.use(router.routes());

        app.listen(3000);
    }
}