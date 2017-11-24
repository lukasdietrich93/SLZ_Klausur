import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity()
export class Tips {

    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        content: string;

}