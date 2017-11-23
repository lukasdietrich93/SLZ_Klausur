import "reflect-metadata";
import {createConnection} from "typeorm";
import {Student} from "./entity/Student";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const student = new Student();
    student.id = 1;
    student.mail = "test@netnexus.de";
    student.password = "testpwd";
    await connection.manager.save(student);
    console.log("Saved a new student with id: " + student.id);
    
    console.log("Loading students from the database...");
    const students = await connection.manager.find(Student);
    console.log("Loaded users: ", students);
     
    console.log("Here you can setup and run express/koa/any other framework.");
    
}).catch(error => console.log(error));
