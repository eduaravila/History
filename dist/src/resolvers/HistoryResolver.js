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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const HistorySchema_1 = require("../schema/HistorySchema");
const history_1 = require("../controllers/history");
let HistoryResolver = class HistoryResolver {
    addHistory(NewHistory, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield history_1.addHistory(NewHistory, ctx);
            return {
                msg,
                code: "200"
            };
        });
    }
    history(findInput) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield history_1.getHistory(findInput);
            return [...msg];
        });
    }
};
__decorate([
    type_graphql_1.Mutation(returns => HistorySchema_1.SuccessResponse),
    __param(0, type_graphql_1.Arg("NewHistory", () => HistorySchema_1.NewHistory)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HistorySchema_1.NewHistory, Object]),
    __metadata("design:returntype", Promise)
], HistoryResolver.prototype, "addHistory", null);
__decorate([
    type_graphql_1.Query(returns => [HistorySchema_1.History]),
    __param(0, type_graphql_1.Arg("findInput", () => HistorySchema_1.findInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HistorySchema_1.findInput]),
    __metadata("design:returntype", Promise)
], HistoryResolver.prototype, "history", null);
HistoryResolver = __decorate([
    type_graphql_1.Resolver(of => HistorySchema_1.History)
], HistoryResolver);
exports.HistoryResolver = HistoryResolver;
//# sourceMappingURL=HistoryResolver.js.map