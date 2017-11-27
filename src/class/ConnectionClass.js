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
const typeorm_1 = require("typeorm");
require("reflect-metadata");
class ConnectionClass {
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ConnectionClass._instance) {
                ConnectionClass._instance = yield typeorm_1.createConnection({
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
        });
    }
}
exports.ConnectionClass = ConnectionClass;
//# sourceMappingURL=ConnectionClass.js.map