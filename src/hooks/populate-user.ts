import { Id } from "@feathersjs/feathers";
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {

    const { app, result, params, method } = context;

    const addUser = async (message: { userId: Id }) => {
      const user = app.service("users").get(message.userId, params);
      return {
        ...message,
        user
      };
    };

    if (method === "find") {
      result.data = await Promise.all(result.data.map(addUser));

    } else {
      context.result = await addUser(result);
    }

    return context;
  };
};
