import { Realinfo } from '../../utils/realinfo.js';
var realinfo = new Realinfo();
Page({
	data: {
		focus: false,
		inputValue1: '',
		inputValue2: '',
		inputValue3: '',
	},
	bindKeyInput1: function (e) {
		this.setData({
			inputValue1: e.detail.value
		})
	},
	bindKeyInput2: function (e) {
		this.setData({
			inputValue2: e.detail.value
		})
	},
	bindKeyInput3: function (e) {
		this.setData({
			inputValue3: e.detail.value
		})
	},
	save: function (e) {
		if (!this.data.inputValue1){
			this.showTips('提示', '请填写您的姓名');
			return;
		}
		if (!this.isPoneAvailable(this.data.inputValue2)) {
			this.showTips('提示', '请填写正确的手机号码');
			return;
		}
		if (!this.isCardNo(this.data.inputValue3)){
			return;
		}
		var that = this;
		realinfo.submitRealinfo(this.data,(res) => {
			var that = this;
			wx.showModal({
				title: '提示',
				content: '保存成功',
				showCancel: false,
				success: function (res) {
					// var pages = getCurrentPages();
					// var currPage = pages[pages.length - 1];   //当前页面
					// var prevPage = pages[pages.length - 2];  //上一个页面

					// //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
					// prevPage.setData({
					// 	realInfo: { name: that.data.inputValue1, mobile: that.data.inputValue2, cardid: that.data.inputValue3 }
					// })
					wx.navigateBack()
				}
			});
			
		});

	},

	showTips: function (title, content, flag) {
		wx.showModal({
			title: title,
			content: content,
			showCancel: false,
			success: function (res) {
				if (flag) {
					// wx.switchTab({
					// 	url: '/pages/my/my'
					// });
				}
			}
		});
	},
	isPoneAvailable: function (pone) {
		var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
		if (!myreg.test(pone)) {
			return false;
		} else {
			return true;
		}
	},
	isCardNo : 	function (card)  {  
		// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
		var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
		if(reg.test(card) === false) {
			this.showTips('提示', '身份证号码不合法');
			return false;
		}else{
			return true;
		}
	} 
})
