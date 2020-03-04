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
const moment_1 = __importDefault(require("moment"));
const apollo_server_express_1 = require("apollo-server-express");
const currentChallenge_1 = __importDefault(require("../models/currentChallenge"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const jwtTicket_1 = __importDefault(require("../utils/jwtTicket"));
exports.addCurrentChallenge = ({ Challenge }, ctx) => __awaiter(this, void 0, void 0, function* () {
    try {
        let token = ctx.req.headers.token;
        let localToken = yield jwt_1.default.validateToken(token, ctx.req.body.variables.publicKey);
        let tokenData = yield jwt_1.default.decrypt_data(localToken)();
        let newCurrentChallenge = new currentChallenge_1.default({
            Challenge,
            User: tokenData.userId,
            created_by: tokenData.userId,
            updated_by: tokenData.userId
        });
        yield newCurrentChallenge.save();
        return Promise.resolve(`${newCurrentChallenge._id} succesfully created`);
    }
    catch (error) {
        console.log(error);
        return new apollo_server_express_1.ApolloError(error);
    }
});
exports.getCurrentChallenges = ({ page = 0, size = 0, search }) => __awaiter(this, void 0, void 0, function* () {
    try {
        let offset = page * size;
        let limit = offset + size;
        let result = search.length > 0
            ? yield currentChallenge_1.default
                .find({
                $or: [
                    { User: { $regex: ".*" + search + ".*" } },
                    { _id: { $regex: ".*" + search + ".*" } }
                ]
            })
                .skip(offset)
                .limit(limit)
                .lean()
            : yield currentChallenge_1.default
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
exports.getCloseTicket = (ctx) => __awaiter(this, void 0, void 0, function* () {
    try {
        let token = ctx.req.headers.token;
        console.log(ctx.headers);
        let localToken = yield jwt_1.default.validateToken(token, ctx.req.body.variables.publicKey);
        let tokenData = yield jwt_1.default.decrypt_data(localToken)();
        //? the person requesting the ticket is the same that created the ticket
        let ticketFromChallengeInfo = yield currentChallenge_1.default.findOne({
            $and: [{ User: tokenData.userId }, { created_by: tokenData.userId }]
        });
        let ticketFromChallenge = yield currentChallenge_1.default.delete({ $and: [{ User: tokenData.userId }, { created_by: tokenData.userId }] }, tokenData.userId);
        console.log(ticketFromChallengeInfo);
        // * sets the reward for uploading files to the ecolote server
        let ticketToken = new jwtTicket_1.default({
            Challenge: ticketFromChallengeInfo.Challenge.toString(),
            userId: tokenData.userId,
            created_at: ticketFromChallengeInfo.created_at,
            closed_at: moment_1.default().format("YYYY-MM-DD/HH:mm:ZZ")
        });
        yield ticketToken.create_token("1h");
        console.log(ticketToken);
        return Promise.resolve({
            msg: `${ticketFromChallengeInfo.Challenge} succesfully closed`,
            code: "200",
            token: ticketToken.token
        });
    }
    catch (error) {
        console.log(error);
        new apollo_server_express_1.ApolloError(error);
    }
});
exports.modifyCurrentChallenge = ({ Challenge, User, id }, ctx) => __awaiter(this, void 0, void 0, function* () {
    try {
        let updatedCurrentChallenge = yield currentChallenge_1.default.findByIdAndUpdate(id, {
            Challenge,
            User,
            updated_at: moment_1.default().format("YYYY-MM-DD/HH:mm:ZZ")
        }, { omitUndefined: true });
        return Promise.resolve(`${updatedCurrentChallenge._id} succesfully updated`);
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError(error);
    }
});
//# sourceMappingURL=currentChallenge.js.map