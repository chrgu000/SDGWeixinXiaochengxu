
var windowWidth
var windowHeight

var olddistance = 0;  //这个是上一次两个手指的距离  
var newdistance;      //本次两手指之间的距离，两个一减咱们就知道了滑动了多少，以及放大还是缩小（正负嘛）  
var oldscale = 1;     //这个是上一次动作留下的比例  
var diffdistance;     //这个是新的比例，新的比例一定是建立在旧的比例上面的，给人一种连续的假象  
var baseHeight;         
var baseWidth;        

var placeDetailList = [];

var originalScale

var app = getApp() 
var currPlace;
import { Cbdone } from 'cangbingdongone-model.js'

var cbdone = new Cbdone();
Page({
  data: {
    isStop: false,imageUrl:"https://shuidonggou88.cn/zerg/public/images/1haocang.png",
    scaleWidth: "",
    scaleHeight: "",  
    scrollWidth: "",
    scrollHeight: "", 
   
    showTanchuan:false,//显示弹窗
  },
  onLoad: function (options) {
	var that = this
    this._loadData();
	setTimeout(function () {
		if (options.defalt) {
			that.update(options.defalt);
		}
	}, 4000);
    var res = wx.getSystemInfoSync(); 
    console.log(res);
    windowWidth = res.screenWidth;
    windowHeight = res.screenHeight - 64;
    
    
  },
  //这里是图片加载完毕之后的信息，因为滑动手指距离会变，我们要跟着图片的长宽进行缩放，不能跟着屏幕的长宽进行缩放  
  imgload: function (e) {
    var originalWidth = e.detail.width;//图片原始宽  
    var originalHeight = e.detail.height;//图片原始高  
    originalScale = originalWidth / originalHeight ;
    if (originalScale > windowWidth / windowHeight){
      baseWidth = windowHeight * originalScale;
      baseHeight = windowHeight;
    }else{
      baseWidth = windowWidth;
      baseHeight = windowWidth / originalScale;
    }
    baseWidth = baseWidth * 1.5
    baseHeight = baseHeight * 1.5
    this.setData({
      scrollWidth: windowWidth,
      scrollHeight: windowHeight,
      scaleWidth: baseWidth,
      scaleHeight: baseHeight,
      leftOffset: baseWidth * 0.8,

      pointList: [
        {
          id:0,
          name: '藏兵洞',
          left: (3645 /4170 )* baseWidth - 10,
          top: (2594 /2919 ) * baseHeight -15,
        },
        {
          id: 1,
          name: '坑道',
          left: (1354 / 4170) * baseWidth - 10,
          top: (727 / 2919) * baseHeight - 15,
        },
        
        {
          id:2,
          name: '议事厅',
          left: (3040 / 4170)* baseWidth - 10,
          top: (1540 / 2919) * baseHeight -15,
        },

        {
          id: 3,
          name: '火药库',
          left: (3490 / 4170) * baseWidth - 10,
          top: (1600 / 2919) * baseHeight - 15,
        },
        {
          id: 4,
          name: '哨岗和粮仓',
          left: (3662 / 4170) * baseWidth - 10,
          top: (1290 / 2919) * baseHeight - 15,
        },
        {
          id: 5,
          name: '炮台与瞭望台',
          left: (3980 / 4170) * baseWidth - 10,
          top: (1600 / 2919) * baseHeight - 15,
        },
        {
          id: 6,
          name: '地下二层',
          left: (3980 / 4170) * baseWidth - 10,
          top: (1950 / 2919)* baseHeight - 15,
        },

        {
          id: 7,
          name: '将军洞',
          left: (3370 / 4170) * baseWidth - 10,
          top: (2020 / 2919) * baseHeight - 15,
        },
        {
          id: 8,
          name: '生死门',
          left: (1560 / 4170) * baseWidth - 10,
          top: (860 / 2919) * baseHeight - 15,
        },
        {
          id: 9,
          name: '防御洞道及大型陷阱',
          left: (2910 / 4170) * baseWidth - 10,
          top: (2060 / 2919) * baseHeight - 15,
        },
        
        {
          id: 10,
          name: '软绳阵、翻版及滚木',
          left: (1134 / 4170) * baseWidth - 10,
          top: (1146 / 2919) * baseHeight - 15,
        },
        {
          id: 11,
          name: '宁夏长城博物馆',
          left: (742 / 4170) * baseWidth - 10,
          top: (570 / 2919) * baseHeight - 15,
        },
        {
          id: 12,
          name: '陷阱',
          left: (758 / 4170) * baseWidth - 10,
          top: (1438 / 2919) * baseHeight - 15,
        },
        

      ]

    })
  },
  begintap: function (event){
    
  },
  //两手指进行拖动了  
  movetap: function (event) {
    var e = event;
    if (e.touches.length == 2) {
      var xMove = e.touches[1].clientX - e.touches[0].clientX;
      var yMove = e.touches[1].clientY - e.touches[0].clientY;
      var distance = Math.sqrt(xMove * xMove + yMove * yMove);//两手指之间的距离   
      if (olddistance == 0) {
        olddistance = distance; //要是第一次就给他弄上值，什么都不操作  
      }
      else {
        newdistance = distance; //第二次就可以计算它们的差值了  
        diffdistance = newdistance - olddistance;
        olddistance = newdistance; //计算之后更新  
        var newScale = oldscale + 0.005 * diffdistance;  //比例   

        var scaleWidth1 = baseWidth *  newScale;
        var scaleH1 = baseHeight *  newScale;
        if (originalScale > windowWidth / windowHeight) {
          if (scaleH1 < windowHeight) {

            scaleWidth1 = baseWidth;
            scaleH1 = baseHeight;
            oldscale = 1;
          }
        } else {
          if (scaleWidth1 < windowWidth) {

            scaleWidth1 = baseWidth;
            scaleH1 = baseHeight;
            oldscale = 1;
          }
        }

        
        
        //刷新.wxml  
        this.setData({
          scaleHeight: scaleH1,
          scaleWidth: scaleWidth1,
          pointList: [
            {
              id: 0,
              name: '藏兵洞',
              left: (3645 / 4170) * scaleWidth1 - 10,
              top: (2594 / 2919) * scaleH1 - 15,
            },
            {
              id: 1,
              name: '坑道',
              left: (1354 / 4170) * scaleWidth1 - 10,
              top: (727 / 2919) * scaleH1 - 15,
            },
            
            
            {
              id: 2,
              name: '议事厅',
              left: (3040 / 4170) * scaleWidth1 - 10,
              top: (1540 / 2919) * scaleH1 - 15,
            },

            {
              id: 3,
              name: '火药库',
              left: (3490 / 4170) * scaleWidth1 - 10,
              top: (1600 / 2919) * scaleH1 - 15,
            },
            {
              id: 4,
              name: '哨岗和粮仓',
              left: (3662 / 4170) * scaleWidth1 - 10,
              top: (1290 / 2919) * scaleH1 - 15,
            },
            {
              id: 5,
              name: '炮台与瞭望台',
              left: (3980 / 4170) * scaleWidth1 - 10,
              top: (1600 / 2919) * scaleH1 - 15,
            },
            {
              id: 6,
              name: '地下二层',
              left: (3980 / 4170) * baseWidth - 10,
              top: (1950 / 2919) * scaleH1 - 15,
            },

            {
              id: 7,
              name: '将军洞',
              left: (3370 / 4170) * baseWidth - 10,
              top: (2020 / 2919) * scaleH1 - 15,
            },
            {
              id: 8,
              name: '生死门',
              left: (1560 / 4170) * scaleWidth1 - 10,
              top: (860 / 2919) * scaleH1 - 15,
            },
            {
              id: 9,
              name: '防御洞道及大型陷阱',
              left: (2910 / 4170) * scaleWidth1 - 10,
              top: (2060 / 2919) * scaleH1 - 15,
            },
            
            {
              id: 10,
              name: '软绳阵、翻版及滚木',
              left: (1134 / 4170) * scaleWidth1 - 10,
              top: (1146 / 2919) * scaleH1 - 15,
            },
            {
              id: 11,
              name: '宁夏长城博物馆',
              left: (742 / 4170) * scaleWidth1 - 10,
              top: (570 / 2919) * scaleH1 - 15,
            },
            {
              id: 12,
              name: '陷阱',
              left: (758 / 4170) * scaleWidth1 - 10,
              top: (1438 / 2919) * scaleH1 - 15,
            },
          ]

        })
        oldscale = newScale;
        //更新比例  

      }
    }
  },
  endtap: function (event) {
      olddistance = 0;
  },

  bofangImageTap: function (event) {
    var that = this;
    var src1 = this.data.currentPlace.src
    console.log(src1)
    wx.playBackgroundAudio({
      dataUrl: src1,
      success: function () {
      },
      fail: function () {
      }
    }, )
    that.setData({
      isStop: true,
    })

  },
  stopImageTap: function (event) {
    wx.pauseBackgroundAudio()
    this.setData({
      isStop: false,
    })
  },
  playAudio: function (event) {
    var item = cbdone.getDataSet(event, 'item')
    
    if (placeDetailList.length > 0) {

      currPlace = placeDetailList[item.id];
      var lanType = wx.getStorageSync('language');
      if (lanType == 0) {
        this.setData({
          showTanchuan: true,
          currentPlace: {
            // poster: currPlace.poster,
            name: currPlace.cn_name,
            // author: currPlace.author,
            src: currPlace.voiceurl0,
            desc: currPlace.cn_desc,
          },
        })
      } else if (lanType == 1) {
        this.setData({
          showTanchuan: true,
          currentPlace: {
            // poster: currPlace.poster,
            name: currPlace.en_name,
            // author: currPlace.author,
            src: currPlace.voiceurl1,
            desc: currPlace.en_desc,
          },
        })
      } else {
        this.setData({
          showTanchuan: true,
          currentPlace: {
            // poster: currPlace.poster,
            name: currPlace.cn_name,
            // author: currPlace.author,
            src: currPlace.voiceurl2,
            desc: currPlace.cn_desc,
          },
        })
      }
    }
  },
  update: function (options) {
	  var that = this;
	  if (placeDetailList.length > 0) {
		  currPlace = placeDetailList[options];
		  var lanType = wx.getStorageSync('language');
		  if (lanType == 0) {
			  this.setData({
				  showTanchuan: true,
				  currentPlace: {
					  // poster: currPlace.poster,
					  name: currPlace.cn_name,
					  // author: currPlace.author,
					  src: currPlace.voiceurl0,
					  desc: currPlace.cn_desc,
				  },
			  })
		  } else if (lanType == 1) {
			  this.setData({
				  showTanchuan: true,
				  currentPlace: {
					  // poster: currPlace.poster,
					  name: currPlace.en_name,
					  // author: currPlace.author,
					  src: currPlace.voiceurl1,
					  desc: currPlace.en_desc,
				  },
			  })
		  } else {
			  this.setData({
				  showTanchuan: true,
				  currentPlace: {
					  // poster: currPlace.poster,
					  name: currPlace.cn_name,
					  // author: currPlace.author,
					  src: currPlace.voiceurl2,
					  desc: currPlace.cn_desc,
				  },
			  })
		  }

		  var src1 = this.data.currentPlace.src
		  console.log(src1)
		  wx.playBackgroundAudio({
			  dataUrl: src1,
			  success: function () {
			  },
			  fail: function () {
			  }
		  }, )
		  that.setData({
			  isStop: true,
		  })
	  }

  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    wx.stopBackgroundAudio();
    this.setData({
      showTanchuan: false,
      isStop: false,
    })
  },
  _loadData: function () {
    var that = this;
    cbdone.getPlaceData((data) => {
      placeDetailList = data;
      
    });
  },
  sceneDetail: function () {
    wx.navigateTo({
      url: '../sceneDetail/sceneDetail?curentPlace=' + JSON.stringify(currPlace)
    })
  }
})
