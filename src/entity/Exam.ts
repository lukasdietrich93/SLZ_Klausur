import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

export enum Istatus{
    EXAM_DELETED,
    EXAM_ARCHIVED,
    EXAM_WAITING,
    EXAM_UPCOMING
}

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
        status: Istatus;

    @Column({
        default:false
    })
        result_status: boolean;

    @Column({
        default: false
    })
        reminder_status: boolean;
    
   /* @OneToOne(() => Student)
    @JoinColumn()
    student: Student; */

}