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
const session = require('koa-session');
const Koa = require('koa');
const app = new Koa();
app.keys = ["key1","key2"];

export class LoginController {
  
    public renderLogin(ctx: Router.IRouterContext, next: any) {
            ctx.render('registerform');
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
            student.hash = Math.random().toString(36).substring(7);
            let mailcontr = new MailController;
            let persist = mailcontr.sendRegLink(student.mail, student.hash);
            if (await persist == 1){ 
                await studentRepo.save(student);
                ctx.render('success');
            }
            else{
                ctx.render('alreadyexisting');
            }
        }
        catch(e){
            ctx.render('failed');
        }
    }


    public async Login(ctx: Router.IRouterContext, next: any){
        const connection: Connection = await ConnectionClass.getInstance();
        let studentRepo = connection.getRepository(Student);
        const mail = ctx.request.body.mail2;
        const student = await studentRepo.findOne({ mail: mail});
        ctx.cookies.set('name',mail ,{signed: true});
        let cookie = (Object.values(ctx.response.header));
        try{
            if(ctx.request.body.mail2 == student.mail){
               if (ctx.request.body.password2 ==  student.password){
                    ctx.render('loginsuccess',{context: await student.id});
                    return;
                }
            }
        }
        catch(e){
            ctx.render('loginfailed');
        }
    }

    public async activateAccount(ctx: Router.IRouterContext, next: any){
        const connection: Connection = await ConnectionClass.getInstance();
        let studentRepo = connection.getRepository(Student);
        const mail = ctx.request.body.mail;
        const student = await studentRepo.findOne({ mail: mail});
        if (student.active == true){
            ctx.render('alreadyactivated');
            return;
        }
        if (ctx.request.body.Code == student.hash){
            student.active = true;
            await studentRepo.save(student);
            ctx.render('registrationsuccess');
        }else{
            ctx.render('failed');
        }
    }
}
