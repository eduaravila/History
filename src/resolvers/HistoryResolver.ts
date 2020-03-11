import { Resolver, Mutation, Arg, Ctx, Query, ID } from "type-graphql";

import {
  NewHistory,
  SuccessResponse,
  findInput,
  ModifyHistory,
  History
} from "../schema/HistorySchema";

import {
  addHistory,
  getHistory,
  getCompletedChallenges
} from "../controllers/history";

@Resolver(of => History)
export class HistoryResolver {
  @Mutation(returns => SuccessResponse)
  async addHistory(
    @Arg("NewHistory", () => NewHistory) NewHistory: NewHistory,
    @Ctx() ctx: any
  ) {
    let msg = await addHistory(NewHistory, ctx);
    return {
      msg,
      code: "200"
    };
  }

  @Query(returns => [History])
  async history(@Arg("findInput", () => findInput) findInput: findInput) {
    let msg = await getHistory(findInput);
    return [...msg];
  }

  @Query(returns => [History])
  async MyCompletedChallenges(@Ctx() ctx: any) {
    let msg = await getCompletedChallenges(ctx);
    return [...msg];
  }
}
