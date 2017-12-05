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
var Istatus;
(function (Istatus) {
    Istatus[Istatus["EXAM_DELETED"] = 0] = "EXAM_DELETED";
    Istatus[Istatus["EXAM_ARCHIVED"] = 1] = "EXAM_ARCHIVED";
    Istatus[Istatus["EXAM_WAITING"] = 2] = "EXAM_WAITING";
    Istatus[Istatus["EXAM_UPCOMING"] = 3] = "EXAM_UPCOMING";
})(Istatus = exports.Istatus || (exports.Istatus = {}));
let Archive = class Archive {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Archive.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Archive.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Archive.prototype, "date", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Archive.prototype, "total_hours", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Archive.prototype, "spent_hours", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Archive.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({
        default: false
    }),
    __metadata("design:type", Boolean)
], Archive.prototype, "result_status", void 0);
__decorate([
    typeorm_1.Column({
        default: false
    }),
    __metadata("design:type", Boolean)
], Archive.prototype, "reminder_status", void 0);
Archive = __decorate([
    typeorm_1.Entity()
], Archive);
exports.Archive = Archive;
//# sourceMappingURL=Archive.js.map