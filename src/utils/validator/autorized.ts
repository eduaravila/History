import { AuthChecker } from "type-graphql";
import jwtAdmin from "../jwtAdmin";

export const customAuthChecker: AuthChecker<any> = async (
  { root, args, context, info },
  roles
) => {
  try {
    let token = context.req.headers.token;
    roles[0] = roles[0] ? roles[0] : "NORMAL";

    switch (roles[0]) {
      case "ADMIN":
        await jwtAdmin.validateToken(token);
        break;
    }
    return true; // or false if access is denied
  } catch (error) {
    console.log(error);

    return false;
  }
};
