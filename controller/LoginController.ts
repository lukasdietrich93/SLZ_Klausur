import "reflect-metadata";
import {createConnection} from "typeorm";
import {Student} from "../src/entity/Student";

export class LoginController{
    public createLogin(){
        createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "rootpassword",
            database: "SLZ_Klausurvorbereitung",
            entities: [
                __dirname + "/entity/*.js"
            ],
            synchronize: true,

        }).then( async connection => {
            let student = new Student();
            //jetzt käme das ausgelesene Formular
            student.mail = "test@test.de";
            student.password ="testpwd";
            student.active = false;
            student.faculty_id= 4;
            //...weitere properties
            let studentRepo = connection.getRepository(Student);
            //persist?
            await studentRepo.save(student);

        }).catch(error => console.log(error));
    }

    //andere Funktionen
}