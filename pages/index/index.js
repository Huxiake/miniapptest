//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../workbench/workbench'
    })
  },
  onLoad: function () {
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://onekeyErp.yijiankuajing.com/api/mp/login?code=' + res.code,
            success: res => {
              console.log(res)
              var dataJSON = res.data
              if (dataJSON.success) {
                wx.setStorage({
                  key: "jwt",
                  data: dataJSON.data.jwt
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
  handleGetGoodsList() {
    wx.navigateTo({
      url: '../../pages/getGoods/getGoods'
    })
  }
})
