"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_delete_1 = __importDefault(require("mongoose-delete"));
const moment_1 = __importDefault(require("moment"));
const CurrentChallenge_schema = new mongoose_1.default.Schema({
    Challenge: {
        type: mongoose_1.default.Types.ObjectId,
        required: true
    },
    User: {
        type: mongoose_1.default.Types.ObjectId,
        required: true
    },
    created_by: {
        type: mongoose_1.default.Types.ObjectId,
        required: true
    },
    updated_by: {
        type: mongoose_1.default.Types.ObjectId,
        required: true
    },
    created_at: {
        type: String,
        required: true,
        default: moment_1.default().format("YYYY-MM-DD/HH:mm:ZZ")
    },
    updated_at: {
        type: String,
        required: true,
        default: moment_1.default().format("YYYY-MM-DD/HH:mm:ZZ")
    }
});
CurrentChallenge_schema.plugin(mongoose_delete_1.default, {
    deletedAt: true,
    indexFields: true,
    overrideMethods: true,
    deletedBy: true
});
const currentChallenge_model = mongoose_1.default.model("current_challenge", CurrentChallenge_schema);
exports.default = currentChallenge_model;
//# sourceMappingURL=currentChallenge.js.map