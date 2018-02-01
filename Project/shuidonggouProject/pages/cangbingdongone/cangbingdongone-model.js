
import{Base}from '../../utils/base.js'
class Cbdone extends Base{
  constructor(){
    super();
  }

  getPlaceData(callback){
    var params = {
      url: 'place/cangone',
      sCallback:function(res){
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export { Cbdone}