import { TipController } from './TipController';
import { Istatus } from '../entity/Exam';
import { ConnectionClass } from '../class/ConnectionClass';
import { Student } from "../entity/Student";
import { Exam } from "../entity/Exam";
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import * as Router from "koa-router";
import { Tips } from '../entity/Tips';

export class LoginController {
  
    public renderLogin(ctx: Router.IRouterContext, next: any) {
        ctx.render('form');
    }

    public async createLogin(ctx: Router.IRouterContext, next: any) {
        const connection: Connection = await ConnectionClass.getInstance();
        try{
            let studentRepo = connection.getRepository(Student);
            let a = ctx.request.body;
            let b = Object.values(a);
            let student = new Student();
            student.mail = b[0];
            student.password = b[1],
            student.faculty_id = b[2];
            student.active = false;
            await studentRepo.save(student);
            ctx.render('success');
        }
        catch(e){
            ctx.render('failed');
        }
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
let tip = new TipController;
tip.getRandomTip();
