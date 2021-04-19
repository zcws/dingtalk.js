'use strict';

const assert = require('power-assert');
const urllib = require('urllib');

const DingTalk = require('../../../dist').DingTalk;
const options = require('./../../fixtures/test.config');


describe('test/src/api/client.spec.js', () => {
  let dingtalk;

  before(() => {
    dingtalk = new DingTalk(options);
  });

  it('getAccessToken', async () => {
    const token = await dingtalk.client.getAccessToken();
    assert(token);

    const token2 = await dingtalk.client.getAccessToken();
    assert(token === token2);
  });

  it('getJSApiTicket', async () => {
    const token = await dingtalk.client.getJSApiTicket();
    assert(token);

    const token2 = await dingtalk.client.getJSApiTicket();
    assert(token === token2);
  });

  it('normalizeUrl', () => {
    const mapping = [
      {
        src: 'http://localhost:5000/test',
        target: 'http://localhost:5000/test'
      },
      {
        src: 'http://localhost:5000/test#top',
        target: 'http://localhost:5000/test'
      },
      {
        src: 'http://localhost:5000/test?url=http%3A%2F%2Fabc.com%2Fsomewhere#top',
        target: 'http://localhost:5000/test?url=http://abc.com/somewhere'
      },
      {
        src: 'http://localhost:5000/test?a=b&url=http%3A%2F%2Fabc.com%2Fsomewhere#top',
        target: 'http://localhost:5000/test?a=b&url=http://abc.com/somewhere'
      }
    ];
    for (const item of mapping) {
      assert(dingtalk.client._normalizeUrl(item.src) === item.target);
    }
  });

  it('getJSApiConfig',  async () =>{
    const opts = {
      jsapi_ticket: 'HerLBdXanXEE9D78HR1IutOlhOXkFWMKZThJ5bX35HSJA5s8jZUaKWQT7rauior2qyqLMehYaoA9iCemhUBVDD',
      noncestr: 'Index#1470295596107',
      timestamp: 1470295596107,
    };
    const cfg = await dingtalk.client.getJSApiConfig('http://localhost:5000/?url=http%3A%2F%2Fabc.com%2Fsomewhere#top', opts);
    assert(cfg.timeStamp === opts.timestamp);
    assert(cfg.nonceStr === opts.noncestr);
    assert(cfg.signature === 'aa0d825239c19063de73d22af45c46068c30c26a');
  });

  it('getQRConnectUrl', async () => {
    const url = await dingtalk.client.getQRConnectUrl({
      redirect_uri: 'http://127.0.0.1:7001/auth/callback/dingding'
    });
    console.log(url);
    assert(url);

    const url2 = await dingtalk.client.getQRConnectUrl({
      redirect_uri: 'http://127.0.0.1:7001/auth/callback/dingding'
    });
    assert(url2 === url);
  });

  it('should proxy work', async () => {
    const proxyOptions = Object.assign({proxy: 'http://127.0.0.1:7002', urllib}, options);
    dingtalk = new DingTalk(proxyOptions);
    const res = await dingtalk.client.request(proxyOptions.host + '/foo/bar');
    assert(res);
  });
});
