'use strict';

const Mock = require('mockjs');
const assert = require('power-assert');

const DingTalk = require('../../../dist').DingTalk;
const options = require('./../../fixtures/test.config');

describe('test/src/api/user.spec.js', () => {
  let dingTalk;

  before(async () => {
    dingTalk = new DingTalk(options);
  });

  function getRandomMobile() {
    return '134444' + Mock.mock('@string("number", 5)');
  }

  async function createUser(mobile) {
    const userId = mobile || getRandomMobile();
    await dingTalk.user.create({
      userid: userId,
      name: 'user-' + userId,
      mobile: userId,
      department: [1]
    });
    return dingTalk.user.get(userId);
  }

  it('create', async () => {
    const mobile = getRandomMobile();
    const user = await dingTalk.user.create({
      userid: mobile,
      name: 'user-' + mobile,
      mobile,
      department: [1]
    });
    assert(user.userid);
    console.log('%j', user);

    await dingTalk.user.delete(mobile);
  });

  it('update', async () => {
    let user = await createUser();
    const userId = user.userid;

    const result = await dingTalk.user.update({
      userid: userId,
      name: 'user-' + userId
    });
    assert(result.errcode === 0);
    console.log('%j', result);

    user = await dingTalk.user.get(userId);
    assert(user.name === 'user-' + userId);
    console.log('%j', user);

    await dingTalk.user.delete(userId);
  });

  it('get', async () => {
    let user = await createUser();
    const userId = user.userid;

    user = await dingTalk.user.get(userId);
    assert(user.userid);
    console.log('%j', user);

    await dingTalk.user.delete(userId);
  });

  it('get undefined when not exist', async () => {
    const user = await dingTalk.user.get('$#abc');
    console.log('%j', user);
    assert(!user);
  });

  it('list with logger', async () => {
    dingTalk.client.options.logger = console;
    const userList = await dingTalk.user.list('1');
    try {
      await dingTalk.user.list('1abc');
      throw new Error('should not run this');
    } catch (err) {
      assert(err);
      assert(err.name === 'DingTalkClientResponseError');
      console.log(err);
    }
    dingTalk.client.options.logger = null;
    console.log('%j', userList);
    assert(userList.errcode === 0);
    assert(userList.userlist.length > 0);
  });

  it('list simple', async () => {
    const userList = await dingTalk.user.list('1', true);
    console.log('%j', userList);
    assert(userList.errcode === 0);
    assert(userList.userlist.length > 0);
    assert(Object.keys(userList.userlist[0]).join(',') === 'name,userid');
  });

  it('delete', async () => {
    let user = await createUser();
    const userId = user.userid;

    const result = await dingTalk.user.delete(userId);
    console.log('%j', result);
    assert(result.errcode === 0);

    user = await dingTalk.user.get(userId);
    assert(!user);
  });

  it('batch delete', async () => {
    const mobileList = [getRandomMobile(), getRandomMobile()];
    for (const mobile of mobileList) {
      await createUser(mobile);
    }

    const result = await dingTalk.user.delete(mobileList);
    console.log('%j', result);
    assert(result.errcode === 0);

    const userList = await dingTalk.user.list(1);
    const userIds = userList.userlist.map(item => item.userid);
    assert(userIds.indexOf(mobileList[0]) === -1);
    assert(userIds.indexOf(mobileList[1]) === -1);
    console.log('%j', userList);
  });

  it('getUseridByUnionid', async () => {
    const user = (await dingTalk.user.list('1', false, {size: 1})).userlist[0];
    const result = await dingTalk.user.getUseridByUnionid(user.openId);
    assert(result.userid === user.userid);
  });

  it('list all user at special department', async () => {
    this.timeout(1000 * 60 * 2);
    const mobileList = [getRandomMobile(), getRandomMobile()];
    for (const mobile of mobileList) {
      await createUser(mobile);
    }

    const result = await dingTalk.user.listAll('1', true, {size: 1});
    const userIds = result.userlist.map(item => item.userid);
    assert(result.queryCount >= 3);
    assert(userIds.indexOf(mobileList[0]) !== -1);
    assert(userIds.indexOf(mobileList[1]) !== -1);

    await dingTalk.user.delete(mobileList);
  });

  it('list all user', async () => {
    this.timeout(1000 * 60 * 2);
    const mobileList = [getRandomMobile(), getRandomMobile()];
    for (const mobile of mobileList) {
      await createUser(mobile);
    }

    const result = await dingTalk.user.listAll(undefined, true, {size: 1});
    const userIds = result.userlist.map(item => item.userid);
    assert(result.queryCount >= 3);
    assert(userIds.indexOf(mobileList[0]) !== -1);
    assert(userIds.indexOf(mobileList[1]) !== -1);

    await dingTalk.user.delete(mobileList);
  });

  it('getUserByCode', async () => {
    try {
      await dingTalk.user.getUserByCode('abc');
    } catch (err) {
      assert(err.data.errcode === 40078);
    }
  });

  it('getByMobile', async () => {
    const userList = await dingTalk.user.list('1');
    console.log('%j', userList);

    try {
      const userInfo = await dingTalk.user.getByMobile(userList.userlist[0].mobile);
      console.log('%j', userInfo);
      assert(userInfo.userid === userList.userlist[0].userid);
    } catch (err) {
      assert(err.data.errcode === 60011);
    }
  });
});
