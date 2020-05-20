// pages/place/place.js
Page({
  data: {
    detail: [],
    page: 0
  },
  onLoad: function (e) {
    var that = this;
    var app = getApp();
    wx.request({
      method: 'GET',
      url: 'http://api.map.baidu.com/place/v2/detail',
      data: {
        ak: '32cxFBvTGurCaAoG2BLUo36VEvxxZMQm',
        uid: app.globalData.details.id,
        output: 'json',
        scope: 2
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        let detail = that.data.detail
        var obj = {};
        obj.adress = res.data.result.address;
        obj.name = res.data.result.name;
        obj.area = res.data.result.are;
        obj.city = res.data.result.city;
        obj.province = res.data.result.province;
        obj.id = res.data.result.uid;
        obj.street_id = res.data.result.street_id;
        obj.location = res.data.result.location;
        obj.rating = res.data.result.detail_info.overall_rating;
        obj.content = res.data.result.detail_info.content_tag;
        obj.price = res.data.result.detail_info.price;
        obj.grade = res.data.result.detail_info.scope_grade;
        obj.type = res.data.result.detail_info.scope_type;
        obj.hours = res.data.result.detail_info.shop_hours;
        detail.push(obj);
        that.setData({
          detail:detail
        })
        console.log(detail)
      },
      fail: function (res) {
        console.log("fail!!!")
      },
      complete: function (res) {
        console.log("end")
      },
    })
  },
})