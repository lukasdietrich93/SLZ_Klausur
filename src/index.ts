import "reflect-metadata";
import {createConnection} from "typeorm";
import {Student} from "./entity/Student";
import {Exam} from "./entity/Exam";
import {Tips} from "./entity/Tips";
import { LoginController } from "./controller/LoginController"
import { TipController } from "./controller/TipController"

let Login = new LoginController();
Login.createLogin("12345","testpwd",4444);
Login.createExam("testexam","30/01/1999",500,250,3);
let RndTip = new TipController();
// RndTip.getRandomTip();
Login.login();
