// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {

    const { data } = context;

    if (!data.text || data.text === "") {
      throw new Error("A message must have text");
    }

    const { user }: any = context.params;

    const text = data.text;

    context.data = {
      text,
      userId: user._id,
    };

    return context;
  };
};
