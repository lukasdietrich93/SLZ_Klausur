import { ConnectionClass } from './../ConnectionClass';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Student } from "../src/entity/Student";


export class LoginController {
    public async createLogin(mail: string, password: string, faculty: number) {
        const connection = ConnectionClass.getInstance();
        
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
    
}