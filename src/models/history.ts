import mongoose, { Schema, mongo } from "mongoose";
import mongoose_delete from "mongoose-delete";
import bc from "bcrypt";
import moment from "moment";
import { HistoryModelType, HistoryModelStaticsType } from "./types";

const History_schema: Schema = new mongoose.Schema({
  media: [
    {
      type: String,
      required: true,
      unique: true
    }
  ],
  Challenge: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  User: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  Commentary: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  Points: {
    total: { type: Number, required: true },
    after24: { type: Number, required: true },
    rarity: { type: Number, required: true },
    completed: { type: Number, required: true },
    trophys: { type: Number, required: true },
    experience: { type: Number, required: true },
    grade: { type: Number, required: true },
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
    type: mongoose.Types.ObjectId,
    required: true
  },
  updated_by: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  created_at: {
    type: String,
    required: true,
    default: moment().format("YYYY-MM-DD/HH:mm:ZZ")
  },
  updated_at: {
    type: String,
    required: true,
    default: moment().format("YYYY-MM-DD/HH:mm:ZZ")
  }
});

History_schema.plugin(mongoose_delete, {
  deletedAt: true,
  indexFields: true,
  overrideMethods: true,
  deletedBy: true
});

const history_model = mongoose.model<HistoryModelType, HistoryModelStaticsType>(
  "challenge",
  History_schema
);

export default history_model;
