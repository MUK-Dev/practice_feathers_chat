import { Service, MongooseServiceOptions } from "feathers-mongoose";
import { Application } from "../../declarations";
import { createHash } from "crypto";
import { Params, Id } from "@feathersjs/feathers";

interface Data {
  email: string;
  password: string;
  githubId?: Id;
}

const gravatarUrl = "https://www.gravatar.com/avatar";
const query = "s=60";

export class Users extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }
  create(data: Data, params: Params): Promise<any> {
    const { email, password, githubId } = data;

    const hash = createHash("md5").update(email.toLowerCase()).digest("hex");

    const avatar = `${gravatarUrl}/${hash}?${query}`;

    const userData = {
      email,
      password,
      githubId,
      avatar
    };

    return super.create(userData, params);

  }
}
