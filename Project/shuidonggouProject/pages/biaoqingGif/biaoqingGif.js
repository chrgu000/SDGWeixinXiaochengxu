import { Gif } from 'biaoqingGif-model.js'

var gif = new Gif();


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
    this._loadData();
  },

  _loadData: function () {
    var that = this;
    gif.getGifAll((res) => {
      that.setData({
        gifArr: res,
      });

    });

  },

onProductsItemTap:function(event){
  var current = event.target.dataset.src
  var url = gif.getDataSet(event,'url')
  wx.previewImage({
    current: current,
    urls: [url],//内部的地址为绝对路径
    fail: function () {
      console.log('fail')
    },
    complete: function () {
      console.info("点击图片了");
    },
  })
},

  
})