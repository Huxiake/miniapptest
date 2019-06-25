// pages/getGoods/getGoods.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPic: false,
    showPicker: false,
    showOption: false,
    selAll: false,
    searchVal: '',
    pickerVal: '全部',
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
    selectArr: [],
    selectObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.vrequest({
      url: 'http://39.108.105.43:8080/v1/getgoods/getGetGoodsList',
      success: res => {
        console.log('data=', res.data);
      }
    })

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
    const id = e.currentTarget.dataset.item.Id
    const arrKey = util.evalKey(this.data.selectArr, id)
    const selectObjItem = "selectObj." + id

    // 先存入selectObj,用于样式
    if (this.data.selectObj[id] === undefined | this.data.selectObj[id] === false) {
      this.data.selectArr.splice(arrKey, 0, id)
      // 数组中没有这个value，存入数组
      this.setData({
        [selectObjItem]: true
      })
    } else {
      // 数组中有这个value，去掉
      this.data.selectArr.splice(arrKey, 1)
      this.setData({
        [selectObjItem]: false
      })
    }
  },

  /**
   * 关闭popup
   */
  onClose() {
    this.setData({ showPic: false });
    this.setData({ showPicker: false })
    this.setData({ showOption: false })
  },

  /**
   * 打开选择器
   */
  onClickpicker() {
    this.setData({ showPicker: true })
  },

  /**
   * 选择器确认
   */
  confirmPicker(event) {
    const { picker, value, index } = event.detail
    this.setData({ showPicker: false })
    this.setData({ pickerVal: value})
  },

  /**
   * 打开操作 
   */
  onClickOption() {
    this.setData({ showOption: true })
  },

  /**
   * 全选
   */
  selectAll() {
    const Arr = this.data.fakeData
    const len = Arr.length
    var selObj_temp = {}
    for (let i = 0; i < len; i++) {
      selObj_temp[Arr[i].Id] = !this.data.selAll
    }
    this.setData({
      selectObj: selObj_temp,
      selAll: !this.data.selAll
    })
  }
})
