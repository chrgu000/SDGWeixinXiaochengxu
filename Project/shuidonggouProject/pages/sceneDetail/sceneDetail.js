// pages/sceneDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cuplace = JSON.parse(options.curentPlace);
    wx.setNavigationBarTitle({
      title: cuplace.cn_name,
    })
    this.setData({
      curentPlace: cuplace 
    })
  },

 
})