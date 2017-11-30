import { Email } from 'sendmail';
import "reflect-metadata";


export class MailServer {
    public static _instance;
    public static async getInstance(): Email {
        if (!MailServer._instance) {
            MailServer._instance = await new Email({
            });
        }
        return  MailServer._instance;
    }
}





