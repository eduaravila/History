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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const class_transformer_1 = require("class-transformer");
const mongoose_1 = __importDefault(require("mongoose"));
const class_sanitizer_1 = require("class-sanitizer");
const CurrentChallengeSchema_1 = require("./CurrentChallengeSchema");
let toLowerCase = class toLowerCase {
    sanitize(text) {
        return text.toLowerCase();
    }
};
toLowerCase = __decorate([
    class_sanitizer_1.SanitizerConstraint()
], toLowerCase);
exports.toLowerCase = toLowerCase;
let SuccessResponse = class SuccessResponse {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], SuccessResponse.prototype, "msg", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], SuccessResponse.prototype, "code", void 0);
SuccessResponse = __decorate([
    type_graphql_1.ObjectType()
], SuccessResponse);
exports.SuccessResponse = SuccessResponse;
let Commentary = class Commentary {
};
__decorate([
    type_graphql_1.Directive("@external"),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Commentary.prototype, "_id", void 0);
Commentary = __decorate([
    type_graphql_1.Directive("@extends"),
    type_graphql_1.Directive(`@key(fields: "_id")`),
    type_graphql_1.ObjectType()
], Commentary);
exports.Commentary = Commentary;
let Points = class Points {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Points.prototype, "total", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Points.prototype, "after24", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Points.prototype, "rarity", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Points.prototype, "completed", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Points.prototype, "trophys", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Points.prototype, "experience", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], Points.prototype, "grade", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Points.prototype, "photos", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Points.prototype, "commentary", void 0);
Points = __decorate([
    type_graphql_1.ObjectType()
], Points);
exports.Points = Points;
let PointsInput = class PointsInput {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], PointsInput.prototype, "total", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], PointsInput.prototype, "after24", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], PointsInput.prototype, "rarity", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], PointsInput.prototype, "completed", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], PointsInput.prototype, "trophys", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], PointsInput.prototype, "experience", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], PointsInput.prototype, "grade", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], PointsInput.prototype, "photos", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], PointsInput.prototype, "commentary", void 0);
PointsInput = __decorate([
    type_graphql_1.InputType()
], PointsInput);
exports.PointsInput = PointsInput;
let NewHistory = class NewHistory {
};
__decorate([
    type_graphql_1.Field(type => [String], { nullable: true }),
    __metadata("design:type", Array)
], NewHistory.prototype, "media", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], NewHistory.prototype, "Challenge", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], NewHistory.prototype, "Commentary", void 0);
__decorate([
    type_graphql_1.Field(type => PointsInput),
    __metadata("design:type", PointsInput)
], NewHistory.prototype, "Points", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], NewHistory.prototype, "start_date", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], NewHistory.prototype, "total_time", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], NewHistory.prototype, "end_date", void 0);
NewHistory = __decorate([
    type_graphql_1.InputType()
], NewHistory);
exports.NewHistory = NewHistory;
let EditHistory = class EditHistory {
};
__decorate([
    type_graphql_1.Field(type => [String], { nullable: true }),
    __metadata("design:type", Array)
], EditHistory.prototype, "media", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], EditHistory.prototype, "Challenge", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], EditHistory.prototype, "User", void 0);
__decorate([
    type_graphql_1.Field(type => Points, { nullable: true }),
    __metadata("design:type", Points)
], EditHistory.prototype, "Points", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], EditHistory.prototype, "Commentary", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], EditHistory.prototype, "start_date", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], EditHistory.prototype, "end_date", void 0);
EditHistory = __decorate([
    type_graphql_1.InputType()
], EditHistory);
exports.EditHistory = EditHistory;
let ModifyHistory = class ModifyHistory extends EditHistory {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], ModifyHistory.prototype, "id", void 0);
ModifyHistory = __decorate([
    type_graphql_1.InputType({ description: "Modify an existing challenge" })
], ModifyHistory);
exports.ModifyHistory = ModifyHistory;
let History = class History {
};
__decorate([
    type_graphql_1.Field(type => String, { nullable: false }),
    __metadata("design:type", String)
], History.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(type => [String], { nullable: true }),
    __metadata("design:type", Array)
], History.prototype, "media", void 0);
__decorate([
    class_transformer_1.Type(() => CurrentChallengeSchema_1.Challenge),
    type_graphql_1.Field(),
    __metadata("design:type", CurrentChallengeSchema_1.Challenge)
], History.prototype, "Challenge", void 0);
__decorate([
    class_transformer_1.Type(() => CurrentChallengeSchema_1.User),
    type_graphql_1.Field(),
    __metadata("design:type", CurrentChallengeSchema_1.User)
], History.prototype, "User", void 0);
__decorate([
    class_transformer_1.Type(() => Commentary),
    type_graphql_1.Field(),
    __metadata("design:type", Commentary)
], History.prototype, "Commentary", void 0);
__decorate([
    type_graphql_1.Field(type => Points, { nullable: true }),
    __metadata("design:type", Points)
], History.prototype, "Points", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], History.prototype, "start_date", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], History.prototype, "end_date", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], History.prototype, "total_time", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], History.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], History.prototype, "updated_at", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], History.prototype, "updated_by", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], History.prototype, "created_by", void 0);
History = __decorate([
    type_graphql_1.ObjectType()
], History);
exports.History = History;
let findInput = class findInput {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], findInput.prototype, "page", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], findInput.prototype, "size", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true, defaultValue: "" }),
    class_sanitizer_1.Trim(),
    class_sanitizer_1.Sanitize(toLowerCase),
    __metadata("design:type", String)
], findInput.prototype, "search", void 0);
findInput = __decorate([
    type_graphql_1.InputType()
], findInput);
exports.findInput = findInput;
//# sourceMappingURL=HistorySchema.js.map