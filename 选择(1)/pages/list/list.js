// pages/list/list.js
Page({
  data: {
    content:[],
    page: 0
  },
  onLoad: function (e) {
    var that = this;
    var app = getApp();
    wx.request({
      method: 'GET',
      url: 'http://api.map.baidu.com/place/v2/search',
      data: {
        ak: '32cxFBvTGurCaAoG2BLUo36VEvxxZMQm',
        query: '旅游景点',
        region: app.globalData.points,
        output: 'json',
        scope: '2',
        page_size: '20',
        page_num: '0',
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          page: parseInt(res.data.total / 20),
        })
        for (var j = 0; j < that.data.page + 1; j++) {
          wx.request({
            method: 'GET',
            url: 'http://api.map.baidu.com/place/v2/search',
            data: {
              ak: '32cxFBvTGurCaAoG2BLUo36VEvxxZMQm',
              query: '旅游景点',
              region: app.globalData.points,
              output: 'json',
              scope: '2',
              page_size: '20',
              page_num: j,
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              //console.log(res);
              let content = that.data.content
              for (var i = 0; i < res.data.results.length; i++) {
                var obj = {};
                obj.id = res.data.results[i].uid;
                obj.name = res.data.results[i].name;
                content.push(obj);
              };
              that.setData({
                content: content
              });
            },
            fail: function (res) {
              console.log("fail!!!")
            },
            complete: function (res) {
            }
          })
        }
        console.log(that.data.content);
      },
      fail: function (res) {
        console.log("fail!!!")
      },
      complete: function (res) {
        console.log("end")
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

  }
})