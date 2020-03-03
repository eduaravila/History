"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_delete_1 = __importDefault(require("mongoose-delete"));
const moment_1 = __importDefault(require("moment"));
const Challenge_schema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    subtitle: {
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
    badges: {
        type: {
            type: mongoose_1.default.Types.ObjectId,
            required: true
        },
        zone: {
            type: mongoose_1.default.Types.ObjectId,
            required: true
        },
        rarity: {
            type: mongoose_1.default.Types.ObjectId,
            required: true
        }
    },
    points: {
        type: String,
        required: true
    },
    rarity: {
        type: String,
        default: "normal",
        enum: ["normal", "epic", "legendary"]
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
    },
    description: [
        {
            type: String,
            required: true
        }
    ],
    portrait: {
        type: String,
        required: true
    },
    arena: {
        type: mongoose_1.default.Types.ObjectId
    },
    gendre: {
        type: String,
        enum: ["famele", "male", "nobinary"]
    },
    minAge: {
        type: Number,
        required: true
    },
    location: {
        country: {
            type: String
        },
        region: {
            type: String
        },
        city: {
            type: String
        },
        timezone: {
            type: String
        },
        ll: {
            type: Array
        }
    }
});
Challenge_schema.plugin(mongoose_delete_1.default, {
    deletedAt: true,
    indexFields: true,
    overrideMethods: true,
    deletedBy: true
});
const challenge_model = mongoose_1.default.model("challenge", Challenge_schema);
exports.default = challenge_model;
//# sourceMappingURL=challenge.js.map