import { Tips } from './../entity/Tips';
import { Connection, createConnection } from "typeorm";
import { ConnectionClass } from '../class/ConnectionClass';

export class TipController{
    public async getRandomTip(){
        const connection: Connection = await ConnectionClass.getInstance();
        let tipRepo = connection.getRepository(Tips);
        let rndtipnumber = Math.random()*(10-1)+1;
        return (await tipRepo.findOneById(rndtipnumber)).content;
    }
}