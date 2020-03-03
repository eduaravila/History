"use strict";
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
const moment_1 = __importDefault(require("moment"));
const apollo_server_express_1 = require("apollo-server-express");
const challenge_1 = __importDefault(require("../models/challenge"));
const jwtAdmin_1 = __importDefault(require("../utils/jwtAdmin"));
const crypt_1 = require("../utils/crypt");
exports.addChallenge = ({ title, subtitle, badges, points, rarity, description, portrait, arena, gendre, minAge }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = ctx.req.headers.token;
        let localToken = yield jwtAdmin_1.default.validateToken(token);
        let tokenData = yield jwtAdmin_1.default.decrypt_data(localToken)();
        if (ctx.req.ipInfo.error) {
            ctx.req.ipInfo = {};
        }
        let { country = "", region = "", city = "", timezone = "", ll = [] } = ctx.req.ipInfo;
        let cripted_points = crypt_1.encrypt(points.toString());
        let newChallenge = new challenge_1.default({
            title,
            subtitle,
            badges,
            points: cripted_points,
            rarity,
            created_by: tokenData.userId,
            updated_by: tokenData.userId,
            description,
            portrait,
            arena,
            gendre,
            minAge,
            location: {
                country,
                region,
                city,
                timezone,
                ll
            }
        });
        yield newChallenge.save();
        return Promise.resolve(`${newChallenge._id} succesfully created`);
    }
    catch (error) {
        console.log(error);
        return new apollo_server_express_1.ApolloError(error);
    }
});
exports.getChallenges = ({ page = 0, size = 0, search }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let offset = page * size;
        let limit = offset + size;
        let result = search.length > 0
            ? yield challenge_1.default
                .find({
                $or: [
                    { title: { $regex: ".*" + search + ".*" } },
                    { _id: { $regex: ".*" + search + ".*" } },
                    { arena: { $regex: ".*" + search + ".*" } }
                ]
            })
                .skip(offset)
                .limit(limit)
                .lean()
            : yield challenge_1.default
                .find({})
                .skip(offset)
                .limit(limit)
                .lean();
        let descripted_result = result.map(i => (Object.assign(Object.assign({}, i), { points: crypt_1.decrypt(i.points) })));
        return Promise.resolve(descripted_result);
    }
    catch (error) {
        new apollo_server_express_1.ApolloError(error);
    }
});
exports.deleteChallenge = ({ id }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = ctx.req.headers.token;
        let localToken = yield jwtAdmin_1.default.validateToken(token);
        let tokenData = yield jwtAdmin_1.default.decrypt_data(localToken)();
        let deletedChallenge = yield challenge_1.default.delete({ $and: [{ _id: id }, { created_by: tokenData.userId }] }, tokenData.userId);
        return Promise.resolve(`${deletedChallenge._id} succesfully created`);
    }
    catch (error) {
        new apollo_server_express_1.ApolloError(error);
    }
});
exports.modifyChallenge = ({ id, title, subtitle, badges, points, rarity, description, portrait, arena, gendre, minAge }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (ctx.req.ipInfo.error) {
            ctx.req.ipInfo = {};
        }
        let { country = "", region = "", city = "", timezone = "", ll = [] } = ctx.req.ipInfo;
        let token = ctx.req.headers.token;
        let localToken = yield jwtAdmin_1.default.validateToken(token);
        let tokenData = yield jwtAdmin_1.default.decrypt_data(localToken)();
        let pointsEncripted = points ? crypt_1.encrypt(points.toString()) : undefined;
        let updatedChallenge = yield challenge_1.default.findByIdAndUpdate(id, {
            title,
            subtitle,
            badges,
            points: pointsEncripted,
            rarity,
            created_by: tokenData.userId,
            updated_by: tokenData.userId,
            description,
            portrait,
            arena,
            gendre,
            minAge,
            updated_at: moment_1.default().format("YYYY-MM-DD/HH:mm:ZZ"),
            location: {
                country,
                region,
                city,
                timezone,
                ll
            }
        }, { omitUndefined: true });
        return Promise.resolve(`${updatedChallenge._id} succesfully updated`);
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError(error);
    }
});
//# sourceMappingURL=challenge.js.map