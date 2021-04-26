import { assert } from "chai";
import { DingTalk } from "../../src";

describe("User", () => {
  let dingTalk;

  before(async () => {
    dingTalk = new DingTalk({
      agentId: process.env.agentId,
      appKey: process.env.appKey,
      appSecret: process.env.appSecret
    });
  });

  it("getUserByCode", async () => {
    const res = await dingTalk.user.getUserByCode("e1c77f85540b3759b708b327455717cf");
    assert.isNotEmpty(res);
  });
});
