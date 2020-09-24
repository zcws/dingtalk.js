'use strict';

const Mock = require('mockjs');
const assert = require('power-assert');

const DingTalk = require('../../../dist').DingTalk;
const options = require('./../../fixtures/test.config');

describe('test/src/api/message.spec.js', () => {
  let dingtalk;

  before(async () => {
    dingtalk = new DingTalk(options);
  });

  function getRandomMobile() {
    return '134444' + Mock.mock('@string("number", 5)');
  }

  function* createUser(mobile) {
    const userId = mobile || getRandomMobile();
    yield dingtalk.user.create({
      userid: userId,
      name: 'user-' + userId,
      mobile: userId,
      department: [ 1 ],
    });
    return yield dingtalk.user.get(userId);
  }

  it('send', async () => {
    const result = await dingtalk.message.sendWorkNotice({
      agent_id: 1,
      userid_list: "11",
      msg: {
        msgtype: "text",
        text: {
          content: "测试消息推送"
        }
      }
    });

    console.log('%j', result);
    assert(!result.invaliduser);
  });

  it('send not exist', function* () {
    const result = yield dingtalk.message.send({
      toparty: '123',
      agentid: options.agentid,
      msgtype: 'text',
      text: {
        content: 'just a test',
      },
    });

    console.log('%j', result);
    assert(result.invalidparty === '123');
  });

  it('listMessageStatus', function* () {
    const user = yield createUser();

    const result = yield dingtalk.message.send({
      touser: user.userid,
      agentid: options.agentid,
      msgtype: 'text',
      text: {
        content: 'just a test',
      },
    });

    console.log('%j', result);

    const statusResult = yield dingtalk.message.listMessageStatus(result.messageId);
    assert(statusResult.unread.indexOf(user.userid) !== -1);
    console.log('%j', statusResult);

    yield dingtalk.user.delete(user.userid);
  });
});
