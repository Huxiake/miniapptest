/**
// EXAMPLE
// GET
wx.vrequest({
  url: 'https://mssnn.cn',
  success: res => {
    console.log('data=', res.data);
  }
})
// POST
wx.vrequest({
  url: 'https://wx5bbe79dd056cb238.mssnn.cn/v1/control/auth.php',
  method: 'POST',
  data: 'secret='+'a'.repeat(32),
  dataType: 'json',
  header: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  success: res => {
    console.log('data=', res.data);
  }
})
 */

wx.vrequest = function (options) {
  var jwt = ''
  try {
    var value = wx.getStorageSync('jwt')
    if (value) {
      jwt = value
    }
  } catch (e) {
    console.log(e)
  }
  // 默认配置
  const OPT = Object.assign({
    method: 'GET',
    // dataType: 'json',
    responseType: 'text'
  }, options);

  // 默认header
  OPT['header'] = Object.assign({
    'Content-Type': 'application/json',
    'UserAgent': 'github@guren-cloud/v-request 20181229',
    'Authorization': 'Bearer ' + jwt
  }, options.header);

  // 发送的数据
  // 如果data是string,对应request模块的body（buffer、string）
  // 如果是object，则为json，对应request模块的json
  let POST_DATA = {
    body: options.data
  };
  if (typeof options.data === 'object') POST_DATA['body'] = JSON.stringify(POST_DATA['body']);

  // 开始请求
  return new Promise((RES, REJ) => {
    wx.cloud.callFunction({
      name: 'v-request',
      data: {
        options: Object.assign({
          url: options.url,
          method: OPT['method'],
          headers: OPT['header']
        }, POST_DATA)
      },
      success: res => {
        const { result } = res;
        // 如果datatype='json'，则解析后
        let data = null;
        if (OPT.dataType === 'json') {
          try {
            data = JSON.parse(result.body);
          } catch (err) {
            console.error('[!] v-request： 解析返回数据json失败', err);
          }
        } else {
          // 否则为text数据
          data = result.body;
        }

        const RETURN_DATA = {
          data,
          errMsg: 'request:ok',
          statusCode: result.statusCode,
          header: result.headers
        }

        options.success && options.success(RETURN_DATA);
        RES(RETURN_DATA);
      },
      fail: err => {
        // 错误回调
        options.fail && options.fail({
          errMsg: 'request:fail',
          err
        });
        REJ(err);
      },
      complete: options.complete
    })
  })
}
