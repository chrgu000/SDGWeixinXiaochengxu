
import{Base}from '../../utils/base.js'
class BBowuguan extends Base{
  constructor(){
    super();
  }

  getPlaceData(callback){
    var params = {
      url: 'place/bowuguan',
      sCallback:function(res){
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export { BBowuguan}