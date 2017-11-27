"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const LoginController_1 = require("./controller/LoginController");
const TipController_1 = require("./controller/TipController");
let Login = new LoginController_1.LoginController();
Login.createLogin("12345", "testpwd", 4444);
Login.createExam("testexam", "30/01/1999", 500, 250, 3);
let RndTip = new TipController_1.TipController();
// RndTip.getRandomTip();
Login.login();
//# sourceMappingURL=index.js.map