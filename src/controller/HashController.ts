import { Student } from './../entity/Student';
import { HashNo } from './../entity/HashNo';
import { Connection, createConnection } from "typeorm";
import { ConnectionClass } from '../class/ConnectionClass';
import { connect } from 'tls';

export class HashNoController{
    public async saveAndReturnHash(){
        const connection: Connection = await ConnectionClass.getInstance();
        let hashRepo = connection.getRepository(HashNo);
        let hash = new HashNo;
        hash.hash=Math.random().toString(36).substring(7);
        await hashRepo.save(hash);
        return await hash.hash;
    }
    /*
    
    public async deleteHash(ctx: Router.IRouterContext, next: any){
    const connection: Connection = await ConnectionClass.getInstance();
    let hashRepo = connection.getRepository(HashNo);
    let studentRepo = connection.getRepository(Student);
    if (studenthash = hash){
            let hashremove = await hashRepo.findOneById(hashid);
            await hashRepo.remove(hashremove);
            let studentactive = await studentRepo.findOneById(studentid);
            studentactive.active = true;
            await studentRepo.save(studentactive);
        }
        return;
    } */
    public async activateAccount(mail: string, hash: string){
        const connection: Connection = await ConnectionClass.getInstance();
        let studentRepo = await connection.getRepository(Student);
        let studentToActivate = studentRepo.find();
        for (mail of await Object.keys(studentToActivate)){
            console.log(mail);
        } 
    }
}