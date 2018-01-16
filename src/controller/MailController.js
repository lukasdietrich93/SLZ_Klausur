"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { Istatus } from '../entity/Exam';
const ConnectionClass_1 = require("../class/ConnectionClass");
const Student_1 = require("../entity/Student");
require("reflect-metadata");
const sendmail = require('sendmail')();
class MailController {
    sendRegLink(receiver, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let studentRepo = connection.getRepository(Student_1.Student);
            const student = yield studentRepo.findOne({ mail: receiver });
            if (!student) {
                sendmail({
                    from: "Klausurplaner@Selbstlernzentrum.de",
                    to: receiver,
                    subject: "Registration SLZ Klausurplaner",
                    html: "Ihre Registrierung beim SLZ Klausurplaner war erfolgreich. Aktivieren sie ihr Konto mit folgendem Code: " + hash + " Bei Fragen antworten Sie nicht auf diese Mail sondern wenden Sie sich an das Selbstlernzentrum unter https://www.google.de",
                }, function (err, reply) {
                    console.log(err && err.stack);
                    console.dir(reply);
                });
                return 1;
            }
            else {
                return 0;
            }
        });
    }
}
exports.MailController = MailController;
//# sourceMappingURL=MailController.js.map