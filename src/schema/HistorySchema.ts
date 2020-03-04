import {
  ObjectType,
  Field,
  Directive,
  Int,
  InputType,
  registerEnumType,
  ID
} from "type-graphql";
import { Type } from "class-transformer";
import mongoose from "mongoose";
import {
  Trim,
  SanitizerConstraint,
  SanitizerInterface,
  Sanitize
} from "class-sanitizer";
import { Challenge, User } from "./CurrentChallengeSchema";
import challenge_model from "../models/history";

@SanitizerConstraint()
export class toLowerCase implements SanitizerInterface {
  sanitize(text: string): string {
    return text.toLowerCase();
  }
}

@ObjectType()
export class SuccessResponse {
  @Field(type => String)
  msg?: string;

  @Field(type => String)
  code?: string;
}

@Directive("@extends")
@Directive(`@key(fields: "_id")`)
@ObjectType()
export class Commentary {
  @Directive("@external")
  @Field()
  _id: string;
}

@ObjectType()
export class Points {
  @Field(type => Int, { nullable: true })
  total: number;

  @Field(type => Int, { nullable: true })
  after24: number;

  @Field(type => Int, { nullable: true })
  rarity: number;

  @Field(type => Int, { nullable: true })
  completed: number;

  @Field(type => Int, { nullable: true })
  trophys: number;

  @Field(type => Int, { nullable: true })
  experience: number;

  @Field(type => String, { nullable: true })
  grade: string;

  @Field(type => Int, { nullable: true })
  photos: number;

  @Field(type => Int, { nullable: true })
  commentary: number;
}

@InputType()
export class PointsInput {
  @Field(type => Int)
  total: number;

  @Field(type => Int)
  after24: number;

  @Field(type => Int)
  rarity: number;

  @Field(type => Int)
  completed: number;

  @Field(type => Int)
  trophys: number;

  @Field(type => Int)
  experience: number;

  @Field(type => String)
  grade: string;

  @Field(type => Int)
  photos: number;

  @Field(type => Int)
  commentary: number;
}

@InputType()
export class NewHistory {
  @Field(type => [String], { nullable: true })
  media: [string];

  @Field(type => String)
  Challenge: string;

  @Field(type => ID)
  Commentary: mongoose.Types.ObjectId;

  @Field(type => PointsInput)
  Points: PointsInput;

  @Field(type => String, { nullable: true })
  start_date: string;

  @Field(type => String, { nullable: true })
  total_time: string;

  @Field(type => String, { nullable: true })
  end_date: string;
}

@InputType()
export class EditHistory {
  @Field(type => [String], { nullable: true })
  media: [string];

  @Field(type => ID, { nullable: true })
  Challenge: mongoose.Types.ObjectId;

  @Field(type => ID, { nullable: true })
  User: mongoose.Types.ObjectId;

  @Field(type => Points, { nullable: true })
  Points: Points;

  @Field(type => ID, { nullable: true })
  Commentary: mongoose.Types.ObjectId;

  @Field(type => String, { nullable: true })
  start_date: string;

  @Field(type => String, { nullable: true })
  end_date: string;
}

@InputType({ description: "Modify an existing challenge" })
export class ModifyHistory extends EditHistory {
  @Field(type => ID)
  id: mongoose.Types.ObjectId;
}

@ObjectType()
export class History {
  @Field(type => String, { nullable: false })
  _id: string;

  @Field(type => [String], { nullable: true })
  media: [string];

  @Type(() => Challenge)
  @Field()
  Challenge: Challenge;

  @Type(() => User)
  @Field()
  User: User;

  @Type(() => Commentary)
  @Field()
  Commentary: Commentary;

  @Field(type => Points, { nullable: true })
  Points: Points;

  @Field(type => String, { nullable: true })
  start_date: string;

  @Field(type => String, { nullable: true })
  end_date: string;

  @Field(type => String, { nullable: true })
  total_time: string;

  @Field(type => String, { nullable: true })
  created_at: string;

  @Field(type => String, { nullable: true })
  updated_at: string;

  @Field(type => ID, { nullable: true })
  updated_by: mongoose.Types.ObjectId;

  @Field(type => ID, { nullable: true })
  created_by: mongoose.Types.ObjectId;
}

@InputType()
export class findInput {
  @Field(type => Int, { nullable: true })
  page: number;

  @Field(type => Int, { nullable: true })
  size: number;

  @Field(type => String, { nullable: true, defaultValue: "" })
  @Trim()
  @Sanitize(toLowerCase)
  search: string;
}
