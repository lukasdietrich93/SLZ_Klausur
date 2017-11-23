import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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
    faculty_id: number;

    @Column({
        default: "01/01/1970"
    })
    last_login: String;

    @Column({
        default: "01/01/1970"
    })
    register_date: String;

}
