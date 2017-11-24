import { createConnection, Connection } from 'typeorm';
import "reflect-metadata";


export class ConnectionClass {
    public static _instance;
    public static async getInstance(): Promise<Connection>{
        if (!ConnectionClass._instance)
        {
            ConnectionClass._instance= await createConnection({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "rootpassword",
                database: "SLZ_Klausurvorbereitung",
                entities: [
                    __dirname + "/../entity/*.js"
                ],
                synchronize: true,

            });
        }
        return ConnectionClass._instance;
        }
}





