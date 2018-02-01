
import{Base}from '../../utils/base.js'
class Cbdtwo extends Base{
  constructor(){
    super();
  }

  getPlaceData(callback){
    var params = {
      url: 'place/cangtwo',
      sCallback:function(res){
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export { Cbdtwo}