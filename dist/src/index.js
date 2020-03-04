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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const express_ip_1 = __importDefault(require("express-ip"));
const buildFederatedSchema_1 = require("./helpers/buildFederatedSchema");
const CurrentChallengeSchema_1 = require("./schema/CurrentChallengeSchema");
const autorized_1 = require("./utils/validator/autorized");
//?  decorators metadata
const index_1 = __importDefault(require("./DB/index"));
const HistoryResolver_1 = require("./resolvers/HistoryResolver");
const CurrentChallengeResolver_1 = require("./resolvers/CurrentChallengeResolver");
const PORT = process.env.PORT || "3000";
(() => __awaiter(this, void 0, void 0, function* () {
    try {
        // Initialize the app
        const app = express_1.default();
        app.use(express_ip_1.default().getIpInfoMiddleware); //* get the user location data
        const server = new apollo_server_express_1.ApolloServer({
            schema: yield buildFederatedSchema_1.buildFederatedSchema({
                resolvers: [HistoryResolver_1.HistoryResolver, CurrentChallengeResolver_1.CurrentChallengeResolver],
                orphanedTypes: [CurrentChallengeSchema_1.Challenge, CurrentChallengeSchema_1.User],
                authChecker: autorized_1.customAuthChecker
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