// pages/list/list.js
Page({
  data: {
    content: [],
    weather: [],
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
        // console.log(res);
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
              // console.log(res);
              let content = that.data.content
              for (var i = 0; i < res.data.results.length; i++) {
                var obj = {};
                obj.id = res.data.results[i].uid;
                obj.name = res.data.results[i].name;
                obj.location=res.data.results[i].location;
                obj.detailurl=res.data.results[i].detail_info.detail_url;
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
    wx.request({
      method: 'GET',
      url: 'https://tianqiapi.com/free/week',
      data: {
        appid: '59458163',
        appsecret: 'XZKEs05C',
        city: app.globalData.points,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let weather = that.data.weather
        // console.log(res);
        for (var i = 0; i < 7; i++) {
          var obj = {};
          obj = res.data.data[i]
          weather.push(obj);
        };
        that.setData({
          weather:weather
        })
        console.log(weather)
      },
      fail: function (res) {
      },
      complete: function (res) {
        console.log("end")
      }
    })
  },
  detail: function (e) {
    var app = getApp();
    // console.log(e);
    app.globalData.details = this.data.content[e.currentTarget.dataset.key];
    console.log(app.globalData.details)
    wx.navigateTo({
      url: '../place/place'
    })
  }
})