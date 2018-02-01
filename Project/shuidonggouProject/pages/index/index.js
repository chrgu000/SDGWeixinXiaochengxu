import { Index } from 'index-model.js'
var windowWidth
var windowHeight

var olddistance = 0;  //这个是上一次两个手指的距离  
var newdistance;      //本次两手指之间的距离，两个一减咱们就知道了滑动了多少，以及放大还是缩小（正负嘛）  
var oldscale = 1;     //这个是上一次动作留下的比例  
var diffdistance;     //这个是新的比例，新的比例一定是建立在旧的比例上面的，给人一种连续的假象  
var baseHeight;         
var baseWidth;        

var placeDetailList = [];
var timer;

var originalScale

var app = getApp() 
var currPlace;

var playRecord = [];


var index = new Index();

Page({
  data: {
    imageUrl:"https://shuidonggou88.cn/zerg/public/images/shuidonggouZhengti.png",
    scaleWidth: "",
    scaleHeight: "",  
    scrollWidth: "",
    scrollHeight: "-100", 
    scenicPot1:{
      left: 0.18176 * baseWidth,
      top: 0.082 * baseHeight
    },
    isStop:false,
    showTanchuan:false,//显示弹窗
    showYouxiantu1: false,
    showYouxiantu2: false,
    showYouxiantu3: false,
  },
  onLoad: function (options) {
   
    var that = this;
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isStop: false,
      })
      
    });
    this._loadData();
	setTimeout(function () {
		if (options.defalt){
			that.update(options.defalt);
		}
	}, 4000);
    var res = wx.getSystemInfoSync(); 
    console.log(res);
    windowWidth = res.screenWidth;
    windowHeight = res.windowHeight;

    var that = this
    timer = setInterval(function(){
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          console.log(res)
          wx.stopBackgroundAudio();
          that.setData({
            showTanchuan: false,
            locationPlace: {
              longitude: res.longitude,
              latitude: res.latitude
            },
            isStop: false,
          })
          that.autoPlay();
        }
      })
    }, 300000)
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
    baseWidth = baseWidth *2
    baseHeight = baseHeight * 2
    this.setData({
      scrollWidth: windowWidth,
      scrollHeight: windowHeight,
      scaleWidth: baseWidth,
      scaleHeight: baseHeight,

      leftOffset:baseWidth * 0.63,

      locationPoint: {
        left: 20,
        top: windowHeight - 130
      },
      youxiantu1:{
        left: (707 / 4170) * baseWidth,
        top: (643 / 2385) * baseHeight,
        width: (1818 / 4170) * baseWidth - (707 / 4170) * baseWidth,
        height: (1627 / 2385) * baseHeight - (643 / 2385) * baseHeight,
      },
      youxiantu2: {
        left: (709 / 4170) * baseWidth,
        top: (643 / 2385) * baseHeight,
        width: (3636 / 4170) * baseWidth - (709 / 4170) * baseWidth,
        height: (1911 / 2385) * baseHeight - (643 / 2385) * baseHeight,
      },
      youxiantu3: {
        left: (708 / 4170) * baseWidth,
        top: (444 / 2385) * baseHeight,
        width: (3636 / 4170) * baseWidth - (708 / 4170) * baseWidth,
        height: (1916 / 2385) * baseHeight - (444 / 2385) * baseHeight,
      },

      pointList: [
        {
          id:0,
          name: '大门口',
          left: 0.41151 * baseWidth - 15,
          top: 0.64864 * baseHeight -23,
          longitude: 106.50878,
          latitude: 38.290108,
          // latitude:31.820587,
          // longitude:117.227239,
          radius:10,

        },
        {
          id: 1,
          name: '水洞沟VR游戏-‘天降神石’',
          left: 0.44365 * baseWidth - 15,
          top: 0.62138 * baseHeight - 23,
          longitude: 106.5092,
          latitude: 38.2904,
          radius: 10,

        },
        {
          id: 2,
          name: '石器广场石柱',
          left: 0.42542 * baseWidth - 15,
          top: 0.55765 * baseHeight - 15,
          longitude: 106.5097,
          latitude: 38.29104,
          radius: 10,

        },
        {

          id: 3,
          name: '博物馆入口',
          left: 0.36067 * baseWidth - 15,
          top: 0.60545 * baseHeight - 23,
          longitude: 106.5091,
          latitude: 38.29109,
          radius: 10,

        },
        {
          id: 4,
          name: '张三小店',
          left: 0.39736 * baseWidth - 15,
          top: 0.50608 * baseHeight - 23,
          longitude: 106.5092,
          latitude: 38.29293,
          radius: 15,

        },
        {
          id: 5,
          name: '水洞沟村',
          left: 0.35132 * baseWidth - 15,
          top: 0.51991 * baseHeight - 23,
          longitude: 106.5088,
          latitude: 38.2933,
          radius: 15,

        },

        {
          id: 6,
          name: '尖状碑',
          left: 0.28153 * baseWidth - 15,
          top: 0.5912 * baseHeight - 23,
          longitude: 106.5078,
          latitude: 38.2938,
          radius: 3,

        },
        
        {
          id: 7,
          name: '遗址发掘点',
          left: 0.31223 * baseWidth - 15,
          top: 0.46122 * baseHeight - 23,
          longitude: 106.5066,
          latitude: 38.29831,
          radius: 5,

        },
        {
          id: 8,
          name: '芦花谷',
          left: 0.30695 * baseWidth - 15,
          top: 0.38826 * baseHeight - 23,
          longitude: 106.5059,
          latitude: 38.29842,
          radius: 5,

        },
        {
          id: 9,
          name: '山神庙',
          left: 0.26739 * baseWidth - 15,
          top: 0.4109 * baseHeight - 23,
          longitude: 106.5055,
          latitude: 38.29937,
          radius: 5,

        },

        {
          id: 10,
          name: '鸳鸯湖与魔鬼城',
          left: 0.18225 * baseWidth - 15,
          top: 0.48218 * baseHeight - 23,
          longitude: 106.5055,
          latitude: 38.29907,
          radius: 5,

        },

        {
          id: 11,
          name: '长城',
          left: 0.23693 * baseWidth - 15,
          top: 0.37736 * baseHeight - 23,
          longitude: 106.5057,
          latitude: 38.3004,
          radius: 15,

        },

        {
          id: 12,
          name: '红山湖',
          left: 0.43789 * baseWidth - 15,
          top: 0.29434 * baseHeight - 15,
          longitude: 106.513,
          latitude: 38.29673,
          radius: 20,
        },

        {
          id: 13,
          name: '红山堡互市',
          left: 0.7194 * baseWidth - 15,
          top: 0.244 * baseHeight - 23,
          longitude: 106.5284,
          latitude: 38.27831,
          radius: 10,
        },
        {
          id: 14,
          name: '大峡谷',
          left: 0.7194 * baseWidth - 10,
          top: 0.382 * baseHeight - 23,
          longitude: 106.5284,
          latitude: 38.27841,
          radius: 20,
        },
        {
          id: 15,
          name: '大型实景马战 - <北疆天歌>',
          left: 0.63477 * baseWidth - 15,
          top: 0.22 * baseHeight - 23,
          longitude: 106.513,
          latitude: 38.29673,
          radius: 20,
        },
        {
          id: 16,
          name: '二号藏兵洞',
          left: (2883 / 4170) * baseWidth - 15,
          top: (854 / 2385) * baseHeight - 23,
          longitude: 106.5273,
          latitude: 38.27767,
          radius: 10,
        },
        {
          id: 17,
          name: '红柳滩',
          left: (2585 / 4170) * baseWidth - 15,
          top: (1028 / 2385) * baseHeight - 23,
          longitude: 106.513,
          latitude: 38.29673,
          radius: 20,
        },
        {
          id: 18,
          name: '红山堡',
          left: 0.7657 * baseWidth - 15,
          top: 0.7128 * baseHeight - 23,
          longitude: 106.5257,
          latitude: 38.27625,
          radius: 10,
        },
        {
          id: 19,
          name: '沙枣湾',
          left: (1975 / 4170) * baseWidth - 15,
          top: (1072 / 2385) * baseHeight - 23,
          longitude: 106.5186,
          latitude: 38.29292,
          radius: 10,
        },
        {
          id: 20,
          name: '水洞沟北区',
          left: (969 / 4170) * baseWidth - 15,
          top: (696 / 2385) * baseHeight - 23,
          longitude: 106.513,
          latitude: 38.29673,
          radius: 20,
        },
        {
          id: 21,
          name: '穿越 归来',
          left: (3727 / 4170) * baseWidth - 10,
          top: (1480 / 2385) * baseHeight - 23,
          longitude: 106.5265,
          latitude: 38.27462,
          radius: 10,
        },
        {
          id: 22,
          name: '水洞沟吉祥物Simple家族',
          left: (2122 / 4170) * baseWidth - 15,
          top: (1280 / 2385) * baseHeight - 15,
          longitude: 106.513,
          latitude: 38.29673,
          radius: 20,
        },
        {
          id: 23,
          name: '瓮城',
          left: (3458 / 4170) * baseWidth - 15,
          top: (1423 / 2385) * baseHeight - 15,
          longitude: 106.5259,
          latitude: 38.27601,
          radius: 5,
        },
        {
          id: 24,
          name: '野性草原牧家乐餐饮娱乐区',
          left: (1215 / 4170) * baseWidth - 15,
          top: (282 / 2385) * baseHeight - 23,
          longitude: 106.5147,
          latitude: 38.30104,
          radius: 30,
        },
        {
          id: 25,
          name: '藏兵洞',
          left: (3348 / 4170) * baseWidth - 15,
          top: (675 / 2385) * baseHeight - 23,
          longitude: 106.5275,
          latitude: 38.27744,
          radius: 10,
        },
        {
          id: 26,
          name: '宁夏长城博物馆',
          left: (3190 / 4170) * baseWidth - 15,
          top: (1440 / 2385) * baseHeight - 23,
          longitude: 106.5285,
          latitude: 38.27661,
          radius: 10,
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
          if (scaleH1 < windowHeight*2) {

            scaleWidth1 = baseWidth;
            scaleH1 = baseHeight;
            oldscale = 1;
          }
          if (scaleH1 > windowHeight * 3){
            return
          }
        } else {
          if (scaleWidth1 < windowWidth*2) {

            scaleWidth1 = baseWidth;
            scaleH1 = baseHeight;
            oldscale = 1;
          }
          if (scaleWidth1 > windowWidth * 3) {
            return
          }
        }

        
        
        //刷新.wxml  
        this.setData({
          scaleHeight: scaleH1,
          scaleWidth: scaleWidth1,
          pointList: [
            {
              id:0,
              name: '大门口',
              left: 0.41151 * scaleWidth1 - 15,
              top: 0.64864 * scaleH1 - 23,
              longitude: 106.50878,
              latitude: 38.290108,
              radius: 10,

            },
            {
              id: 1,
              name: '水洞沟VR游戏-‘天降神石’',
              left: 0.44365 * scaleWidth1 - 15,
              top: 0.62138 * scaleH1 - 23,
              longitude: 106.5092,
              latitude: 38.2904,
              radius: 10,

            },
            {
              id: 2,
              name: '石器广场石柱',
              left: 0.42542 * scaleWidth1 - 15,
              top: 0.55765 * scaleH1 - 23,
              longitude: 106.5097,
              latitude: 38.29104,
              radius: 10,

            },
            {
              id: 3,
              name: '博物院入口',
              left: 0.36067 * scaleWidth1 - 15,
              top: 0.60545 * scaleH1 - 23,
              longitude: 106.5091,
              latitude: 38.29109,
              radius: 10,

            },

            {
              id: 4,
              name: '张三小店',
              left: 0.39736 * scaleWidth1 - 15,
              top: 0.50608 * scaleH1 - 23,
              longitude: 106.5092,
              latitude: 38.29293,
              radius: 15,

            },
            {
              id: 5,
              name: '水洞沟村',
              left: 0.35132 * scaleWidth1 - 15,
              top: 0.51991 * scaleH1 - 23,
              longitude: 106.5088,
              latitude: 38.2933,
              radius: 15,

            },

            {
              id: 6,
              name: '尖状碑',
              left: 0.28153 * scaleWidth1 - 15,
              top: 0.5912 * scaleH1 - 23,
              longitude: 106.5078,
              latitude: 38.2938,
              radius: 3,

            },
            
            {
              id: 7,
              name: '遗址发掘点',
              left: 0.31223 * scaleWidth1 - 15,
              top: 0.46122 * scaleH1 - 23,
              longitude: 106.5066,
              latitude: 38.29831,
              radius: 5,

            },
            {
              id: 8,
              name: '芦花谷',
              left: 0.30695 * scaleWidth1 - 15,
              top: 0.38826 * scaleH1 - 23,
              longitude: 106.5059,
              latitude: 38.29842,
              radius: 5,

            },
            {
              id: 9,
              name: '山神庙',
              left: 0.26739 * scaleWidth1 - 15,
              top: 0.4109 * scaleH1 - 23,
              longitude: 106.5055,
              latitude: 38.29937,
              radius: 5,

            },

            {
              id: 10,
              name: '鸳鸯湖与魔鬼城',
              left: 0.18225 * scaleWidth1 - 15,
              top: 0.48218 * scaleH1 - 23,
              longitude: 106.5055,
              latitude: 38.29907,
              radius: 5,

            },

            {
              id: 11,
              name: '明长城',
              left: 0.23693 * scaleWidth1 - 15,
              top: 0.37736 * scaleH1 - 23,
              longitude: 106.5057,
              latitude: 38.3004,
              radius: 15,

            },

            {
              id: 12,
              name: '红山湖',
              left: 0.43789 * scaleWidth1 - 15,
              top: 0.29434 * scaleH1 - 23,
              longitude: 106.513,
              latitude: 38.29673,
              radius: 20,

            },
            {
              id: 13,
              name: '红山堡互市',
              left: 0.7194 * scaleWidth1 - 15,
              top: 0.244 * scaleH1 - 23,
              longitude: 106.5284,
              latitude: 38.27831,
              radius: 10,
            },
            {
              id: 14,
              name: '大峡谷',
              left: 0.7194 * scaleWidth1 - 15,
              top: 0.382 * scaleH1 - 23,
              longitude: 106.5284,
              latitude: 38.27841,
              radius: 20,
            },
            {
              id: 15,
              name: '大型实景马战 - <北疆天歌>',
              left: 0.63477 * scaleWidth1 - 15,
              top: 0.22 * scaleH1 - 23,
              longitude: 106.513,
              latitude: 38.29673,
              radius: 20,
            },
            {
              id: 16,
              name: '二号藏兵洞',
              left: 0.6882 * scaleWidth1 - 15,
              top: 0.354 * scaleH1 - 23,
              longitude: 106.5273,
              latitude: 38.27767,
              radius: 10,
            },
            {
              id: 17,
              name: '红柳滩',
              left: 0.6175 * scaleWidth1 - 15,
              top: 0.4235 * scaleH1 - 23,
              longitude: 106.513,
              latitude: 38.29673,
              radius: 20,
            },
            {
              id: 18,
              name: '红山堡',
              left: 0.7657 * scaleWidth1 - 15,
              top: 0.7128 * scaleH1 - 23,
              longitude: 106.5257,
              latitude: 38.27625,
              radius: 10,
            },
            {
              id: 19,
              name: '沙枣湾',
              left: (1975 / 4170) * scaleWidth1 - 15,
              top: (1072 / 2385) * scaleH1 - 23,
              longitude: 106.5186,
              latitude: 38.29292,
              radius: 10,
            },
            {
              id: 20,
              name: '水洞沟北区',
              left: (969 / 4170) * scaleWidth1 - 15,
              top: (696 / 2385) * scaleH1 - 23,
              longitude: 106.513,
              latitude: 38.29673,
              radius: 30,
            },
            {
              id: 21,
              name: '穿越 归来',
              left: (3727 / 4170) * scaleWidth1 - 15,
              top: (1480 / 2385) * scaleH1 - 23,
              longitude: 106.513,
              latitude: 38.29673,
              radius: 20,
            },
            {
              id: 22,
              name: '水洞沟吉祥物Simple家族',
              left: (2122 / 4170) * scaleWidth1 - 15,
              top: (1280 / 2385) * scaleH1 - 23,
              longitude: 106.513,
              latitude: 38.29673,
              radius: 20,
            },
            {
              id: 23,
              name: '瓮城',
              left: (3458 / 4170) * scaleWidth1 - 15,
              top: (1423 / 2385) * scaleH1 - 23,
              longitude: 106.5259,
              latitude: 38.27601,
              radius: 5,
            },
            {
              id: 24,
              name: '野性草原牧家乐餐饮娱乐区',
              left: (1215 / 4170) * scaleWidth1 - 15,
              top: (282 / 2385) * scaleH1 - 23,
              longitude: 106.513,
              latitude: 38.29673,
              radius: 20,
            },
            {
              id: 25,
              name: '藏兵洞',
              left: (3348 / 4170) * scaleWidth1 - 15,
              top: (675 / 2385) * scaleH1 - 23,
              longitude: 106.5275,
              latitude: 38.27744,
              radius: 10,
            },
            {
              id: 26,
              name: '宁夏长城博物馆',
              left: (3190 / 4170) * scaleWidth1 - 15,
              top: (1445 / 2385) * scaleH1 - 23,
              longitude: 106.5285,
              latitude: 38.27661,
              radius: 10,
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
  bofangImageTap: function (event){
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
      isStop : true,
    })
  
  },
  stopImageTap: function (event){
    wx.pauseBackgroundAudio()
    this.setData({
      isStop: false,
    })
  },
  
  playAudio:function(e){
    // if (this.data.showYouxiantu1 || this.data.showYouxiantu2 || this.data.showYouxiantu3){
    //   return
    // }
    var item = e.target.dataset.items
    // if(item.id == 3){
    //   wx.navigateTo({
    //     url: '../Bowuguan/Bowuguan'
    //   })
    // } else if (item.id == 25) {
    //   wx.navigateTo({
    //     url: '../cangbingdongone/cangbingdongone'
    //   })
    // } else if (item.id == 16) {
    //   wx.navigateTo({
    //     url: '../cangbingdongtwo/cangbingdongtwo'
    //   })
    // }
    // else{
      if (placeDetailList.length > 0){
        
        currPlace = placeDetailList[item.id];
        var lanType = wx.getStorageSync('language');
        if (lanType == 0) {
          this.setData({
            showTanchuan: true,
            currentPlace: {
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
      
      
    // }
    
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    wx.stopBackgroundAudio();
    this.setData({
      showTanchuan: false,
      isStop: false,
      })
  },

  setLanguage:function(e){
    wx.showActionSheet({
      itemList: ['普通话', '英语', '宁夏方言'],
      success: function (res) {
        wx.setStorageSync('language', res.tapIndex);
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  switch1Change:function(e){
    wx.setStorageSync('autoPlay', e.detail.value);
  },


  _loadData: function () {
    var that = this;
    index.getPlaceData((data) => {
      placeDetailList = data;
    });
  },

  doLocation:function(){
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var s = that.getDistance(38.29, 106.51, res.latitude,res.longitude)
        if(s/1000 >5){
          that.showTips('游客你好', '您距离我们有4万年，快来水洞沟穿越吧！');
        }else{
          that.autoPlay();
        }
    
      }
    })
  },
  getDistance: function (lat1, lng1, lat2, lng2) {
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;

    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

    var r = 6378137;
    return r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
  },
  showTips: function (title, content, flag) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success: function (res) {
        if (flag) {
          
        }
      }
    });
  },

  youxiantuTap: function(){
    var that = this
    wx.showActionSheet({
      itemList: ['无', '76元 景区门票', '140元 南区通票', '240元 南北区通票'],
      success: function (res) {
        if (res.tapIndex == 0) {
          that.setData({
            showYouxiantu1: false,
            showYouxiantu2: false,
            showYouxiantu3: false,
          })
        }
        if(res.tapIndex == 1){
          that.setData({
            showYouxiantu1: true,
            showYouxiantu2: false,
            showYouxiantu3: false,
          })
        }
        if(res.tapIndex == 2){
          that.setData({
            showYouxiantu1: false,
            showYouxiantu2: true,
            showYouxiantu3: false,
          })
        }
        if (res.tapIndex == 3) {
          that.setData({
            showYouxiantu1: false,
            showYouxiantu2: false,
            showYouxiantu3: true,
          })
        }
        
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  jingquTap: function () {
    var that = this
    wx.showActionSheet({
      itemList: ['景区整体', '水洞沟遗址博物院', '一号藏兵洞','二号藏兵洞'],
      success: function (res) {
        if (res.tapIndex == 0) {
          that.setData({
            showYouxiantu1: false,
            showYouxiantu2: false,
            showYouxiantu3: false,
          })
        }
        if (res.tapIndex == 1) {
          wx.navigateTo({
            url: '../Bowuguan/Bowuguan'
          })
        } else if (res.tapIndex == 2) {
          wx.navigateTo({
            url: '../cangbingdongone/cangbingdongone'
          })
        } else if (res.tapIndex == 3) {
          wx.navigateTo({
            url: '../cangbingdongtwo/cangbingdongtwo'
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  sceneDetail:function(){
    wx.navigateTo({
      url: '../sceneDetail/sceneDetail?curentPlace=' + JSON.stringify(currPlace)
    })
  },
  dofangda: function(){
    var scaleH1 = baseHeight * 3;
    var scaleWidth1 = baseWidth * 3;
    leftOffset: scaleWidth1 * 0.63,
    this.setData({
      scaleHeight: scaleH1,
      scaleWidth: scaleWidth1,
      youxiantu1: {
        left: (707 / 4170) * scaleWidth1,
        top: (643 / 2385) * scaleH1,
        width: (1818 / 4170) * scaleWidth1 - (707 / 4170) * scaleWidth1,
        height: (1627 / 2385) * scaleH1 - (643 / 2385) * scaleH1,
      },
      youxiantu2: {
        left: (709 / 4170) * scaleWidth1,
        top: (643 / 2385) * scaleH1,
        width: (3636 / 4170) * scaleWidth1 - (709 / 4170) * scaleWidth1,
        height: (1911 / 2385) * scaleH1 - (643 / 2385) * scaleH1,
      },
      youxiantu3: {
        left: (708 / 4170) * scaleWidth1,
        top: (444 / 2385) * scaleH1,
        width: (3636 / 4170) * scaleWidth1 - (708 / 4170) * scaleWidth1,
        height: (1916 / 2385) * scaleH1 - (444 / 2385) * scaleH1,
      },

      pointList: [
        {
          id: 0,
          name: '大门口',
          left: 0.41151 * scaleWidth1 - 15,
          top: 0.64864 * scaleH1 - 23,
          longitude: 106.50878,
          latitude: 38.290108,
          radius: 10,

        },
        {
          id: 1,
          name: '水洞沟VR游戏-‘天降神石’',
          left: 0.44365 * scaleWidth1 - 15,
          top: 0.62138 * scaleH1 - 15,
          longitude: 106.5092,
          latitude: 38.2904,
          radius: 10,

        },
        {
          id: 2,
          name: '石器广场石柱',
          left: 0.42542 * scaleWidth1 - 15,
          top: 0.55765 * scaleH1 - 23,
          longitude: 106.5097,
          latitude: 38.29104,
          radius: 10,

        },
        {
          id: 3,
          name: '博物馆入口',
          left: 0.36067 * scaleWidth1 - 15,
          top: 0.60545 * scaleH1 - 23,
          longitude: 106.5091,
          latitude: 38.29109,
          radius: 10,

        },

        {
          id: 4,
          name: '张三小店',
          left: 0.39736 * scaleWidth1 - 15,
          top: 0.50608 * scaleH1 - 23,
          longitude: 106.5092,
          latitude: 38.29293,
          radius: 15,

        },
        {
          id: 5,
          name: '水洞沟村',
          left: 0.35132 * scaleWidth1 - 15,
          top: 0.51991 * scaleH1 - 15,
          longitude: 106.5088,
          latitude: 38.2933,
          radius: 15,

        },

        {
          id: 6,
          name: '尖状碑',
          left: 0.28153 * scaleWidth1 - 15,
          top: 0.5912 * scaleH1 - 23,
          longitude: 106.5078,
          latitude: 38.2938,
          radius: 3,

        },

        {
          id: 7,
          name: '遗址发掘点',
          left: 0.31223 * scaleWidth1 - 15,
          top: 0.46122 * scaleH1 - 15,
          longitude: 106.5066,
          latitude: 38.29831,
          radius: 5,

        },
        {
          id: 8,
          name: '芦花谷',
          left: 0.30695 * scaleWidth1 - 15,
          top: 0.38826 * scaleH1 - 23,
          longitude: 106.5059,
          latitude: 38.29842,
          radius: 5,

        },
        {
          id: 9,
          name: '山神庙',
          left: 0.26739 * scaleWidth1 - 15,
          top: 0.4109 * scaleH1 - 15,
          longitude: 106.5055,
          latitude: 38.29937,
          radius: 5,

        },

        {
          id: 10,
          name: '鸳鸯湖与魔鬼城',
          left: 0.18225 * scaleWidth1 - 15,
          top: 0.48218 * scaleH1 - 23,
          longitude: 106.5055,
          latitude: 38.29907,
          radius: 5,

        },

        {
          id: 11,
          name: '明长城',
          left: 0.23693 * scaleWidth1 - 15,
          top: 0.37736 * scaleH1 - 23,
          longitude: 106.5057,
          latitude: 38.3004,
          radius: 15,

        },

        {
          id: 12,
          name: '红山湖',
          left: 0.43789 * scaleWidth1 - 15,
          top: 0.29434 * scaleH1 - 23,
          longitude: 106.513,
          latitude: 38.29673,
          radius: 20,

        },
        {
          id: 13,
          name: '红山堡互市',
          left: 0.7194 * scaleWidth1 - 15,
          top: 0.244 * scaleH1 - 23,
          longitude: 106.5284,
          latitude: 38.27831,
          radius: 10,
        },
        {
          id: 14,
          name: '大峡谷',
          left: 0.7194 * scaleWidth1 - 15,
          top: 0.382 * scaleH1 - 15,
          longitude: 106.5284,
          latitude: 38.27841,
          radius: 20,
        },
        {
          id: 15,
          name: '大型实景马战 - <北疆天歌>',
          left: 0.63477 * scaleWidth1 - 15,
          top: 0.22 * scaleH1 - 23,
          longitude: 106.513,
          latitude: 38.29673,
          radius: 20,
        },
        {
          id: 16,
          name: '二号藏兵洞',
          left: (2883 / 4170) * scaleWidth1 - 15,
          top: (854 / 2385) * scaleH1 - 23,
          longitude: 106.5273,
          latitude: 38.27767,
          radius: 10,
        },
        {
          id: 17,
          name: '红柳滩',
          left: (2585 / 4170) * scaleWidth1 - 15,
          top: (1028 / 2385) * scaleH1 - 23,
          longitude: 106.513,
          latitude: 38.29673,
          radius: 20,
        },
        {
          id: 18,
          name: '红山堡',
          left: 0.7657 * scaleWidth1 - 15,
          top: 0.7128 * scaleH1 - 23,
          longitude: 106.5257,
          latitude: 38.27625,
          radius: 10,
        },
        {
          id: 19,
          name: '沙枣湾',
          left: (1975 / 4170) * scaleWidth1 - 15,
          top: (1072 / 2385) * scaleH1 - 23,
          longitude: 106.5186,
          latitude: 38.29292,
          radius: 10,
        },
        {
          id: 20,
          name: '水洞沟北区',
          left: (969 / 4170) * scaleWidth1 - 15,
          top: (696 / 2385) * scaleH1 - 23,
          longitude: 106.513,
          latitude: 38.29673,
          radius: 20,
        },
        {
          id: 21,
          name: '穿越 归来',
          left: (3727 / 4170) * scaleWidth1 - 15,
          top: (1480 / 2385) * scaleH1 - 23,
          longitude: 106.513,
          latitude: 38.29673,
          radius: 20,
        },
        {
          id: 22,
          name: '水洞沟吉祥物Simple家族',
          left: (2122 / 4170) * scaleWidth1 - 15,
          top: (1280 / 2385) * scaleH1 - 23,
          longitude: 106.513,
          latitude: 38.29673,
          radius: 20,
        },
        {
          id: 23,
          name: '瓮城',
          left: (3458 / 4170) * scaleWidth1 - 15,
          top: (1423 / 2385) * scaleH1 - 23,
          longitude: 106.5259,
          latitude: 38.27601,
          radius: 5,
        },
        {
          id: 24,
          name: '野性草原牧家乐餐饮娱乐区',
          left: (1215 / 4170) * scaleWidth1 - 15,
          top: (282 / 2385) * scaleH1 - 23,
          longitude: 106.513,
          latitude: 38.29673,
          radius: 20,
        },
        {
          id: 25,
          name: '藏兵洞',
          left: (3348 / 4170) * scaleWidth1 - 15,
          top: (675 / 2385) * scaleH1 - 23,
          longitude: 106.5275,
          latitude: 38.27744,
          radius: 10,
        }, 
        {
          id: 26,
          name: '宁夏长城博物馆',
          left: (3190 / 4170) * scaleWidth1 - 15,
          top: (1440 / 2385) * scaleH1 - 23,
          longitude: 106.5285,
          latitude: 38.27661,
          radius: 10,
        },
      ]

    })
  },
  dosuoxiao: function () {
    this.setData({
      scaleWidth: baseWidth,
      scaleHeight: baseHeight,

      leftOffset: baseWidth * 0.63,
      youxiantu1: {
        left: (707 / 4170) * baseWidth,
        top: (643 / 2385) * baseHeight,
        width: (1818 / 4170) * baseWidth - (707 / 4170) * baseWidth,
        height: (1627 / 2385) * baseHeight - (643 / 2385) * baseHeight,
      },
      youxiantu2: {
        left: (709 / 4170) * baseWidth,
        top: (643 / 2385) * baseHeight,
        width: (3636 / 4170) * baseWidth - (709 / 4170) * baseWidth,
        height: (1911 / 2385) * baseHeight - (643 / 2385) * baseHeight,
      },
      youxiantu3: {
        left: (708 / 4170) * baseWidth,
        top: (444 / 2385) * baseHeight,
        width: (3636 / 4170) * baseWidth - (708 / 4170) * baseWidth,
        height: (1916 / 2385) * baseHeight - (444 / 2385) * baseHeight,
      },

      pointList: [
        {
          id: 0,
          name: '大门口',
          left: 0.41151 * baseWidth - 15,
          top: 0.64864 * baseHeight - 23,
          longitude: 106.50878,
          latitude: 38.290108,
          radius: 10,

        },
        {
          id: 1,
          name: '水洞沟VR游戏-‘天降神石’',
          left: 0.44365 * baseWidth - 15,
          top: 0.62138 * baseHeight - 23,
          longitude: 106.5092,
          latitude: 38.2904,
          radius: 10,

        },
        {
          id: 2,
          name: '石器广场石柱',
          left: 0.42542 * baseWidth - 15,
          top: 0.55765 * baseHeight - 23,
          longitude: 106.5097,
          latitude: 38.29104,
          radius: 10,

        },
        {

          id: 3,
          name: '博物馆入口',
          left: 0.36067 * baseWidth - 15,
          top: 0.60545 * baseHeight - 23,
          longitude: 106.5091,
          latitude: 38.29109,
          radius: 10,

        },
        {
          id: 4,
          name: '张三小店',
          left: 0.39736 * baseWidth - 15,
          top: 0.50608 * baseHeight - 23,
          longitude: 106.5092,
          latitude: 38.29293,
          radius: 15,

        },
        {
          id: 5,
          name: '水洞沟村',
          left: 0.35132 * baseWidth - 15,
          top: 0.51991 * baseHeight - 23,
          longitude: 106.5088,
          latitude: 38.2933,
          radius: 15,

        },

        {
          id: 6,
          name: '尖状碑',
          left: 0.28153 * baseWidth - 15,
          top: 0.5912 * baseHeight - 23,
          longitude: 106.5078,
          latitude: 38.2938,
          radius: 3,

        },

        {
          id: 7,
          name: '遗址发掘点',
          left: 0.31223 * baseWidth - 15,
          top: 0.46122 * baseHeight - 23,
          longitude: 106.5066,
          latitude: 38.29831,
          radius: 5,

        },
        {
          id: 8,
          name: '芦花谷',
          left: 0.30695 * baseWidth - 15,
          top: 0.38826 * baseHeight - 23,
          longitude: 106.5059,
          latitude: 38.29842,
          radius: 5,

        },
        {
          id: 9,
          name: '山神庙',
          left: 0.26739 * baseWidth - 15,
          top: 0.4109 * baseHeight - 23,
          longitude: 106.5055,
          latitude: 38.29937,
          radius: 5,

        },

        {
          id: 10,
          name: '鸳鸯湖与魔鬼城',
          left: 0.18225 * baseWidth - 15,
          top: 0.48218 * baseHeight - 23,
          longitude: 106.5055,
          latitude: 38.29907,
          radius: 5,

        },

        {
          id: 11,
          name: '长城',
          left: 0.23693 * baseWidth - 15,
          top: 0.37736 * baseHeight - 23,
          longitude: 106.5057,
          latitude: 38.3004,
          radius: 15,

        },

        {
          id: 12,
          name: '红山湖',
          left: 0.43789 * baseWidth - 15,
          top: 0.29434 * baseHeight - 23,
          longitude: 106.513,
          latitude: 38.29673,
          radius: 20,
        },

        {
          id: 13,
          name: '红山堡互市',
          left: 0.7194 * baseWidth - 15,
          top: 0.244 * baseHeight - 23,
          longitude: 106.5284,
          latitude: 38.27831,
          radius: 10,
        },
        {
          id: 14,
          name: '大峡谷',
          left: 0.7194 * baseWidth - 15,
          top: 0.382 * baseHeight - 23,
          longitude: 106.5284,
          latitude: 38.27841,
          radius: 20,
        },
        {
          id: 15,
          name: '大型实景马战 - <北疆天歌>',
          left: 0.63477 * baseWidth - 15,
          top: 0.22 * baseHeight - 15,
          longitude: 106.513,
          latitude: 38.29673,
          radius: 20,
        },
        {
          id: 16,
          name: '二号藏兵洞',
          left: (2883 / 4170) * baseWidth - 15,
          top: (854 / 2385) * baseHeight - 23,
          longitude: 106.5273,
          latitude: 38.27767,
          radius: 10,
        },
        {
          id: 17,
          name: '红柳滩',
          left: (2585 / 4170) * baseWidth - 15,
          top: (1028 / 2385) * baseHeight - 23,
          longitude: 106.513,
          latitude: 38.29673,
          radius: 20,
        },
        {
          id: 18,
          name: '红山堡',
          left: 0.7657 * baseWidth - 15,
          top: 0.7128 * baseHeight - 23,
          longitude: 106.5257,
          latitude: 38.27625,
          radius: 10,
        },
        {
          id: 19,
          name: '沙枣湾',
          left: (1975 / 4170) * baseWidth - 15,
          top: (1072 / 2385) * baseHeight - 23,
          longitude: 106.5186,
          latitude: 38.29292,
          radius: 10,
        },
        {
          id: 20,
          name: '水洞沟北区',
          left: (969 / 4170) * baseWidth - 15,
          top: (696 / 2385) * baseHeight - 23,
          longitude: 106.513,
          latitude: 38.29673,
          radius: 30,
        },
        {
          id: 21,
          name: '穿越 归来',
          left: (3727 / 4170) * baseWidth - 15,
          top: (1480 / 2385) * baseHeight - 23,
          longitude: 106.5265,
          latitude: 38.27462,
          radius: 10,
        },
        {
          id: 22,
          name: '水洞沟吉祥物Simple家族',
          left: (2122 / 4170) * baseWidth - 15,
          top: (1280 / 2385) * baseHeight - 23,
          longitude: 106.513,
          latitude: 38.29673,
          radius: 20,
        },
        {
          id: 23,
          name: '瓮城',
          left: (3458 / 4170) * baseWidth - 15,
          top: (1423 / 2385) * baseHeight - 23,
          longitude: 106.5259,
          latitude: 38.27601,
          radius: 5,
        },
        {
          id: 24,
          name: '野性草原牧家乐餐饮娱乐区',
          left: (1215 / 4170) * baseWidth - 15,
          top: (282 / 2385) * baseHeight - 23,
          longitude: 106.5147,
          latitude: 38.30104,
          radius: 30,
        },
        {
          id: 25,
          name: '藏兵洞',
          left: (3348 / 4170) * baseWidth - 15,
          top: (675 / 2385) * baseHeight - 23,
          longitude: 106.5275,
          latitude: 38.27744,
          radius: 10,
        },
        {
          id: 26,
          name: '宁夏长城博物馆',
          left: (3190 / 4170) * baseWidth - 15,
          top: (1440 / 2385) * baseHeight - 23,
          longitude: 106.5285,
          latitude: 38.27661,
          radius: 10,
        },
      ]

    })
  },
  
  autoPlay:function(){
    var that = this
    
    for (var index in this.data.pointList) {
      var item = this.data.pointList[index];
      
      var s = that.getDistance(that.data.locationPlace.latitude, that.data.locationPlace.longitude, item.latitude, item.longitude)
      if (s < item.radius){
        var id = item.id;
        if (!that.contains(playRecord,id)) {
          currPlace = placeDetailList[item.id];
          var lanType = wx.getStorageSync('language');
          if (lanType == 0) {
            that.setData({
              showTanchuan: true,
              currentPlace: {
                name: currPlace.cn_name,
                src: currPlace.voiceurl0,
                desc: currPlace.cn_desc,
              },
            })
          } else if (lanType == 1) {
            that.setData({
              showTanchuan: true,
              currentPlace: {
                name: currPlace.en_name,
                src: currPlace.voiceurl1,
                desc: currPlace.en_desc,
              },
            })
          } else {
            that.setData({
              showTanchuan: true,
              currentPlace: {
                name: currPlace.cn_name,
                src: currPlace.voiceurl2,
                desc: currPlace.cn_desc,
              },
            })
          }

          wx.playBackgroundAudio({
            dataUrl: that.data.currentPlace.src,
            success: function () {
            },
            fail: function () {
            }
          }, )
          that.setData({
            isStop: true,
          })
        }
        playRecord.push(id)
      }
    }
  },

  update: function (options) {
	
	var that = this
	var item = this.data.pointList[options];
	var id = item.id;
	currPlace = placeDetailList[item.id];
	var lanType = wx.getStorageSync('language');
	if (lanType == 0) {
		that.setData({
			showTanchuan: true,
			currentPlace: {
				name: currPlace.cn_name,
				src: currPlace.voiceurl0,
				desc: currPlace.cn_desc,
			},
		})
	} else if (lanType == 1) {
		that.setData({
			showTanchuan: true,
			currentPlace: {
				name: currPlace.en_name,
				src: currPlace.voiceurl1,
				desc: currPlace.en_desc,
			},
		})
	} else {
		that.setData({
			showTanchuan: true,
			currentPlace: {
				name: currPlace.cn_name,
				src: currPlace.voiceurl2,
				desc: currPlace.cn_desc,
			},
		})
	}

	wx.playBackgroundAudio({
		dataUrl: that.data.currentPlace.src,
		success: function () {
		},
		fail: function () {
		}
	}, )
	that.setData({
		isStop: true,
	})
  },

  contains : function(arr, obj) {
    var i = arr.length;
    while(i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
  return false;
  },

  //分享效果
  onShareAppMessage: function () {
    return {
      title: '水洞沟手绘地图',
      path: 'pages/index/index'
    }
  }
})
