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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const ChallengeSchema_1 = require("../schema/ChallengeSchema");
const challenge_1 = require("../controllers/challenge");
let ChallengeResolver = class ChallengeResolver {
    AddChallenge(newChallenge, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield challenge_1.addChallenge(newChallenge, ctx);
            return {
                msg,
                code: "200"
            };
        });
    }
    challenges(findInput) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield challenge_1.getChallenges(findInput);
            return [...msg];
        });
    }
    DeleteChallenge(id, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield challenge_1.deleteChallenge({ id }, ctx);
            return {
                msg,
                code: "200"
            };
        });
    }
    ModifyChallenge(modifyChallengeInput, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield challenge_1.modifyChallenge(modifyChallengeInput, ctx);
            return {
                msg,
                code: "200"
            };
        });
    }
};
__decorate([
    type_graphql_1.Mutation(returns => ChallengeSchema_1.SuccessResponse, {
        description: "Admin query 🔏"
    }),
    __param(0, type_graphql_1.Arg("newChallenge", () => ChallengeSchema_1.NewChallenge)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ChallengeSchema_1.NewChallenge, Object]),
    __metadata("design:returntype", Promise)
], ChallengeResolver.prototype, "AddChallenge", null);
__decorate([
    type_graphql_1.Query(returns => [ChallengeSchema_1.Challenge]),
    __param(0, type_graphql_1.Arg("findInput", () => ChallengeSchema_1.findInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ChallengeSchema_1.findInput]),
    __metadata("design:returntype", Promise)
], ChallengeResolver.prototype, "challenges", null);
__decorate([
    type_graphql_1.Mutation(returns => ChallengeSchema_1.SuccessResponse, {
        description: "Admin query 🔏"
    }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.ID)), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ChallengeResolver.prototype, "DeleteChallenge", null);
__decorate([
    type_graphql_1.Mutation(returns => ChallengeSchema_1.SuccessResponse, {
        description: "Admin query 🔏"
    }),
    __param(0, type_graphql_1.Arg("ModifyChallenge", { nullable: true })),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ChallengeSchema_1.ModifyChallenge, Object]),
    __metadata("design:returntype", Promise)
], ChallengeResolver.prototype, "ModifyChallenge", null);
ChallengeResolver = __decorate([
    type_graphql_1.Resolver(of => ChallengeSchema_1.Challenge)
], ChallengeResolver);
exports.ChallengeResolver = ChallengeResolver;
//# sourceMappingURL=ChallengeResolver.js.map