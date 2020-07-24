module.exports = {
  'host': 'https://oapi.dingtalk.com',
  'appKey': process.env.NODE_DINGTALK_TEST_CORPID || 'dingoaurmvf8k9zzjnvjzw',
  'appSecret': process.env.NODE_DINGTALK_TEST_CORPSECRET || 'WWYa5EHqaMEDwzfjeidC5nsQnFn2gBJcRD20J3bKQ3in5Eap6-DLFzPxb7dahfLb',
  'requestOpts': {
    'timeout': 10000
  }
};
