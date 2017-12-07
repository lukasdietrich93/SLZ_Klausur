
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Exam } from './Exam';

@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mail: string;

    @Column()
    password: string;

    @Column({
        default:false
    })
    active: boolean;

    @Column({
        default: 0
    })
    faculty_id: string;

    @Column({
        default: "01/01/1970"
    })
    last_login: String;

    @Column({
        default: "01/01/1970"
    })
    register_date: String;
    
    @Column()
    hash: string;


}
