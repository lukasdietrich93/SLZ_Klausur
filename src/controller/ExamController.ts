import { MailController } from './MailController';
import { Istatus } from '../entity/Exam';
import { ConnectionClass } from '../class/ConnectionClass';
import { Student } from "../entity/Student";
import { Exam } from "../entity/Exam";
import "reflect-metadata";
import { Connection, createConnection, Code } from "typeorm";
import * as Router from "koa-router";
import { Email } from 'sendmail';
import { MailServer } from '../class/MailServerClass';
import { Repository } from 'typeorm/repository/Repository';
import { SSL_OP_NETSCAPE_CHALLENGE_BUG } from 'constants';


export class ExamController {

      
    public renderExam(ctx: Router.IRouterContext, next: any) {
        ctx.render('addpage');
    }
    public async createExam(ctx: Router.IRouterContext, next: any) {
        const connection: Connection = await ConnectionClass.getInstance();
        let exam = new Exam();
        //jetzt käme das ausgelesene Formular
        let a = ctx.request.body;
        let b = Object.values(a);
        exam.name = b[0];
        exam.date = b[1];
        exam.total_hours = b[2];
        exam.spent_hours = b[3];
        exam.status = b[4];
        let examRepo = connection.getRepository(Exam);
        await examRepo.save(exam);
        var examcontroller = new ExamController;
        var exams = examcontroller.findExams();
        var str =  JSON.stringify( await exams);
        str = str.replace(/"/g, "");
        str = str.replace(/:/g, ": ");
        str = str.replace(/\[{/g,"");
        str = str.replace(/\,{/g,"");
        str = str.replace(/\]/g,"");
        str = str.replace(/,/g, ", ");
        str = str.replace(/result_status: false/g, "");
        str = str.replace(/result_status: true/g, "");
        str = str.replace(/reminder_status: false/g,"");
        str = str.replace(/reminder_status: true/g, "");
        str = str.replace(/total_hours:/g, "");
        str = str.replace(/spent_hours:/g, "");
        str = str.replace(/date:/g, "");
        str = str.replace(/name:/g, "");
        str = str.replace(/id:/g, "");
        str = str.replace(/status:/g, "");
        str = str.replace(/status:/g, "");
        str = str.replace(/status:/g, "");
        str = str.replace(/status:/g, "");
        await ctx.render('overview',{exams: str});
    }
    public async findExams(): Promise<Exam[]>{
        const connection: Connection = await ConnectionClass.getInstance();
        let allExamsRepo = connection.getRepository(Exam);
        let allExams = await allExamsRepo.find();
        return await allExams;
    }
}