import { User } from './user-class.model';
import { Getter } from '.././getter.class'
export enum Iresult_status{
    checked = "4.0"
}
export enum Ireminder_status{
    checked = "remind"
}
export enum Istatus{
    checked = "deleted"
}

export class Exam{
    private id: number;
   // private student_id: getString("id");
    name: string;
    date: number;
    total_hours: number;
    spent_hours: number;
    status: Istatus;
    sendmailresult_status: Iresult_status;
    sendmailreminder_status: Ireminder_status;
    constructor(id: number, name:string, date:number, total_hours: number, spent_hours:number){
        ExamCreate;
    }
}

class ExamCreate extends Exam{
    createExam(id: number, name: string, date: number, total_hours: number, spent_hours: number){
        let result = new Exam(id,name, date, total_hours, spent_hours);
        console.log(result);
        return result;
    }
}


