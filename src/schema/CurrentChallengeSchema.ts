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

@ObjectType()
export class SuccessResponseTicket {
  @Field(type => [String])
  msg?: [string];

  @Field(type => String)
  token?: string;

  @Field(type => String)
  code?: string;
}

@ObjectType()
export class SuccessResponseTicketSingle {
  @Field(type => String)
  msg?: string;

  @Field(type => String)
  token?: string;

  @Field(type => String)
  code?: string;
}

@Directive("@extends")
@Directive(`@key(fields: "_id")`)
@ObjectType()
export class Challenge {
  @Directive("@external")
  @Field(type => ID)
  _id: mongoose.Types.ObjectId;
}

@Directive("@extends")
@Directive(`@key(fields: "_id")`)
@ObjectType()
export class User {
  @Directive("@external")
  @Field(type => ID)
  _id: mongoose.Types.ObjectId;
}

@InputType()
export class NewCurrentChallenge {
  @Field(type => ID)
  Challenge: mongoose.Types.ObjectId;
}

@InputType()
export class EditCurrentChallenge {
  @Field(type => ID)
  Challenge: mongoose.Types.ObjectId;

  @Field(type => ID)
  User: mongoose.Types.ObjectId;
}

@InputType({ description: "Modify the existing current challenge" })
export class ModifyCurrentChallenge extends EditCurrentChallenge {
  @Field(type => ID)
  id: mongoose.Types.ObjectId;
}

@ObjectType()
export class CurrentChallenge {
  @Field(type => String, { nullable: false })
  _id: string;

  @Type(() => Challenge)
  @Field()
  Challenge: Challenge;

  @Type(() => User)
  @Field()
  User: User;

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
