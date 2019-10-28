import Dialog from '../../modules/vant/dialog/dialog';

// pages/getGoods/getGoods.js
const util = require('../../utils/util.js')
const qs = require('qs')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jwt: '',
    showPic: false,
    showMarketPicker: false,
    showOption: false,
    showMoreBtn: false,
    showLackInfo: false,
    selAll: false,
    picUrl: '',
    searchVal: '',
    pickerMarketVal: '全部',
    columns: ['全部','A国润','B国马','C国投','D非凡','E柏美','F泓发','G宝华','H女人街','I国大','J大时代','K佰润','L三晟','M大西豪','N跨客城','O国泰','P新金马','Q金富丽','T天福居'],
    columnsKey:['','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','T'],
    parkGetcolumns: [],
    result: '',
    listData: [],
    selectArr: [],
    selectObj: {},
    selectMoreId: '',
    conditions: {
      market: '',
      offset: 0,
      limit: 500,
      GoodsStatus: 'pending'
    },
    lackInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getJwt()
    this.getList()
  },
  /**
   * 获取jwt
   */
  getJwt() {
    try {
      var value = wx.getStorageSync('jwt')
      if (value) {
        this.data.jwt = value
      }
    } catch (e) {
      console.log(e)
    }
  },

  /**
   * 获取拿货列表
   */
  getList() {
    var cond = qs.stringify(this.data.conditions)
    wx.request({
      url: 'https://onekeyErp.yijiankuajing.com/v1/getgoods/getGetGoodsList?' + cond,
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.data.jwt
      },
      success: res => {
        console.log(res)
        var dataJSON = res.data
        if (dataJSON.success) {
          this.setData({
            listData: dataJSON.data.rows
          })
        }
        console.log('data=', dataJSON.data)
      }
    })
  },

  /**
   * 设置为缺货状态
   */
  setLack(ids) {
    console.log(this.data.lackInfo)
    var data = '[' + ids.join(',') + ']'
    console.log(data)
    wx.request({
      url: 'https://onekeyErp.yijiankuajing.com/v1/getgoods/markLack?id=' + data + '&lackRemark=' + this.data.lackInfo,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.data.jwt
      },
      success: res => {
        var dataJSON = res.data
        if (dataJSON.success) {
          this.getList()
        }
      }
    })
  },

  inputLackInfo(e) {
    this.setData({
      lackInfo: e.detail.value
    })
  },

  submitLack() {
    var data = '[' + this.data.selectArr.join(',') + ']'
    console.log(data)
    wx.request({
      url: 'https://onekeyErp.yijiankuajing.com/v1/getgoods/markLack?id=' + data + '&lackRemark=' + this.data.lackInfo,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.data.jwt
      },
      success: res => {
        var dataJSON = res.data
        if (dataJSON.success) {
          this.getList()
        }
      }
    })
  },

  /**
   * 设置为完成状态
   */
  setGet(ids) {
    var data = '[' + ids.join(',') + ']'
    console.log(data)
    wx.request({
      url: 'https://onekeyErp.yijiankuajing.com/v1/getgoods/markGet?id=' + data,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.data.jwt
      },
      success: res => {
        var dataJSON = res.data
        if (dataJSON.success) {
          console.log('1111')
          this.getList()
        }
      }
    })
  },

  /**
   * 设置为部分完成状态
   */
  setParkGet(getAmount) {
    // console.log('data', this.data.selectMoreId)
    // console.log('getAmount', getAmount)
    // const data = qs.stringify(this.data.selectArr)
    // console.log(data)
    wx.request({
      url: 'https://onekeyErp.yijiankuajing.com/v1/getgoods/markParkGet?id=[' + this.data.selectMoreId + ']&getAmount=' + getAmount,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.data.jwt
      },
      success: res => {
        var dataJSON = res.data
        if (dataJSON.success) {
          console.log('1111')
          this.getList()
        }
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
    this.setData({ showPic: true })
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
      idArr = this.data.selectArr
    }
    // this.setLack(idArr)
    this.setData({
      selectArr: idArr,
      showLackInfo: true,
      showOption: false
    })
  },

  /**
   * 点击完成
   */
  onClickGet(e) {
    Dialog.confirm({
      // title: '请确认',
      message: '是否确认完成拿货'
    }).then(() => {
      // on confirm
      console.log('确认完成')
      var idArr = []
      if (typeof (e.target.dataset.id) != 'undefined') {
        idArr.push(e.currentTarget.dataset.id)
      } else {
        console.log('在这里', this.data.selectArr)
        idArr = this.data.selectArr
      }
      this.setGet(idArr)
      this.setData({
        showOption: false,
        selectArr: [],
        selectObj: {},
        selAll: !this.data.selAll
      })
      // console.log('selectArr', this.data.selectArr)
    }).catch(() => {
      console.log('取消')
      // on cancel
    });
  },

  /**
   * 点击更多
   */
  onClickMore(e) {
    if (e.currentTarget.dataset.item.Amount > 1) {
      this.setData({
        showMoreBtn: true,
        selectMoreId: e.currentTarget.dataset.item.Id,
        // 生成选择列表
        parkGetcolumns: Array.from(Array(Number(e.currentTarget.dataset.item.Amount)), (v, k) => k + 1)
      })
    }
  },

  /**
   * 关闭popup
   */
  onClose() {
    this.setData({ 
      showPic: false,
      showMarketPicker: false,
      showOption: false,
      showMoreBtn: false
    });
  },

  /**
   * 打开选择器
   */
  onClickMarketPicker() {
    console.log('this')
    this.setData({ showMarketPicker: true })
  },

  /**
   * 选择器确认
   */
  confirmPicker(event) {
    console.log(event)
    const { value, index } = event.detail
    this.setData({ 
      showMarketPicker: false,
      pickerMarketVal: value
    })
    this.data.conditions.market = this.data.columnsKey[index]
    console.log(this.data.conditions.market)
    this.getList()
  },

  /**
   * 部分完成确认
   */
  parkGetconfirmPicker(event) {

    const { value } = event.detail
    this.setData({
      showMoreBtn: false
    })
    this.setParkGet(value)
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
    this.setData({ 
      showOption: false
    })
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
