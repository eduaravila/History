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
let SuccessResponseTicket = class SuccessResponseTicket {
};
__decorate([
    type_graphql_1.Field(type => [String]),
    __metadata("design:type", Array)
], SuccessResponseTicket.prototype, "msg", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], SuccessResponseTicket.prototype, "token", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], SuccessResponseTicket.prototype, "code", void 0);
SuccessResponseTicket = __decorate([
    type_graphql_1.ObjectType()
], SuccessResponseTicket);
exports.SuccessResponseTicket = SuccessResponseTicket;
let SuccessResponseTicketSingle = class SuccessResponseTicketSingle {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], SuccessResponseTicketSingle.prototype, "msg", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], SuccessResponseTicketSingle.prototype, "token", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], SuccessResponseTicketSingle.prototype, "code", void 0);
SuccessResponseTicketSingle = __decorate([
    type_graphql_1.ObjectType()
], SuccessResponseTicketSingle);
exports.SuccessResponseTicketSingle = SuccessResponseTicketSingle;
let Challenge = class Challenge {
};
__decorate([
    type_graphql_1.Directive("@external"),
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], Challenge.prototype, "_id", void 0);
Challenge = __decorate([
    type_graphql_1.Directive("@extends"),
    type_graphql_1.Directive(`@key(fields: "_id")`),
    type_graphql_1.ObjectType()
], Challenge);
exports.Challenge = Challenge;
let User = class User {
};
__decorate([
    type_graphql_1.Directive("@external"),
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], User.prototype, "_id", void 0);
User = __decorate([
    type_graphql_1.Directive("@extends"),
    type_graphql_1.Directive(`@key(fields: "_id")`),
    type_graphql_1.ObjectType()
], User);
exports.User = User;
let NewCurrentChallenge = class NewCurrentChallenge {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], NewCurrentChallenge.prototype, "Challenge", void 0);
NewCurrentChallenge = __decorate([
    type_graphql_1.InputType()
], NewCurrentChallenge);
exports.NewCurrentChallenge = NewCurrentChallenge;
let EditCurrentChallenge = class EditCurrentChallenge {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], EditCurrentChallenge.prototype, "Challenge", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], EditCurrentChallenge.prototype, "User", void 0);
EditCurrentChallenge = __decorate([
    type_graphql_1.InputType()
], EditCurrentChallenge);
exports.EditCurrentChallenge = EditCurrentChallenge;
let ModifyCurrentChallenge = class ModifyCurrentChallenge extends EditCurrentChallenge {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], ModifyCurrentChallenge.prototype, "id", void 0);
ModifyCurrentChallenge = __decorate([
    type_graphql_1.InputType({ description: "Modify the existing current challenge" })
], ModifyCurrentChallenge);
exports.ModifyCurrentChallenge = ModifyCurrentChallenge;
let CurrentChallenge = class CurrentChallenge {
};
__decorate([
    type_graphql_1.Field(type => String, { nullable: false }),
    __metadata("design:type", String)
], CurrentChallenge.prototype, "_id", void 0);
__decorate([
    class_transformer_1.Type(() => Challenge),
    type_graphql_1.Field(),
    __metadata("design:type", Challenge)
], CurrentChallenge.prototype, "Challenge", void 0);
__decorate([
    class_transformer_1.Type(() => User),
    type_graphql_1.Field(),
    __metadata("design:type", User)
], CurrentChallenge.prototype, "User", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], CurrentChallenge.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], CurrentChallenge.prototype, "updated_at", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], CurrentChallenge.prototype, "updated_by", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], CurrentChallenge.prototype, "created_by", void 0);
CurrentChallenge = __decorate([
    type_graphql_1.ObjectType()
], CurrentChallenge);
exports.CurrentChallenge = CurrentChallenge;
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
//# sourceMappingURL=CurrentChallengeSchema.js.map