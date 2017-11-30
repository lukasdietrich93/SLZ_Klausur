import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity()
export class HashNo {

    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        hash: string;

}