const assert = require('power-assert');

const DingTalk = require('../../dist/index').DingTalk;
const options = require('./../fixtures/test.config');

describe('test/dingTalk.spec.js', () => {
  let dingTalk;
  before(() => {
    dingTalk = new DingTalk(options);
  });

  it('dingTalk', () => {
    assert(dingTalk.user);
    assert(dingTalk.department);
    assert(dingTalk.message);
  });
});
