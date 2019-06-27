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
    columnsKey:['','A','B','C','D','E','F','G'],
    result: '',
    listData: [],
    selectArr: [],
    selectObj: {},
    conditions: {
      market: '',
      GoodsStatus: 'Pending'
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
   * 设置为缺货状态
   */
  setLack(ids) {
    var data = '[' + ids.join(',') + ']'
    console.log(data)
    wx.vrequest({
      url: 'http://39.108.105.43:8080/v1/getgoods/markLack?id=' + data,
      method: 'POST',
      // dataType: 'json',
      success: res => {
        console.log('data=', res.data);
      }
    })
  },
  /**
   * 设置为完成状态
   */
  setGet(ids) {
    var data = '[' + ids.join(',') + ']'
    console.log(data)
    wx.vrequest({
      url: 'http://39.108.105.43:8080/v1/getgoods/markGet?id=' + data,
      method: 'POST',
      // dataType: 'json',
      success: res => {
        console.log('data=', res.data);
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
    if (typeof (e.target.dataset.id) === 'undefined') {
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
   * 点击缺货
   */
  onClickLack(e) {
    var idArr = []
    if (typeof (e.target.dataset.id) != 'undefined') {
      idArr.push(e.currentTarget.dataset.id)
    } else {
      console.log('在这里', this.data.selectArr)
      idArr = this.data.selectArr
    }
      this.setLack(idArr)
      this.setData({
        showOption: false
      })
  },

  /**
   * 点击完成
   */
  onClickGet(e) {
    var idArr = []
    if (typeof (e.target.dataset.id) != 'undefined') {
      idArr.push(e.currentTarget.dataset.id)
    } else {
      console.log('在这里', this.data.selectArr)
      idArr = this.data.selectArr
    }
    this.setGet(idArr)
    this.setData({
      showOption: false
    })
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
    this.setData({ 
      showPicker: false,
      pickerVal: value
    })
    this.data.conditions.market = this.data.columnsKey[index]
    console.log(this.data.conditions.market)
    this.getList()
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
    if (!this.data.selAll) {
      this.data.selectArr = Object.keys(selObj_temp)
    } else {
      this.data.selectArr = []
    }
    console.log(this.data.selectArr)
    this.setData({
      selectObj: selObj_temp,
      selAll: !this.data.selAll
    })
  }
})
