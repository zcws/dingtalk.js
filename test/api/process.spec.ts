import { DingTalk } from "../../src";
import { assert } from "chai";

describe("Process", () => {
  let dingTalk: DingTalk;
  before(() => {
    dingTalk = new DingTalk({
      agentId: process.env.agentId,
      appKey: process.env.appKey,
      appSecret: process.env.appSecret
    });
  });


  let id;
  it("getInstanceIds", async () => {
    const options = {
      start_time: 1614556800000,
      process_code: "PROC-5FYJNMDV-LTWZWCDVR220JTU6S2DT1-WF73YTNJ-K"
    };
    const res = await dingTalk.process.getInstanceIds(options);
    assert.isArray(res.list);
    assert.isNumber(res.next_cursor);
    [id] = res.list;
  });

  it("getInstanceById", async () => {
    if (id) {
      const res = await dingTalk.process.getInstanceById(id);
      assert.isString(res.result);
    }
  });
});
