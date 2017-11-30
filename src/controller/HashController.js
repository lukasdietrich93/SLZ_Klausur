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
const Student_1 = require("./../entity/Student");
const HashNo_1 = require("./../entity/HashNo");
const ConnectionClass_1 = require("../class/ConnectionClass");
class HashNoController {
    saveAndReturnHash() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let hashRepo = connection.getRepository(HashNo_1.HashNo);
            let hash = new HashNo_1.HashNo;
            hash.hash = Math.random().toString(36).substring(7);
            yield hashRepo.save(hash);
            return yield hash.hash;
        });
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
    activateAccount(mail, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let studentRepo = yield connection.getRepository(Student_1.Student);
            let studentToActivate = studentRepo.find();
            for (mail of yield Object.keys(studentToActivate)) {
                console.log(mail);
            }
        });
    }
}
exports.HashNoController = HashNoController;
//# sourceMappingURL=HashController.js.map