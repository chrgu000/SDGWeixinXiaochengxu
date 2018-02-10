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
		if (!this.IdentityCodeValid(this.data.inputValue3)){
			this.showTips('提示', '身份证号码不合法');
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
	IdentityCodeValid :function (code) { 
		var city= { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
		var pass= true;
		var  sheng  = '';
		if(!code){	
			sheng = code.substr(0, 2)
			pass = false;
		} else if (!this.isCardNo(code)){
			pass = false;
		}else {
			if (code.length == 18) {
				code = code.split('');
				console.log(code)
				var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
				//校验位
				var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
				var sum = 0;
				var ai = 0;
				var wi = 0;
				for (var i = 0; i < 17; i++) {
					ai = code[i];
					wi = factor[i];
					sum += ai * wi;
				}
				var last = parity[sum % 11];
				if (parity[sum % 11] != code[17]) {
					pass = false;
				}
			}
		}
		return pass;
	},
	isCardNo: function(card) { 
		var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
		if(reg.test(card) === false) {
			return false;
		}
		return true;
	}
	

})
