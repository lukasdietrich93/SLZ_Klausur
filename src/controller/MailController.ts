import { Email } from 'sendmail';
import { MailServer } from './../class/MailServerClass';
import { Istatus } from '../entity/Exam';
import { ConnectionClass } from '../class/ConnectionClass';
import { Student } from "../entity/Student";
import { Exam } from "../entity/Exam";
import "reflect-metadata";


import { Connection, createConnection } from "typeorm";
import * as Router from "koa-router";
const sendmail = require('sendmail')();

export class MailController{
    public async sendRegLink(receiver, hash): Promise<any> {
        const connection: Connection = await ConnectionClass.getInstance();
        let studentRepo = connection.getRepository(Student);
        const student = await studentRepo.findOne({ mail: receiver});
        if (!student){
            sendmail({
                from: "Klausurplaner@Selbstlernzentrum.de",
                to: receiver,
                subject:"Registration SLZ Klausurplaner",
                html: "Ihre Registrierung beim SLZ Klausurplaner war erfolgreich. Aktivieren sie ihr Konto mit folgendem Code: " + hash + " Bei Fragen antworten Sie nicht auf diese Mail sondern wenden Sie sich an das Selbstlernzentrum unter https://www.google.de",
            },
            function (err,reply){
                console.log(err && err.stack);
                console.dir(reply);
                
            },
            );
        return 1;    
        }else{
           return 0;
        }
    }
}