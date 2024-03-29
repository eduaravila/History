import moment from "moment";
import { ApolloError } from "apollo-server-express";

import currentChallengeModel from "../models/currentChallenge";
import {
  NewCurrentChallenge,
  findInput,
  ModifyCurrentChallenge
} from "../schema/CurrentChallengeSchema";
import JwtAdmin from "../utils/jwtAdmin";
import Jwt from "../utils/jwt";
import jwtTicket from "../utils/jwtTicket";
import { decrypt, encrypt } from "../utils/crypt";

export const addCurrentChallenge = async (
  { Challenge }: NewCurrentChallenge,
  ctx: any
) => {
  try {
    let token = ctx.req.headers.token;

    let localToken = await Jwt.validateToken(
      token,
      ctx.req.body.variables.publicKey
    );

    let tokenData: any = await Jwt.decrypt_data(localToken)();

    let newCurrentChallenge = await currentChallengeModel.findOneAndUpdate(
      { User: tokenData.userId },
      {
        Challenge,
        User: tokenData.userId,
        created_by: tokenData.userId,
        updated_by: tokenData.userId,
        created_at: moment().format("YYYY-MM-DD/HH:mm:ZZ")
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    );

    return Promise.resolve(`${tokenData.userId} succesfully created`);
  } catch (error) {
    console.log(error);

    return new ApolloError(error);
  }
};

export const getCurrentChallenges = async ({
  page = 0,
  size = 0,
  search
}: findInput) => {
  try {
    let offset = page * size;
    let limit = offset + size;

    let result =
      search.length > 0
        ? await currentChallengeModel
            .find({
              _id: { $regex: ".*" + search + ".*" }
            })
            .skip(offset)
            .limit(limit)
            .lean()
        : await currentChallengeModel
            .find({})
            .skip(offset)
            .limit(limit)
            .lean();

    return Promise.resolve(result);
  } catch (error) {
    new ApolloError(error);
  }
};

export const getCloseTicket = async (lastChallenge: string, ctx: any) => {
  try {
    let token = ctx.req.headers.token;
    console.log(ctx.headers);

    let localToken = await Jwt.validateToken(
      token,
      ctx.req.body.variables.publicKey
    );

    let tokenData: any = await Jwt.decrypt_data(localToken)();

    //? the person requesting the ticket is the same that created the ticket
    let ticketFromChallengeInfo = lastChallenge
      ? await currentChallengeModel.findOneWithDeleted({
          $and: [
            { User: tokenData.userId },
            { created_by: tokenData.userId },
            { Challenge: lastChallenge }
          ]
        })
      : await currentChallengeModel.findOne({
          $and: [{ User: tokenData.userId }, { created_by: tokenData.userId }]
        });

    let ticketFromChallenge = await currentChallengeModel.delete(
      { $and: [{ User: tokenData.userId }, { created_by: tokenData.userId }] },
      tokenData.userId
    );

    console.log(ticketFromChallengeInfo);

    // * sets the reward for uploading files to the ecolote server
    let ticketToken = new jwtTicket({
      Challenge: ticketFromChallengeInfo.Challenge.toString(),
      userId: tokenData.userId,
      created_at: ticketFromChallengeInfo.created_at,
      closed_at: moment().format("YYYY-MM-DD/HH:mm:ZZ")
    });
    await ticketToken.create_token("1h");
    console.log(ticketToken);

    return Promise.resolve({
      msg: `${ticketFromChallengeInfo.Challenge} succesfully closed`,
      code: "200",
      token: ticketToken.token
    });
  } catch (error) {
    console.log(error);

    new ApolloError(error);
  }
};

export const modifyCurrentChallenge = async (
  { Challenge, User, id }: ModifyCurrentChallenge,
  ctx: any
) => {
  try {
    let updatedCurrentChallenge = await currentChallengeModel.findByIdAndUpdate(
      id,
      {
        Challenge,
        User,
        updated_at: moment().format("YYYY-MM-DD/HH:mm:ZZ")
      },
      { omitUndefined: true }
    );

    return Promise.resolve(
      `${updatedCurrentChallenge._id} succesfully updated`
    );
  } catch (error) {
    throw new ApolloError(error);
  }
};

// ? gets the current challenge if exists
export const myCurrentChallenge = async (ctx: any) => {
  try {
    let token = ctx.req.headers.token;

    let localToken = await Jwt.validateToken(
      token,
      ctx.req.body.variables.publicKey
    );

    let tokenData: any = await Jwt.decrypt_data(localToken)();

    //? the person requesting the ticket is the same that created the ticket
    let ticketFromChallengeInfo = await currentChallengeModel.findOne({
      $and: [{ User: tokenData.userId }, { created_by: tokenData.userId }]
    });

    return Promise.resolve(ticketFromChallengeInfo);
  } catch (error) {
    console.log(error);

    new ApolloError(error);
  }
};
