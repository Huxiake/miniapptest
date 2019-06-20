// pages/getGoods/getGoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPic: false,
    showPicker: false,
    value: '',
    columns: ['全部','金富丽','女人街','大西豪','大时代','国投','国大','国润'],
    result: '',
    fakeData: [{
      'Id': '1321',
      'GetGoodsNum': 'A12345678',
      'Price': '30',
      'Amount': 1,
      'Remake': '',
      'Img': 'https://xkerp-pic.oss-cn-shenzhen.aliyuncs.com/A1038.jpg?x-oss-process=image/resize,h_300,limit_0'
    },{
      'Id': '1322',
      'GetGoodsNum': 'A12345678',
      'Price': '58',
      'Amount': 2,
      'Remake': '条纹的',
      'Img': 'https://xkerp-pic.oss-cn-shenzhen.aliyuncs.com/A1037.jpg?x-oss-process=image/resize,h_300,limit_0'
    },{
      'Id': '1323',
      'GetGoodsNum': 'A12345678',
      'Price': '26',
      'Amount': 5,
      'Remake': '七分袖',
      'Img': 'https://xkerp-pic.oss-cn-shenzhen.aliyuncs.com/A1036.jpg?x-oss-process=image/resize,h_300,limit_0'
    }],
    selectList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 点击商品图片事件
   */
  onClickThumb() {
    console.log("111")
    this.setData({ showPic: true });
  },

  /**
   * 点击选择商品卡片
   */
  onClickCard(e) {
    console.log(e)
    const id = e.currentTarget.dataset.item.Id
    const selectListItem = "selectList." + id
    if (this.data.selectList[id] === undefined | this.data.selectList[id] === false) {
      this.setData({
        [selectListItem]: true
      })
    } else {
      this.setData({
        [selectListItem]: false
      })
    }
  },

  /**
   * 关闭popup
   */
  onClose() {
    console.log("this")
    this.setData({ showPic: false });
    this.setData({ showPicker: false })
  },

  pickerTest() {
    this.setData({ showPicker: true })
  },

  confirmPicker(event) {
    const { picker, value, index } = event.detail
    console.log(event)
    console.log(value)
    this.setData({ showPicker: false})
  }
})