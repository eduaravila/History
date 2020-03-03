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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const class_transformer_1 = require("class-transformer");
const mongoose_1 = __importDefault(require("mongoose"));
const class_sanitizer_1 = require("class-sanitizer");
const challenge_1 = __importDefault(require("../models/challenge"));
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
let Arena = class Arena {
};
__decorate([
    type_graphql_1.Directive("@external"),
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], Arena.prototype, "_id", void 0);
Arena = __decorate([
    type_graphql_1.Directive("@extends"),
    type_graphql_1.Directive(`@key(fields: "_id")`),
    type_graphql_1.ObjectType()
], Arena);
exports.Arena = Arena;
var rarityEmun;
(function (rarityEmun) {
    rarityEmun["Normal"] = "normal";
    rarityEmun["Epic"] = "epic";
    rarityEmun["Legendary"] = "legendary";
})(rarityEmun || (rarityEmun = {}));
var gendreEmun;
(function (gendreEmun) {
    gendreEmun["Famele"] = "famele";
    gendreEmun["Male"] = "male";
    gendreEmun["Nobinary"] = "nobinary";
})(gendreEmun || (gendreEmun = {}));
type_graphql_1.registerEnumType(rarityEmun, {
    name: "rarityEmun"
});
type_graphql_1.registerEnumType(gendreEmun, {
    name: "gendreEmun"
});
let BadgesObject = class BadgesObject {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], BadgesObject.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], BadgesObject.prototype, "zone", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], BadgesObject.prototype, "rarity", void 0);
BadgesObject = __decorate([
    type_graphql_1.ObjectType()
], BadgesObject);
exports.BadgesObject = BadgesObject;
let BadgesObjectInput = class BadgesObjectInput {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], BadgesObjectInput.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], BadgesObjectInput.prototype, "zone", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], BadgesObjectInput.prototype, "rarity", void 0);
BadgesObjectInput = __decorate([
    type_graphql_1.InputType()
], BadgesObjectInput);
exports.BadgesObjectInput = BadgesObjectInput;
let NewChallenge = class NewChallenge {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], NewChallenge.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], NewChallenge.prototype, "subtitle", void 0);
__decorate([
    type_graphql_1.Field(type => BadgesObjectInput),
    __metadata("design:type", BadgesObjectInput)
], NewChallenge.prototype, "badges", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], NewChallenge.prototype, "points", void 0);
__decorate([
    type_graphql_1.Field(type => rarityEmun),
    __metadata("design:type", String)
], NewChallenge.prototype, "rarity", void 0);
__decorate([
    type_graphql_1.Field(type => [String]),
    __metadata("design:type", Array)
], NewChallenge.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], NewChallenge.prototype, "portrait", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], NewChallenge.prototype, "arena", void 0);
__decorate([
    type_graphql_1.Field(type => gendreEmun),
    __metadata("design:type", String)
], NewChallenge.prototype, "gendre", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], NewChallenge.prototype, "minAge", void 0);
NewChallenge = __decorate([
    type_graphql_1.InputType()
], NewChallenge);
exports.NewChallenge = NewChallenge;
let EditChallenge = class EditChallenge {
};
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], EditChallenge.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], EditChallenge.prototype, "subtitle", void 0);
__decorate([
    type_graphql_1.Field(type => BadgesObjectInput, { nullable: true }),
    __metadata("design:type", BadgesObjectInput)
], EditChallenge.prototype, "badges", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], EditChallenge.prototype, "points", void 0);
__decorate([
    type_graphql_1.Field(type => rarityEmun, { nullable: true }),
    __metadata("design:type", String)
], EditChallenge.prototype, "rarity", void 0);
__decorate([
    type_graphql_1.Field(type => [String], { nullable: true }),
    __metadata("design:type", Array)
], EditChallenge.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], EditChallenge.prototype, "portrait", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], EditChallenge.prototype, "arena", void 0);
__decorate([
    type_graphql_1.Field(type => gendreEmun, { nullable: true }),
    __metadata("design:type", String)
], EditChallenge.prototype, "gendre", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], EditChallenge.prototype, "minAge", void 0);
EditChallenge = __decorate([
    type_graphql_1.InputType()
], EditChallenge);
exports.EditChallenge = EditChallenge;
let ModifyChallenge = class ModifyChallenge extends EditChallenge {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], ModifyChallenge.prototype, "id", void 0);
ModifyChallenge = __decorate([
    type_graphql_1.InputType({ description: "Modify an existing challenge" })
], ModifyChallenge);
exports.ModifyChallenge = ModifyChallenge;
let Challenge = class Challenge {
};
__decorate([
    type_graphql_1.Field(type => String, { nullable: false }),
    __metadata("design:type", String)
], Challenge.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], Challenge.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], Challenge.prototype, "subtitle", void 0);
__decorate([
    type_graphql_1.Field(type => BadgesObject),
    __metadata("design:type", BadgesObject)
], Challenge.prototype, "badges", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], Challenge.prototype, "points", void 0);
__decorate([
    type_graphql_1.Field(type => rarityEmun, { nullable: true }),
    __metadata("design:type", String)
], Challenge.prototype, "rarity", void 0);
__decorate([
    type_graphql_1.Field(type => [String], { nullable: true }),
    __metadata("design:type", Array)
], Challenge.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], Challenge.prototype, "portrait", void 0);
__decorate([
    class_transformer_1.Type(() => Arena),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Arena)
], Challenge.prototype, "arena", void 0);
__decorate([
    type_graphql_1.Field(type => gendreEmun, { nullable: true }),
    __metadata("design:type", String)
], Challenge.prototype, "gendre", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Challenge.prototype, "minAge", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], Challenge.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], Challenge.prototype, "updated_at", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], Challenge.prototype, "updated_by", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], Challenge.prototype, "created_by", void 0);
Challenge = __decorate([
    type_graphql_1.Directive(`@key(fields:"_id")`),
    type_graphql_1.ObjectType()
], Challenge);
exports.Challenge = Challenge;
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
function resolveChallengeReference(reference) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield challenge_1.default.findOne({ _id: reference._id });
        return result;
    });
}
exports.resolveChallengeReference = resolveChallengeReference;
//# sourceMappingURL=ChallengeSchema.js.map