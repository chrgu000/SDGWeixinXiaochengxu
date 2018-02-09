import {Product} from 'product-model.js'

var product = new Product();
import { Cart } from '../cart/cart-model.js';

var cart = new Cart();

Page({

  data: {
    
  },

  onLoad:function(){
    this._loadData();
  },
 
  _loadData:function(){
    var that = this;
    var id = 1;
    
    // 获得bannar信息
    product.getBannerData(id,(res)=>{
      console.log(res);
      that.setData({
        bannerArr: res,
      });
      
    });

    /*获取商品信息*/
    // product.getProductorAll((data) => {
    //   that.setData({
    //     productsArr: data
    //   });
    // });
    
	wx.request({
		url: 'https://shuidonggou88.cn/zerg/public/api/v1/getThirdTicket',
		method: 'get',
		header: {
			'content-type': 'application/json',
		},
		success: function (res) {
			// var list = JSON.parse(res.data)
			that.setData({
				productsArr: res.data
     		});
		}, fail: function (err) {
			that.showTips('提示', '查询失败')
		}
	})
  },

  // (res)=>{}为callBack的匿名函数
  // callBack:function(res){

  // }

  /*下拉刷新页面*/
  onPullDownRefresh: function () {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
  },

  onJoinGwc : function(event){
	  var item = product.getDataSet(event, 'item')
	  var tempObj = {}, keys = ['id', 'name', 'price'];
	  for (var key in item) {
		  if (keys.indexOf(key) >= 0) {
			  tempObj[key] = item[key];
		  }
	  }

	  cart.add(tempObj, 1);
	  wx.navigateTo({
		  url: '../cart/cart'
	  })
  },
  onProductsItemTap:function(event){
    var id = product.getDataSet(event,'id')
    if(id == 100){
      wx.navigateTo({
        url: '../biaoqingGif/biaoqingGif'
      })
    }else{
      wx.navigateTo({
        url: '../productDetail/productDetail?id=' + id
      })
    }
    
  },
})


