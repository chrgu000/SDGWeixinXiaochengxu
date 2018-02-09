import {Address} from '../../utils/address.js';
import {Order} from '../order/order-model.js';
import {My} from '../my/my-model.js';
import { Realinfo } from '../../utils/realinfo.js';
var address=new Address();
var order=new Order();
var my=new My();
var realinfo = new Realinfo();
Page({
    data: {
        pageIndex:1,
        isLoadedAll:false,
        loadingHidden:false,
        orderArr:[],
		realInfo: null,
    },
    onLoad:function(){
        this._loadData();
        
    },

    onShow:function(){
        //更新订单,相当自动下拉刷新,只有  非第一次打开 “我的”页面，且有新的订单时 才调用。
        var newOrderFlag=order.hasNewOrder();
        if(this.data.loadingHidden &&newOrderFlag){
            this.onPullDownRefresh();
        }
		this._getAddressInfo();
    },

    _loadData:function(){
        var that=this;
        my.getUserInfo((data)=>{
            that.setData({
				userInfo:data
            });

        });

        this._getOrders();
        order.execSetStorageSync(false);  //更新标志位
    },

    /**地址信息**/
    _getAddressInfo:function(){
        var that=this;
		realinfo.getRealinfo((res) => {
			console.log(res);
			that._bindMyRealInfo(res);
		});
    },
	/*绑定个人信息*/
	_bindMyRealInfo: function (rInfo) {
		this.setData({
			realInfo: rInfo
		});
	},
    /*修改或者添加地址信息*/
    editAddress:function(){
		var that = this;
		wx.navigateTo({
			url: '../realinfo/realinfo'
		})
    },

    /*绑定地址信息*/
    _bindAddressInfo:function(addressInfo){
        this.setData({
            addressInfo: addressInfo
        });
    },

    /*订单信息*/
    _getOrders:function(callback){
        var that=this;
        order.getOrders(this.data.pageIndex,(res)=>{
            var data=res.data;
            that.setData({
                loadingHidden: true
            });
            if(data.length>0) {
                that.data.orderArr.push.apply(that.data.orderArr,res.data);  //数组合并
                that.setData({
                    orderArr: that.data.orderArr
                });
            }else{
                that.data.isLoadedAll=true;  //已经全部加载完毕
                that.data.pageIndex=1;
            }
            callback && callback();
        });
    },

    /*显示订单的具体信息*/
    showOrderDetailInfo:function(event){
        var id=order.getDataSet(event,'id');
        wx.navigateTo({
            url:'../order/order?from=order&id='+id
        });
    },

    /*未支付订单再次支付*/
    rePay:function(event){
        var id=order.getDataSet(event,'id'),
            index=order.getDataSet(event,'index');

        //online 上线实例，屏蔽支付功能
        if(order.onPay) {
            this._execPay(id,index);
        }else {
            this.showTips('支付提示','支付系统还有问题，支付系统已屏蔽');
        }
    },

    /*支付*/
    _execPay:function(id,index){
        var that=this;
        order.execPay(id,(statusCode)=>{
            if(statusCode>0){
                var flag=statusCode==2;

                //更新订单显示状态
                if(flag){
                    that.data.orderArr[index].status=2;
                    that.setData({
                        orderArr: that.data.orderArr
                    });
                    that.showTips('支付成功', '您已成功支付');
                }else{
                  that.showTips('支付失败', '请重试');
                }

                //跳转到 成功页面
                
                // wx.navigateTo({
                //     url: '../apy-result/pay-result?id='+id+'&flag='+flag+'&from=my'
                // });
            }else{
                that.showTips('支付失败','商品已下架或库存不足');
            }
        });
    },

	checkCode: function (event){
		var that = this;
		that.setData({
			loadingHidden: true
		});
		var item = order.getDataSet(event, 'item');
		var rInfo = this.data.realInfo;
		var urls = 'https://shuidonggou88.cn/zerg/public/api/v1/checkThirdTicket?orderNo=' + item.order_no + '&mobileNo=' + rInfo.mobile + '&IdentityNo=' + rInfo.cardid + '&name=' + rInfo.name + '&lstCount=' + item.total_count
		
		wx.request({
			url: urls,
			method: 'get',
			header: {
				'content-type': 'application/json',
			},
			success: function (res) {
				var reserveNo = res.data.thirdReserveNo;
				
				wx.navigateTo({
					url: '../qrcode/qrcode?item=' + reserveNo
         		 });
			}, fail: function (err) {
				that.showTips('提示','查询订单失败')
			}
		})


		
	},
    /*下拉刷新页面*/
    onPullDownRefresh: function(){
        var that=this;
        this.data.orderArr=[];  //订单初始化
        this._getOrders(()=>{
            that.data.isLoadedAll=false;  //是否加载完全
            that.data.pageIndex=1;
            wx.stopPullDownRefresh();
            order.execSetStorageSync(false);  //更新标志位
        });
    },


    onReachBottom:function(){
        if(!this.data.isLoadedAll) {
            this.data.pageIndex++;
            this._getOrders();
        }
    },

    /*
     * 提示窗口
     * params:
     * title - {string}标题
     * content - {string}内容
     * flag - {bool}是否跳转到 "我的页面"
     */
    showTips:function(title,content){
        wx.showModal({
            title: title,
            content: content,
            showCancel:false,
            success: function(res) {

            }
        });
    },

})