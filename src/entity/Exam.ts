import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne} from "typeorm";
import { Student } from "./Student";

/*export enum Istatus{
    EXAM_DELETED,
    EXAM_ARCHIVED,
    EXAM_WAITING,
    EXAM_UPCOMING
}*/

@Entity()
export class Exam {

    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        name: string;

    @Column()
        date: string;
    
    @Column()
        total_hours: number;

    @Column()
        spent_hours: number;

    @Column()
        status: string;

    @Column({
        default:false
    })
        archived: boolean;

    @Column({
        default:false
    })
        result_status: boolean;

    @Column({
        default: false
    })
        reminder_status: boolean;

    @OneToOne(type => Student)
    @JoinColumn()
    student: Student;
}