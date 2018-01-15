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
const Tips_1 = require("./../entity/Tips");
const ConnectionClass_1 = require("../class/ConnectionClass");
class TipController {
    getRandomTip() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield ConnectionClass_1.ConnectionClass.getInstance();
            let tip = new Tips_1.Tips;
            let tipRepo = connection.getRepository(Tips_1.Tips);
            let rndtipnumber = Math.floor(Math.random() * 10) + 1;
            let test = yield tipRepo.findOneById(rndtipnumber);
            return test;
        });
    }
}
exports.TipController = TipController;
//# sourceMappingURL=TipController.js.map