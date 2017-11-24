import { Tips } from './../entity/Tips';
import { Connection, createConnection } from "typeorm";
import { ConnectionClass } from '../class/ConnectionClass';

export class TipController{
    public async getRandomTip(){
        const connection: Connection = await ConnectionClass.getInstance();
        let tipRepo = connection.getRepository(Tips);

        let [allTips,allTipsNumber] = await tipRepo.findAndCount();
        var rndtipnumber = Math.floor(Math.random()*(allTipsNumber))+1;
        let  rndtip = await tipRepo.findOneById(rndtipnumber)
        //parse string into html tag
        console.log(rndtip.content);
        return rndtip.content;
    }
}