const assert = require('power-assert');

const DingTalk = require('../../../dist');
const options = require('./../../fixtures/test.config');

describe('test/src/api/auth.spec.js', () => {
  let dingTalk;

  before(() => {
    dingTalk = new DingTalk(options);
  });

  it('scopes', async () => {
    const result = await dingTalk.auth.scopes();
    assert(result.errcode === 0);
    assert(result.auth_org_scopes);
    assert(result.auth_org_scopes.authed_dept.length > 0);
  });

});
