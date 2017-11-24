"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var LoginController_1 = require("./controller/LoginController");
var TipController_1 = require("./controller/TipController");
var Login = new LoginController_1.LoginController();
Login.createLogin("12345", "testpwd", 4444);
Login.createExam("testexam", "30/01/1999", 500, 250, 3);
var RndTip = new TipController_1.TipController();
RndTip.getRandomTip();
//# sourceMappingURL=index.js.map