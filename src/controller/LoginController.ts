import { MailController } from './MailController';
import { Istatus } from '../entity/Exam';
import { ConnectionClass } from '../class/ConnectionClass';
import { Student } from "../entity/Student";
import { Exam } from "../entity/Exam";
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import * as Router from "koa-router";
import { Email } from 'sendmail';
import { MailServer } from '../class/MailServerClass';
import { HashNo } from '../entity/HashNo';
import { HashNoController } from './HashController';
import { Repository } from 'typeorm/repository/Repository';
 

export class LoginController {
  
    public renderLogin(ctx: Router.IRouterContext, next: any) {
        ctx.render('form');
    }

    public async createLogin(ctx: Router.IRouterContext, next: any) {
        const connection: Connection = await ConnectionClass.getInstance();
        try{
            let studentRepo = connection.getRepository(Student);
            let hashRepo = connection.getRepository(HashNo);
            let a = ctx.request.body;
            let b = Object.values(a);
            let student = new Student();
            let hashcontroller = new HashNoController;
            student.mail = b[0];
            student.password = b[1],
            student.faculty_id = b[2];
            student.active = false;
            let actualhash = hashcontroller.saveAndReturnHash();
            student.hash = await actualhash;
            let mailcontr = new MailController;
            let persist = mailcontr.sendRegLink(student.mail, student.hash);
            console.log(await persist);
            if (await persist == 1){ await studentRepo.save(student);}
            let activate = new HashNoController
           // activate.activateAccount(student.mail, student.hash);
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