import { DingTalk } from "../../src";
import { assert } from "chai";

describe("Attendance", () => {
  let dingTalk: DingTalk;
  before(() => {
    dingTalk = new DingTalk({
      agentId: process.env.agentId,
      appKey: process.env.appKey,
      appSecret: process.env.appSecret
    });
  });


  it("getColumnVal", async () => {
    const data = await dingTalk.user.getByMobile("13888888888");
    const body = {
      userid: data.userid,
      to_date: "2021-04-07",
      from_date: "2021-04-01",
      column_id_list: ["37448073", "37448070"].join(",")
    };
    const res = await dingTalk.attendance.getColumnVal(body);
    assert.isArray(res.column_vals);
  });
});
