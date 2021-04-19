import { DingTalk } from "../../../src";

const Mock = require("mockjs");
const assert = require("power-assert");
const options = require("./../../fixtures/test.config");

describe("test/src/api/message.spec.js", () => {
  let dingTalk;

  before(async () => {
    dingTalk = new DingTalk(options);
  });

  function getRandomMobile() {
    return "134444" + Mock.mock("@string(\"number\", 5)");
  }

  async function createUser(mobile?: string) {
    const userId = mobile || getRandomMobile();
    await dingTalk.user.create({
      userid: userId,
      name: "user-" + userId,
      mobile: userId,
      department: [1]
    });
    return dingTalk.user.get(userId);
  }

  it("send", async () => {
    const data = {
      agent_id: 1,
      userid_list: "11",
      msg: {
        msgtype: "text",
        text: {
          content: "测试消息推送"
        }
      }
    };
    const result = await dingTalk.message.sendWorkNotice(data);
    console.log("%j", result);
    assert(!result.invaliduser);
  });

  it("send not exist", function* () {
    const result = yield dingTalk.message.send({
      toparty: "123",
      agentid: options.agentid,
      msgtype: "text",
      text: {
        content: "just a test"
      }
    });

    console.log("%j", result);
    assert(result.invalidparty === "123");
  });

  it("listMessageStatus", async () => {
    const user = await createUser();

    const result = await dingTalk.message.send({
      touser: user.userid,
      agentid: options.agentid,
      msgtype: "text",
      text: {
        content: "just a test"
      }
    });

    console.log("%j", result);

    const statusResult = await dingTalk.message.listMessageStatus(result.messageId);
    assert(statusResult.unread.indexOf(user.userid) !== -1);
    console.log("%j", statusResult);

    await dingTalk.user.delete(user.userid);
  });
});
