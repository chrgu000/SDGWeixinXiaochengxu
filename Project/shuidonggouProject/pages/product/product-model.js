
import{Base}from '../../utils/base.js'
class Product extends Base{
  constructor(){
    super();
  }

  getBannerData(id,callback){
    var params = {
      url: 'banner/'+id,
      sCallback:function(res){
        callback && callback(res.items)
      }
    }
    this.request(params)
  }


  /*首页商品列表*/
  getProductorAll(callback) {
    var param = {
      url: 'product/recent',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    
    this.request(param);
  }
  
}
export { Product}