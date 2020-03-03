import mongoose, { Schema, mongo } from "mongoose";
import mongoose_delete from "mongoose-delete";
import bc from "bcrypt";
import moment from "moment";
import {
  HistoryModelType,
  HistoryModelStaticsType,
  CurrentChallengeModelType,
  CurrentChallengeModelStaticsType
} from "./types";

const CurrentChallenge_schema: Schema = new mongoose.Schema({
  Challenge: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  User: {
    type: mongoose.Types.ObjectId,
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

CurrentChallenge_schema.plugin(mongoose_delete, {
  deletedAt: true,
  indexFields: true,
  overrideMethods: true,
  deletedBy: true
});

const currentChallenge_model = mongoose.model<
  CurrentChallengeModelType,
  CurrentChallengeModelStaticsType
>("current_challenge", CurrentChallenge_schema);

export default currentChallenge_model;
