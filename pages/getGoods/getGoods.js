// pages/getGoods/getGoods.js
const util = require('../../utils/util.js')
const qs = require('qs')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPic: false,
    showPicker: false,
    showOption: false,
    selAll: false,
    picUrl: '',
    searchVal: '',
    pickerVal: '全部',
    columns: ['全部','金富丽','女人街','大西豪','大时代','国投','国大','国润'],
    result: '',
    listData: [],
    selectArr: [],
    selectObj: {},
    conditions: {
      market: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },

  /**
   * 获取拿货列表函数
   */
  getList() {
    var cond = qs.stringify(this.data.conditions)
    wx.vrequest({
      url: 'http://39.108.105.43:8080/v1/getgoods/getGetGoodsList?' + cond,
      success: res => {
        var dataJSON = JSON.parse(res.data)
        if (dataJSON.success) {
          this.setData({
            listData: dataJSON.data.rows
          })
        }
        console.log('data=', dataJSON.data);
      }
    })
  },

  /**
   * 点击商品图片事件
   */
  onClickThumb(e) {
    console.log(e)
    var img = e.currentTarget.dataset.img
    this.setData({ picUrl: img })
    this.setData({ showPic: true });
  },

  /**
   * 点击选择商品卡片
   */
  onClickCard(e) {
    // if (e.target.)
    // console.log(e.target.dataset.item.Id)
    if (e.target.dataset.item.Id) {
      console.log('yes')
    }
    if (e.target.dataset != {}) {
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
    console.log(event)
    const { value, index } = event.detail
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
   * 取消操作
   */
  cancelOption() {
    this.setData({ showOption: false })
  },

  /**
   * 全选
   */
  selectAll() {
    const Arr = this.data.listData
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
