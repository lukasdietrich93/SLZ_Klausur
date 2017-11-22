export enum Itype{
    admin = "Admin",
    student = "Student",
}
export class User {
    private id: number;
    private mail: string;
    private password: string;
    active: boolean;
    faculty_id: number;
    last_login: Date;
    register_date: Date;
    type: Itype;
}
