
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
import { Cbdtwo } from 'cangbingdongtwo-model.js'

var cbdtwo = new Cbdtwo();
Page({
  data: {
    isStop: false,imageUrl:"https://shuidonggou88.cn/zerg/public/images/2haocang.png",
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
    
    this.setData({
      scrollWidth: windowWidth,
      scrollHeight: windowHeight,
      scaleWidth: baseWidth,
      scaleHeight: baseHeight,
      leftOffset: baseWidth * 0.2,

      pointList: [
        {
          id:0,
          name: '二号藏兵洞',
          left: (1133 /2210 )* baseWidth - 10,
          top: (179 /1254 ) * baseHeight -15,
        },
        {
          id: 1,
          name: '瓷器',
          left: (1286 / 2210) * baseWidth - 10,
          top: (457 / 1254) * baseHeight - 15,
        },
        {
          id:2,
          name: '陷阱',
          left: (1497 / 2210)* baseWidth - 10,
          top: (204 / 1254) * baseHeight -15,
        },

        {
          id: 3,
          name: '坑道',
          left: (1666 / 2210) * baseWidth - 10,
          top: (475 / 1254) * baseHeight - 15,
        },
        {
          id: 4,
          name: '石网阵及连弩机',
          left: (1821 / 2210) * baseWidth - 10,
          top: (339 / 1254) * baseHeight - 15,
        },
        {
          id: 5,
          name: '铁笼阵',
          left: (2113 / 2210) * baseWidth - 10,
          top: (287 / 1254) * baseHeight - 15,
        },
        {
          id: 6,
          name: '地下通道',
          left: (2120 / 2210) * baseWidth - 10,
          top: (671 / 1254)* baseHeight - 15,
        },
        {
          id: 7,
          name: '演武厅',
          left: (1828 / 2210) * baseWidth - 10,
          top: (677 / 1254) * baseHeight - 15,
        },
        {
          id: 8,
          name: '大型实景马战-北疆天歌',
          left: (837 / 2210) * baseWidth - 10,
          top: (264 / 1254) * baseHeight - 15,
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
              name: '二号藏兵洞',
              left: (1133 / 2210) * scaleWidth1 - 10,
              top: (179 / 1254) * scaleH1 - 15,
            },
            {
              id: 1,
              name: '瓷器',
              left: (1286 / 2210) * scaleWidth1 - 10,
              top: (457 / 1254) * scaleH1 - 15,
            },
            {
              id: 2,
              name: '陷阱',
              left: (1497 / 2210) * scaleWidth1 - 10,
              top: (204 / 1254) * scaleH1 - 15,
            },

            {
              id: 3,
              name: '坑道',
              left: (1666 / 2210) * scaleWidth1 - 10,
              top: (475 / 1254) * scaleH1 - 15,
            },
            {
              id: 4,
              name: '石网阵及连弩机',
              left: (1821 / 2210) * scaleWidth1 - 10,
              top: (339 / 1254) * scaleH1 - 15,
            },
            {
              id: 5,
              name: '铁笼阵',
              left: (2113 / 2210) * baseWidth - 10,
              top: (287 / 1254) * scaleH1 - 15,
            },
            {
              id: 6,
              name: '地下通道',
              left: (2120 / 2210) * scaleWidth1 - 10,
              top: (671 / 1254) * scaleH1 - 15,
            },
            {
              id: 7,
              name: '演武厅',
              left: (1828 / 2210) * scaleWidth1 - 10,
              top: (671 / 1254) * scaleH1 - 15,
            },
            {
              id: 8,
              name: '大型实景马战-北疆天歌',
              left: (837 / 2210) * scaleWidth1 - 10,
              top: (264 / 1254) * scaleH1 - 15,
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
    var item = cbdtwo.getDataSet(event, 'item')
    
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
    cbdtwo.getPlaceData((data) => {
      placeDetailList = data;
      
    });
  },
  sceneDetail: function () {
    wx.navigateTo({
      url: '../sceneDetail/sceneDetail?curentPlace=' + JSON.stringify(currPlace)
    })
  }
})
