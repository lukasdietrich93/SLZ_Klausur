import "reflect-metadata";
import {createConnection} from "typeorm";
import {Student} from "./entity/Student";
import {Exam} from "./entity/Exam";
import { LoginController } from "./LoginController"

let Login = new LoginController();
Login.createLogin("1234","testpwd",4444);

