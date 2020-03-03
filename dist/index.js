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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const buildFederatedSchema_1 = require("./helpers/buildFederatedSchema");
const ChallengeSchema_1 = require("./schema/ChallengeSchema");
const express_ip_1 = __importDefault(require("express-ip"));
//?  decorators metadata
const index_1 = __importDefault(require("./DB/index"));
const ChallengeResolver_1 = require("./resolvers/ChallengeResolver");
const PORT = process.env.PORT || "3000";
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Initialize the app
        const app = express_1.default();
        app.use(express_ip_1.default().getIpInfoMiddleware); //* get the user location data
        const server = new apollo_server_express_1.ApolloServer({
            schema: yield buildFederatedSchema_1.buildFederatedSchema({
                resolvers: [ChallengeResolver_1.ChallengeResolver],
                orphanedTypes: [ChallengeSchema_1.Arena, ChallengeSchema_1.Challenge]
            }, {
                Challenge: { __resolveReference: ChallengeSchema_1.resolveChallengeReference }
            }),
            context: req => req,
            formatError: err => {
                return err;
            }
        });
        // The GraphQL endpoint
        server.applyMiddleware({ app, path: "/graphql" });
        // Start the server
        yield index_1.default();
        app.listen(PORT, () => {
            console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
        });
    }
    catch (error) {
        console.log(error);
    }
}))();
//# sourceMappingURL=index.js.map