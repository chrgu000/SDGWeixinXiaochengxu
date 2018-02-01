import {Product} from 'product-model.js'

var product = new Product();


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
    product.getProductorAll((data) => {
      that.setData({
        productsArr: data
      });
    });
    
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


