"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Student_1 = require("./Student");
var Istatus;
(function (Istatus) {
    Istatus[Istatus["EXAM_DELETED"] = 0] = "EXAM_DELETED";
    Istatus[Istatus["EXAM_ARCHIVED"] = 1] = "EXAM_ARCHIVED";
    Istatus[Istatus["EXAM_WAITING"] = 2] = "EXAM_WAITING";
    Istatus[Istatus["EXAM_UPCOMING"] = 3] = "EXAM_UPCOMING";
})(Istatus = exports.Istatus || (exports.Istatus = {}));
let Exam = class Exam {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Exam.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Exam.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Exam.prototype, "date", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Exam.prototype, "total_hours", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Exam.prototype, "spent_hours", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Exam.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({
        default: false
    }),
    __metadata("design:type", Boolean)
], Exam.prototype, "result_status", void 0);
__decorate([
    typeorm_1.Column({
        default: false
    }),
    __metadata("design:type", Boolean)
], Exam.prototype, "reminder_status", void 0);
__decorate([
    typeorm_1.OneToOne(type => Student_1.Student),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Student_1.Student)
], Exam.prototype, "student", void 0);
Exam = __decorate([
    typeorm_1.Entity()
], Exam);
exports.Exam = Exam;
//# sourceMappingURL=Exam.js.map