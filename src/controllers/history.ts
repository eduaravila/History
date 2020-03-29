import moment from "moment";
import { ApolloError } from "apollo-server-express";
import mongoose from "mongoose";
import historyModel from "../models/history";
import Jwt from "../utils/jwt";
import jwtTicket from "../utils/jwtTicket";
import { NewHistory } from "../schema/HistorySchema";
import { findInput } from "../schema/CurrentChallengeSchema";

export const addHistory = async (
  {
    Challenge,
    Commentary,
    media,
    Points,
    end_date,
    start_date,
    total_time
  }: NewHistory,
  ctx: any
) => {
  try {
    let token = ctx.req.headers.token;

    let localToken = await Jwt.validateToken(
      token,
      ctx.req.body.variables.publicKey
    );

    let tokenData: any = await Jwt.decrypt_data(localToken)();

    let newCurrentChallenge = await historyModel.findOneAndUpdate(
      { Challenge: { _id: mongoose.Types.ObjectId(Challenge) } },
      {
        Challenge: Challenge,
        User: tokenData.userId,
        Commentary: Commentary ? Commentary : null,
        Points,
        media: media ? media : null,
        created_by: tokenData.userId,
        updated_by: tokenData.userId,
        start_date,
        end_date,
        total_time
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    );

    return Promise.resolve(`${newCurrentChallenge._id} succesfully created`);
  } catch (error) {
    console.log(error);

    return new ApolloError(error);
  }
};

export const getHistory = async ({
  page = 0,
  size = 0,
  search = ""
}: findInput) => {
  try {
    let offset = page * size;
    let limit = offset + size;

    let result =
      search.length > 0
        ? await historyModel
            .find({
              _id: { $regex: ".*" + search + ".*" }
            })
            .skip(offset)
            .limit(limit)
            .lean()
        : await historyModel
            .find({})
            .skip(offset)
            .limit(limit)
            .lean();

    return Promise.resolve(result);
  } catch (error) {
    new ApolloError(error);
  }
};

export const getCompletedChallenges = async (props: findInput, ctx: any) => {
  try {
    let token = ctx.req.headers.token;

    let localToken = await Jwt.validateToken(
      token,
      ctx.req.body.variables.publicKey
    );

    let tokenData: any = await Jwt.decrypt_data(localToken)();

    if (props) {
      let { page = 0, size = 1, search } = props;
      let offset = page * size;
      let limit = offset + size;
      let result = await historyModel
        .find({
          User: tokenData.userId
        })
        .skip(offset)
        .limit(limit)
        .lean();
      return Promise.resolve(result);
    } else {
      let result = await historyModel
        .find({
          User: tokenData.userId
        })
        .lean();

      return Promise.resolve(result);
    }
  } catch (error) {
    new ApolloError(error);
  }
};
