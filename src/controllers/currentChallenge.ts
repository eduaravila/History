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
  { Challenge, User }: NewCurrentChallenge,
  ctx: any
) => {
  try {
    let token = ctx.req.headers.token;

    let localToken = await Jwt.validateToken(
      token,
      ctx.req.body.variables.publicKey
    );

    let tokenData: any = await Jwt.decrypt_data(localToken)();

    let newCurrentChallenge = new currentChallengeModel({
      Challenge,
      User,
      created_by: tokenData.userId,
      updated_by: tokenData.userId
    });

    await newCurrentChallenge.save();

    return Promise.resolve(`${newCurrentChallenge._id} succesfully created`);
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
              $or: [
                { User: { $regex: ".*" + search + ".*" } },
                { _id: { $regex: ".*" + search + ".*" } }
              ]
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

export const getCloseTicket = async ({ id }: any, ctx: any) => {
  try {
    let token = ctx.req.headers.token;

    let localToken = await Jwt.validateToken(
      token,
      ctx.req.body.variables.publicKey
    );

    let tokenData: any = await Jwt.decrypt_data(localToken)();

    //? the person requesting the ticket is the same that created the ticket
    let ticketFromChallenge = await currentChallengeModel.delete(
      { $and: [{ User: id }, { created_by: tokenData.userId }] },
      tokenData.userId
    );

    // * sets the reward for uploading files to the ecolote server
    let ticketToken = new jwtTicket({
      Challenge: ticketFromChallenge.Challenge,
      userId: tokenData.userId,
      created_at: ticketFromChallenge.created_at,
      closed_at: ticketFromChallenge.deleteAt
    });
    await ticketToken.create_token("1h");

    return Promise.resolve({
      msg: `${ticketFromChallenge._id} succesfully closed`,
      code: "200",
      token: ticketToken.token
    });
  } catch (error) {
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
