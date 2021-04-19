import { assert } from "chai";
import { DingTalk } from "../../src";

describe("Department", () => {
  let dingTalk;
  before(() => {
    dingTalk = new DingTalk({
      agentId: process.env.agentId,
      appKey: process.env.appKey,
      appSecret: process.env.appSecret
    });
  });

  it("get", async () => {
    const res = await dingTalk.user.getByMobile(13888888888);
    const data = await dingTalk.user.get(res.userid);
    const [id] = data.department;
    const department = await dingTalk.department.get(id);
    assert.equal(id, department.id);
  });
});
