"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const history_1 = __importDefault(require("../models/history"));
const jwt_1 = __importDefault(require("../utils/jwt"));
exports.addHistory = ({ Challenge, Commentary, media, Points, end_date, start_date, total_time }, ctx) => __awaiter(this, void 0, void 0, function* () {
    try {
        let token = ctx.req.headers.token;
        let localToken = yield jwt_1.default.validateToken(token, ctx.req.body.variables.publicKey);
        let tokenData = yield jwt_1.default.decrypt_data(localToken)();
        let newCurrentChallenge = new history_1.default({
            Challenge: Challenge,
            User: tokenData.userId,
            Commentary,
            Points,
            media,
            created_by: tokenData.userId,
            updated_by: tokenData.userId,
            start_date,
            end_date,
            total_time
        });
        yield newCurrentChallenge.save();
        return Promise.resolve(`${newCurrentChallenge._id} succesfully created`);
    }
    catch (error) {
        console.log(error);
        return new apollo_server_express_1.ApolloError(error);
    }
});
exports.getHistory = ({ page = 0, size = 0, search }) => __awaiter(this, void 0, void 0, function* () {
    try {
        let offset = page * size;
        let limit = offset + size;
        let result = search.length > 0
            ? yield history_1.default
                .find({
                $or: [
                    { User: { $regex: ".*" + search + ".*" } },
                    { _id: { $regex: ".*" + search + ".*" } }
                ]
            })
                .skip(offset)
                .limit(limit)
                .lean()
            : yield history_1.default
                .find({})
                .skip(offset)
                .limit(limit)
                .lean();
        return Promise.resolve(result);
    }
    catch (error) {
        new apollo_server_express_1.ApolloError(error);
    }
});
exports.getCompletedChallenges = (ctx) => __awaiter(this, void 0, void 0, function* () {
    try {
        let token = ctx.req.headers.token;
        let localToken = yield jwt_1.default.validateToken(token, ctx.req.body.variables.publicKey);
        let tokenData = yield jwt_1.default.decrypt_data(localToken)();
        let result = yield history_1.default
            .find({
            User: tokenData.userId
        })
            .lean();
        return Promise.resolve(result);
    }
    catch (error) {
        new apollo_server_express_1.ApolloError(error);
    }
});
//# sourceMappingURL=history.js.map