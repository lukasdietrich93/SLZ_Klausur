import { Tips } from './../entity/Tips';
import { Connection, createConnection } from "typeorm";
import { ConnectionClass } from '../class/ConnectionClass';

export class TipController{
    public async getRandomTip(){
        const connection: Connection = await ConnectionClass.getInstance();
        let tip = new Tips;
        let tipRepo = connection.getRepository(Tips);
        let rndtipnumber = Math.floor(Math.random() * 10)+1;
        let test = await tipRepo.findOneById(rndtipnumber);
        return test
    }
}