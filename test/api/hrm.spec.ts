import { DingTalk } from "../../src";
import { assert } from "chai";

describe("HRM", () => {
  let dingTalk: DingTalk;
  before(() => {
    dingTalk = new DingTalk({
      agentId: process.env.agentId,
      appKey: process.env.appKey,
      appSecret: process.env.appSecret
    });
  });


  const userList = [];
  it("getOnJobList", async () => {
    const res = await dingTalk.hrm.getOnJobList({ offset: 0, size: 10, status_list: "2" });
    assert.isArray(res.data_list);
    userList.push(...res.data_list);
  });


  it("getDimissionList", async () => {
    const res = await dingTalk.hrm.getDimissionList({ offset: 0, size: 10, status_list: "2" });
    assert.isArray(res.data_list);
  });

  let roster;
  it("getRosterList", async () => {
    const res = await dingTalk.hrm.getRosterList(userList);
    Array.isArray(res);
    [roster] = res;
  });


  it.skip("updateRosterById", async () => {
    if (!roster) {
      return;
    }
    const { userid, field_list } = roster;
    const groupIds = field_list.map(x => x.group_id);
    const groups = Array.from(new Set<string>(groupIds)).map(group_id => {
      const data = field_list.filter(x => x.group_id === group_id);
      return {
        group_id,
        sections: data.map(x => ({
          value: x.value,
          field_code: x.field_code
        }))
      };
    });

    const res = await dingTalk.hrm.updateRosterById(userid, groups.splice(0, 1));
    assert.isBoolean(res);
  });
});
