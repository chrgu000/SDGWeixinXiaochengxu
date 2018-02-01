/**
 * Created by jimmy on 17/3/9.
 */
import {Base} from 'base.js';
import { Config } from 'config.js';

class Realinfo extends Base{
    constructor() {
        super();
    }

    /*获得我自己的收货地址*/
    getRealinfo(callback){
        var that=this;
        var param={
			url: 'realinfo',
            sCallback:function(res){
				if (res.errorCode == 1006) {
                    callback && callback("");
                }else{
					callback && callback(res);
				}
            }
        };
        this.request(param);
    }

    /*保存个人信息*/
    _setUpRealinfo(res,callback){
        var formData={
				name: res.inputValue1,
				mobile: res.inputValue2,
				cardid: res.inputValue3
            };
        return formData;
    }

    /*更新个人信息*/
	submitRealinfo(data,callback){
		data = this._setUpRealinfo(data);
        var param={
			url: 'realinfo',
            type:'post',
            data:data,
            sCallback:function(res){
                callback && callback(true,res);
            },eCallback(res){
                callback && callback(false,res);
            }
        };
        this.request(param);
    }
}

export { Realinfo}