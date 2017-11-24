"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
require("reflect-metadata");
var ConnectionClass = /** @class */ (function () {
    function ConnectionClass() {
    }
    ConnectionClass.createInstance = function () {
        ConnectionClass._instance = typeorm_1.createConnection({
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
    };
    ConnectionClass.getInstance = function () {
        if (!ConnectionClass._instance) {
            ConnectionClass._instance = ConnectionClass.createInstance();
        }
        return ConnectionClass._instance;
    };
    return ConnectionClass;
}());
exports.ConnectionClass = ConnectionClass;
//# sourceMappingURL=ConnectionClass.js.map