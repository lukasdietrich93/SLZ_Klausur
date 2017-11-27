import { Istatus } from '../entity/Exam';
import { ConnectionClass } from '../class/ConnectionClass';
import { Student } from "../entity/Student";
import { Exam } from "../entity/Exam";
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import * as Router from "koa-router";

export class LoginController {

    public renderLogin(ctx: Router.IRouterContext, next: any) {
        console.log("test");
        ctx.render('form');
    }

    public async createLogin(ctx: Router.IRouterContext, next: any) {
        const connection: Connection = await ConnectionClass.getInstance();
        let a = ctx.request.body;
        let b = Object.values(a);
        let student = new Student();
        student.mail = b[0];
        student.password = b[1],
        student.faculty_id = b[2];
        student.active = false;
        let studentRepo = connection.getRepository(Student);
        await studentRepo.save(student);
        ctx.render('success');
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
}
