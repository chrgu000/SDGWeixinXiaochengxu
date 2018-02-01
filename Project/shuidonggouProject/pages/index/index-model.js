
import{Base}from '../../utils/base.js'
class Index extends Base{
  constructor(){
    super();
  }

  getPlaceData(callback){
    var params = {
      url: 'place',
      sCallback:function(res){
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export {Index}