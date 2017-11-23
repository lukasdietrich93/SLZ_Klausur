"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
require("reflect-metadata");
var ConnectionClass = /** @class */ (function () {
    function ConnectionClass() {
        var connection = typeorm_1.createConnection({
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
    ConnectionClass.getInstance = function () {
        if (!ConnectionClass._instance) {
            return ConnectionClass._instance;
        }
        else {
            var connection = new ConnectionClass;
            return connection;
        }
    };
    return ConnectionClass;
}());
exports.ConnectionClass = ConnectionClass;
//# sourceMappingURL=ConnectionClass.js.map