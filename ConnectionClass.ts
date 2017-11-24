import { createConnection } from 'typeorm';
import "reflect-metadata";


export class ConnectionClass {
    public static _instance;
    public static createInstance(){
        ConnectionClass._instance= createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "rootpassword",
            database: "SLZ_Klausurvorbereitung",
            entities: [
                __dirname + "/entity/*.js"
            ],
            synchronize: true,
            
        });
        return ConnectionClass._instance;
    }
    public static getInstance(){
        if (!ConnectionClass._instance)
        {
            ConnectionClass._instance = ConnectionClass.createInstance();
        }
        return ConnectionClass._instance;
        }
}    





