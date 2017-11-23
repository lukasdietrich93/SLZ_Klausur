import { createConnection } from 'typeorm';
import "reflect-metadata";


export class ConnectionClass {
    public static _instance;
    private constructor() {
        const connection = createConnection({
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
    }
        public static getInstance(){
            if (!ConnectionClass._instance){
                return ConnectionClass._instance;
            }else{
                let connection = new ConnectionClass;
                return connection;
            }
    }
}
    





