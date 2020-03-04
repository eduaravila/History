import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Query,
  ID,
  Authorized
} from "type-graphql";

import {
  NewHistory,
  SuccessResponse,
  findInput,
  ModifyHistory
} from "../schema/HistorySchema";

import {
  NewCurrentChallenge,
  ModifyCurrentChallenge,
  CurrentChallenge,
  SuccessResponseTicket,
  Challenge,
  SuccessResponseTicketSingle
} from "../schema/CurrentChallengeSchema";
import {
  addCurrentChallenge,
  getCurrentChallenges,
  getCloseTicket,
  modifyCurrentChallenge
} from "../controllers/currentChallenge";

@Resolver(of => CurrentChallenge)
export class CurrentChallengeResolver {
  @Mutation(returns => SuccessResponse)
  async AddCurrentChallenge(
    @Arg("NewCurrentChallenge", () => NewCurrentChallenge)
    NewCurrentChallenge: NewCurrentChallenge,
    @Ctx() ctx: any
  ) {
    let msg = await addCurrentChallenge(NewCurrentChallenge, ctx);
    return {
      msg,
      code: "200"
    };
  }

  @Mutation(returns => SuccessResponseTicketSingle)
  async CloseChallenge(@Ctx() ctx: any) {
    
    return await getCloseTicket(ctx);
  }

  @Authorized("ADMIN")
  @Query(returns => [CurrentChallenge], {
    description: "Admin query 🔏"
  })
  async CurrentChallenges(
    @Arg("findInput", () => findInput) findInput: findInput
  ) {
    let msg = await getCurrentChallenges(findInput);
    return [...msg];
  }

  @Authorized("ADMIN")
  @Mutation(returns => SuccessResponse, {
    description: "Admin query 🔏"
  })
  async ModifyCurrentChallenge(
    @Arg("ModifyChallenge", { nullable: true })
    modifyChallengeInput: ModifyCurrentChallenge,
    @Ctx() ctx: any
  ) {
    let msg = await modifyCurrentChallenge(modifyChallengeInput, ctx);
    return {
      msg,
      code: "200"
    };
  }
}
