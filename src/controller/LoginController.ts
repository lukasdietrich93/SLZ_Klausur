import { Istatus } from '../entity/Exam';
import { ConnectionClass } from '../class/ConnectionClass';
import { Student } from "../entity/Student";
import { Exam } from "../entity/Exam";
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";


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
    public async createExam(name: string, date: string, total_hours: number, spent_hours: number, status: Istatus){
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