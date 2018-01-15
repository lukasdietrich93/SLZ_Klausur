import { Student } from './../entity/Student';
import { TipController } from './TipController';
import { MailController } from './MailController';
import { Istatus } from '../entity/Exam';
import { ConnectionClass } from '../class/ConnectionClass';
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

      
    public async renderExam(ctx: Router.IRouterContext, next: any) {
        let id = await ctx.request.url
        id =  id.replace("/addpage/","");
        id =  id.replace("?","");
        console.log(id);
        var examcontroller = new ExamController;
        var exams = examcontroller.findExams();
        ctx.render('addpage',{id: id});
    }
    public async renderOverview(ctx: Router.IRouterContext, next: any) {
        let id = await ctx.request.url
        id =  id.replace("/overview/","");
        id =  id.replace("?","");
        var examcontroller = new ExamController;
        var exams = await examcontroller.findExams(id);
        let tipcontroller = new TipController;
        let newtip = await tipcontroller.getRandomTip();
        ctx.render('overview',{exams: exams, id: id, tip: newtip.content});

    }
    public async createExam(ctx: Router.IRouterContext, next: any) {
        const connection: Connection = await ConnectionClass.getInstance();
        let id = ctx.cookies.request.rawHeaders[19];
        id =  id.replace("http://localhost:3000/addpage/","");
        id =  id.replace("?","");
        let exam = new Exam();
        //jetzt käme das ausgelesene Formular
        let a = ctx.request.body;
        let b = Object.values(a);
        exam.name = b[0];
        exam.date = b[1];
        exam.total_hours = b[2];
        exam.spent_hours = b[3];
        exam.status = b[4];
        let studentRepo = connection.getRepository(Student);
        exam.student = await studentRepo.findOneById(id);
        let examRepo = connection.getRepository(Exam);
        await examRepo.save(exam);
        ctx.redirect('/overview/'+id);
    }
    public async findExams(id=null): Promise<Exam[]>{
        const connection: Connection = await ConnectionClass.getInstance();
        let allExamsRepo = connection.getRepository(Exam);
        let allExams = await allExamsRepo.find({student: id})
        return allExams;
    }

    public async showDetail(ctx: Router.IRouterContext, next: any){
        let id = Object.values(ctx.params)[0];
        let origin =  ctx.cookies.request.rawHeaders[11]
        origin = origin.replace("http://localhost:3000/overview/","");
        const connection: Connection = await ConnectionClass.getInstance();
        let editRepo = connection.getRepository(Exam);
        let editedExam = await editRepo.findOneById(id);
        await ctx.render('editpage',{exam: await editedExam, origin: origin});
    }

    public async showDelete(ctx: Router.IRouterContext, next: any){
        let id = Object.values(ctx.params)[0];
        let origin =  ctx.cookies.request.rawHeaders[11]
        origin = origin.replace("http://localhost:3000/overview/","");
        const connection: Connection = await ConnectionClass.getInstance();
        let editRepo = connection.getRepository(Exam);
        let editedExam = await editRepo.findOneById(id);
        await ctx.render('deletepage',{exam: await editedExam, origin: origin});
    }
    public async editExam(ctx: Router.IRouterContext, next: any) {
        const connection: Connection = await ConnectionClass.getInstance();
        let editRepo = connection.getRepository(Exam);
        let id = ctx.request.header.referer;
        id = id.replace("http://localhost:3000/editpage/","");
        let currentExam =await editRepo.findOneById({id : id});
        currentExam.name = ctx.request.body.name;
        currentExam.date = ctx.request.body.date;
        currentExam.total_hours = ctx.request.body.total_hours;
        currentExam.spent_hours = ctx.request.body.spent_hours;
        currentExam.status = ctx.request.body.status;
        let url = ctx.url;
        url = url.replace("/examedited/","");
        url = url.replace("?","");
        await editRepo.save(currentExam);
        var examcontroller = new ExamController;
        var exams = await examcontroller.findExams(currentExam.student);
        ctx.redirect('/overview/'+url);
    }
    public async deleteExam(ctx: Router.IRouterContext, next: any) {
        const connection: Connection = await ConnectionClass.getInstance()
        let deleteRepo = connection.getRepository(Exam);
        let id = ctx.request.header.referer;
        id = id.replace("http://localhost:3000/deletepage/","");
        let currentExam =await deleteRepo.findOneById({id : id});
        await deleteRepo.remove(currentExam);
        var examcontroller = new ExamController;
        var exams = examcontroller.findExams(id);
        let url = ctx.url;
        url = url.replace("/examdeleted/","");
        url = url.replace("?","");
        ctx.redirect('/overview/'+url);
    }
    public async findId(ctx: Router.IRouterContext, next: any): Promise<any> {
        const connection: Connection = await ConnectionClass.getInstance()
        let studentRepo = connection.getRepository(Student);
        let mail = ctx.response.header
        let student = await studentRepo.findOneById({mail: mail})
        console.log(ctx.cookies.get("lukasdietrich@netnexus.de"));
        return student.id;

    }
    
}