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
import { Archive } from '../entity/Archive';


export class ExamController {

      
    public renderExam(ctx: Router.IRouterContext, next: any) {
        ctx.render('addpage');
    }
    public async renderOverview(ctx: Router.IRouterContext, next: any) {
        var examcontroller = new ExamController;
        var exams = examcontroller.findExams();
        ctx.render('overview',{exams: await exams});
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
        await ctx.render('overview',{exams: await exams});
    }
    public async findExams(): Promise<Exam[]>{
        const connection: Connection = await ConnectionClass.getInstance();
        let allExamsRepo = connection.getRepository(Exam);
        let allExams = await allExamsRepo.find();
        return await allExams;
    }

    public async showDetail(ctx: Router.IRouterContext, next: any){
        let id = Object.values(ctx.params)[0];
        const connection: Connection = await ConnectionClass.getInstance();
        let editRepo = connection.getRepository(Exam);
        let editExam = await editRepo.findOneById(id);
        await ctx.render('editpage',{exam: await editExam});
    }
    public async editExam(ctx: Router.IRouterContext, next: any) {
        const connection: Connection = await ConnectionClass.getInstance();
        let editRepo = connection.getRepository(Exam);
        let name = ctx.request.header.referer;
        name = name.replace("http://localhost:3000/exam/","");
        let currentExam =await editRepo.findOneById({id : name});
        currentExam.name = ctx.request.body.name;
        currentExam.date = ctx.request.body.date;
        currentExam.total_hours = ctx.request.body.total_hours;
        currentExam.spent_hours = ctx.request.body.spent_hours;
        currentExam.status = ctx.request.body.status;
        await editRepo.save(currentExam);
        var examcontroller = new ExamController;
        var exams = examcontroller.findExams();
        var str =  JSON.stringify( await exams);
        await ctx.render('overview',{exams: await exams});
        ctx.render('examedited',{exams: await exams});
        
    }
}