"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_delete_1 = __importDefault(require("mongoose-delete"));
const moment_1 = __importDefault(require("moment"));
const History_schema = new mongoose_1.default.Schema({
    media: [
        {
            type: String,
            required: true,
            unique: true
        }
    ],
    Challenge: {
        type: mongoose_1.default.Types.ObjectId,
        required: true
    },
    User: {
        type: mongoose_1.default.Types.ObjectId,
        required: true
    },
    Commentary: {
        type: mongoose_1.default.Types.ObjectId,
        required: true
    },
    Points: {
        total: { type: Number, required: true },
        after24: { type: Number, required: true },
        rarity: { type: Number, required: true },
        completed: { type: Number, required: true },
        trophys: { type: Number, required: true },
        experience: { type: Number, required: true },
        grade: { type: String, required: true },
        photos: { type: Number, required: true },
        commentary: { type: Number, required: true }
    },
    start_date: {
        type: String,
        required: true
    },
    end_date: {
        type: String,
        required: true
    },
    total_time: {
        type: String,
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
History_schema.plugin(mongoose_delete_1.default, {
    deletedAt: true,
    indexFields: true,
    overrideMethods: true,
    deletedBy: true
});
const history_model = mongoose_1.default.model("challenge", History_schema);
exports.default = history_model;
//# sourceMappingURL=history.js.map