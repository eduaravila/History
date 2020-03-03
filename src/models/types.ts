import mongoose, { Model } from "mongoose";
import {
  SoftDeleteDocument,
  SoftDeleteInterface,
  SoftDeleteModel
} from "mongoose-delete";

export interface HistoryModelType
  extends mongoose.Document,
    SoftDeleteDocument {
  media: [string];
  Challenge: {
    _id: mongoose.Types.ObjectId;
  };
  User: {
    _id: mongoose.Types.ObjectId;
  };
  Commentary: {
    _id: mongoose.Types.ObjectId;
  };
  
  Points: {
    total: number;
    after24: number;
    rarity: number;
    completed: number;
    trophys: number;
    experience: number;
    grade: number;
    photos: number;
    commentary: number;
  };
  start_date: string;
  end_date: string;
  total_time: string;
  created_by: mongoose.Types.ObjectId;
  updated_by: mongoose.Types.ObjectId;

  created_at: string;
  updated_at: string;
}

export interface HistoryModelStaticsType
  extends SoftDeleteModel<HistoryModelType> {}

export interface CurrentChallengeModelType
  extends mongoose.Document,
    SoftDeleteDocument {
  Challenge: {
    _id: mongoose.Types.ObjectId;
  };
  User: {
    _id: mongoose.Types.ObjectId;
  };
  created_by: mongoose.Types.ObjectId;
  updated_by: mongoose.Types.ObjectId;
  created_at: string;
  updated_at: string;
}

export interface CurrentChallengeModelStaticsType
  extends SoftDeleteModel<CurrentChallengeModelType> {}
