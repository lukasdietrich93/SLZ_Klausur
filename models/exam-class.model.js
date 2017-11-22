"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Iresult_status;
(function (Iresult_status) {
    Iresult_status["checked"] = "4.0";
})(Iresult_status = exports.Iresult_status || (exports.Iresult_status = {}));
var Ireminder_status;
(function (Ireminder_status) {
    Ireminder_status["checked"] = "remind";
})(Ireminder_status = exports.Ireminder_status || (exports.Ireminder_status = {}));
var Istatus;
(function (Istatus) {
    Istatus["checked"] = "deleted";
})(Istatus = exports.Istatus || (exports.Istatus = {}));
var Exam = /** @class */ (function () {
    function Exam(id, name, date, total_hours, spent_hours) {
        ExamCreate;
    }
    return Exam;
}());
exports.Exam = Exam;
var ExamCreate = /** @class */ (function (_super) {
    __extends(ExamCreate, _super);
    function ExamCreate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExamCreate.prototype.createExam = function (id, name, date, total_hours, spent_hours) {
        var result = new Exam(id, name, date, total_hours, spent_hours);
        console.log(result);
        return result;
    };
    return ExamCreate;
}(Exam));
