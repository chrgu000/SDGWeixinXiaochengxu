
import{Base}from '../../utils/base.js'
class Gif extends Base{
  constructor(){
    super();
  }

  
  getGifAll(callback) {
    var param = {
      url: 'gif',
      sCallback: function (data) {
        callback && callback(data);
      }
    };

    this.request(param);
  }
}
export { Gif}