//app原生接口


let AppNative = {
  /**
   * app webview 窗体关闭
   */
  appClose() {
    let params = {
      type: 'tr_close',
      params: {},
      success: "app_close_success", //成功回调函数名字，
      fail: "app_close_fail"//失败回调函数名字
    };
    this.callNative(params);
  },

  /**
   * 重新刷新页面
   */
  appReload() {
    let params = {
      type: 'tr_reload_lastpage',
      params: {},
      success: "app_reload_success", //成功回调函数名字，
      fail: "app_reload_fail"//失败回调函数名字
    };
    this.callNative(params);
  },
  /**
   * 打开加载动画窗体
   */
  openLoading() {
    let params = {
      type: 'tr_loading_show',
      params: {},
      success: "app_loading_success", //成功回调函数名字，
      fail: "app_loading_fail"//失败回调函数名字
    };
    this.callNative(params);
  },
  /**
   * 关闭加载动画窗体
   */
  closeLoading() {
    let params = {
      type: 'tr_loading_dismiss',
      params: {},
      success: "app_loading_success", //成功回调函数名字，
      fail: "app_loading_fail"//失败回调函数名字
    };
    this.callNative(params);
  },
  /**
   * 打开h5
   * @param webId 浏览器Id，app打开默认0
   * @param url 打开地址
   * @param val 需要设置的值，key,val对象
   */
  openH5(webId, url, val) {
    let params = {
      type: 'tr_open_h5_url',
      params: {
        webId: webId, // 给原生webview一个id 整型大于0为可操作状态 ， webView 默认webId 0
        url: url, //字符类型
        store: val //map json对象,打开url前使用javascript对象sessionStorage.setItem('key', 'value')
      },
      success: "app_openH5_success", //成功回调函数名字，
      fail: "app_openH5_fail"//失败回调函数名字
    };
    this.callNative(params);
  },
  /**
   * 跳转到H5堆栈页面
   * @param webId h5webviewId
   * @param evalStr 执行的方法字符串 如：alert(\'asfd\')
   */
  jumpTo(webId, evalStr) {
    let params = {
      type: 'tr_jump_to',
      params: {
        webId: webId, //要跳转到的网页的webId
        invoke: evalStr // 可选 当跳转成功后，H5执行的function
      },
      success: "app_jumpTo_success", //成功回调函数名字，
      fail: "app_jumpTo_fail"//失败回调函数名字
    };
    this.callNative(params);
  },
  /**
   * 微信支付
   * @param payVal
   */
  wxPay(payVal) {
    let tmp = JSON.parse(payVal);
    let p = {
      partnerid: tmp.partnerid,
      prepayid: tmp.prepayid,
      pkg: tmp.pkg,
      noncestr: tmp.noncestr,
      timestamp: tmp.timestamp,
      sign: tmp.sign
    };
    let params = {
      type: 'tr_weixin_pay',
      params: p,
      success: "app_wxPay_success", //成功回调函数名字，
      fail: "app_wxPay_fail"//失败回调函数名字
    };
    // alert(JSON.stringify(params));
    this.callNative(params);
  },
  /**
   * 支付宝支付
   * @param str
   */
  aliPay(str) {
    let params = {
      type: 'tr_ali_pay',
      params: {
        orderStr: str
      },
      success: "app_aliPay_success", //成功回调函数名字，
      fail: "app_aliPay_fail"//失败回调函数名字
    };
    this.callNative(params);
  },
  /**
   * 打开相机
   * @param type 1 不能从相册选择 0 可以选择
   */
  openPhoto(type, carSide) {
    if(carSide===null||carSide===undefined){
      carSide=0;
    }
    let params = {
      type: 'tr_take_photo',
      params: {
        no_pic: type, // 1 不能从相册选择 0 可以选择
        square: 0, // 0 默认，可以不传，裁剪框为矩形； 1 裁剪框为 正方形 iOS 专用
        canSwitch: 1, // 1 可以切换摄像头，0 不可以 1 可以 iOS专用,
        carSide: carSide/// 0 没有车框虚线 1 左面 2 右面 3 后面/
      },
      success: "app_openPhoto_success", //成功回调函数名字，
      fail: "app_openPhoto_fail"//失败回调函数名字
    };
    this.callNative(params);
  },
  /**
   *
   * @param type
   */
  logout(txt) {
    let params = {
      type: 'tr_must_logout',
      params: {
        text: encodeURIComponent(txt)
      },
      success: "app_logout_success", //成功回调函数名字，
      fail: "app_logout_fail"//失败回调函数名字
    };
    this.callNative(params);
  },
  /**
   * 粘贴板
   * @param txt
   */
  appCopy(txt) {
    let params = {
      type: 'tr_copy',
      params: {
        text: txt
      },
      success: "app_tr_copy_success", //成功回调函数名字，
      fail: "app_tr_copy_fail"//失败回调函数名字
    };
    this.callNative(params);
  },

  /**
   * 下拉列表
   * @param title 标题
   * @param selIndx 选中值
   * @param data 数据源
   * @param viewKey 显示key，在数据源中的key
   * @constructor
   */
  UIselect(title, data, selIndx, viewKey) {
    let t = title;
    if (title) {
      t = '';
    }
    if (data && data.length < 1) {
      console.log('无数据');
      return;
    }
    let appData = [];
    for (let i = 0; i < data.length; i++) {
      let d = data[i];
      d.index = i;
      let val = {
        val: i,//行索引值，用于默认点中效果判断,
        name: d[viewKey],//行显示名字
        model: d//自定义json对象，可以为{}或者[]
      };
      appData.push(val);
    }

    let params = {
      type: 'tr_tick',
      params: {
        title: t,//标题
        selected: selIndx, //默认选中的data中的索引值
        data: appData
        // {
        //   val:213,//行索引值，用于默认点中效果判断,
        //   name:"我是1",//行显示名字
        //   model:{}//自定义json对象，可以为{}或者[]
        // }
      },
      success: "app_select_success", //成功回调函数名字，
      fail: "app_select_fail"//失败回调函数名字
    };


    this.callNative(params);
  },
  /**
   *时间组件
   * @param longTime 时间戳 显示的时间戳(毫秒)字符
   * @param type 1 长期选择器 0 普通选择器
   * @param mode 0时 1分 2秒
   */
  UIdateTime(longTime, type, mode) {
    if (mode === null || mode === undefined) {
      mode = 0;
    }
    let params = {
      type: 'tr_datepick',
      params: {
        title: '选择时间',//标题
        longTerm: 0, //默认0 ， 可为空，1 长期选择器 0 普通选择器
        timestamp: longTime,//显示的时间戳(毫秒)字符，可以为空，为空则是今天
        mode: mode
      },
      success: "app_date_time_success", //成功回调函数名字，
      fail: "app_date_time_fail"//失败回调函数名字
    };
    this.callNative(params);
  },

  /**
   * 面包屑提示条
   * @param text 提示内容
   * @constructor
   */
  UItoast(text) {
    let params = {
      type: 'tr_toast',
      params: {
        text: text
      },
      success: "app_toast_success", //成功回调函数名字，
      fail: "app_toast_fail"//失败回调函数名字
    };
    this.callNative(params);
  },

  /**
   * 成功提示
   * @param text 提示内容
   */
  UIsuccess(text) {
    let params = {
      type: 'tr_good_toast',
      params: {
        text: text
      },
      success: "app_success_success", //成功回调函数名字，
      fail: "app_success_fail"//失败回调函数名字
    };
    this.callNative(params);
  },
  /**
   * 错误提示
   * @param text 提示内容
   */
  UIerr(text) {
    let params = {
      type: 'tr_bad_toast',
      params: {
        text: text
      },
      success: "app_err_success", //成功回调函数名字，
      fail: "app_err_fail"//失败回调函数名字
    };
    this.callNative(params);
  },

  /**
   * 提示框样式
   * @param title
   * @param info
   * @param leftText
   * @param rightText
   * @param leftCall
   * @param rightCall
   * @param type
   * @constructor
   */
  UIconfirm(title, info, leftText, rightText, leftCall, rightCall, type) {
    let params = {
      type: 'tr_alert',
      params: {
        type: type !== 1 ? 0 : type, //默认0， 0 有2个按钮，1 只有右边一个按钮
        title: title,//标题
        info: info,//内容
        leftText: leftText,//左边按钮文字
        rightText: rightText,//右边按钮文字
        leftClick: leftCall,//左边按钮点击后的回调js方法名字
        rightClick: rightCall,//左边按钮点击后的回调js方法名字
      },
      success: "app_confirm_success", //成功回调函数名字，
      fail: "app_confirm_fail"//失败回调函数名字
    };
    this.callNative(params);
  },
  /**
   * 选择活动地图ui
   * @param actives 活动列表
   * @param activeId 活动ID
   * @constructor
   */
  UIretActvie(actives, activeId) {
    let params = {
      type: 'tr_select_cheap_point',
      params: {
        data: actives,
        aid: activeId
      },
      success: "app_active_select", //成功回调函数名字，
      fail: "app_ret_active"//失败回调函数名字
    };
    this.callNative(params);
  },
  /**
   * 地图选择车
   * @constructor
   */
  UIselectCar(type) {
    let params = {
      type: 'tr_select_car',
      params: {
        //获取跳转来源 1:个人扫码/选车;2:企业;3:运维
        type: type
      },
      success: "app_select_car", //成功回调函数名字，
      fail: "app_fail_select_car"//失败回调函数名字
    };
    this.callNative(params);
  },
  /**
   * 轨迹信息
   * @param orderId 订单ID
   * @constructor
   */
  UItrace(orderId) {
    let params = {
      type: 'tr_trace_detail',
      params: {
        orderId: orderId
      },
      success: "app_trace_detail", //成功回调函数名字，
      fail: "app_trace_detail"//失败回调函数名字
    };
    this.callNative(params);
  },
  /**
   * 跳转到主页
   * @constructor
   */
  UIgohome() {
    let params = {
      type: 'tr_gohome',
      success: "app_tr_gohome", //成功回调函数名字，
      fail: "app_tr_gohome"//失败回调函数名字
    };
    this.callNative(params);
  },
  //交易明细ui
  UIdealList() {
    let params = {
      type: 'tr_deal_list',
      success: "app_deal_list", //成功回调函数名字，
      fail: "app_deal_list"//失败回调函数名字
    };
    this.callNative(params);
  },
  /**
   * 二维码扫描车
   * @constructor
   */
  UIqr(type) {
    let params = {
      type: 'tr_scan_and_borrow',
      params: {
        type: type
      },
      success: "app_qr", //成功回调函数名字，
      fail: "app_qr_err"//失败回调函数名字
    };
    this.callNative(params);
  },
  UIselectNet() {
    let params = {
      type: 'tr_select_net',
      success: "app_select_net", //成功回调函数名字，
      fail: "app_select_net_err"//失败回调函数名字
    };
    this.callNative(params);
  },
  /**
   * 根据网点选择车
   * @param netId
   * @constructor
   */
  UIselectCarByNet(netId) {
    let params = {
      type: 'tr_select_car_by_net',
      params: {
        netId: netId // 网点id
      },
      success: "app_select_car_by_net", //成功回调函数名字，
      fail: "app_select_car_by_err"//失败回调函数名字
    };
    this.callNative(params);
  },
  /**
   *
   * @param val 分享数据
   * @param type 0 微信好友 1 微信朋友圈 2 qq好友 3 qzone
   * @constructor
   */
  UIshare(val, type) {
    let params = {
      type: 'tr_share',
      params: {
        title: val.shareTitle, //字符,标题,(好友和朋友圈有效)
        text: val.shareDes, //字符，描述（好友有效，朋友圈不显示）
        thumbImageURL: val.shareImg,//字符，缩略图片地址
        imageURL: val.shareImg,//字符，图片地址
        webURL: val.shareUrl,//字符，跳转的网页地址
        hasAlert: 0,// 1 原生弹窗分享 0 没有弹窗分享
        shareType: type // 当hasAlert为0时有效， 0 微信好友 1 微信朋友圈 2 qq好友 3 qzone
      },
      success: "app_tr_share", //成功回调函数名字，
      fail: "app_tr_share_err"//失败回调函数名字
    };
    this.callNative(params);
  },
  /**
   * 唤起支付宝
   * @param url
   * @constructor
   */
  CallAliPay(url){
    let params = {
      type: 'tr_zhima_authcode',
      params: {
        url :url
      },
      success: "app_tr_zhima_authcode", //成功回调函数名字，
      fail: "app_tr_zhima_authcode_err"//失败回调函数名字
    };
    this.callNative(params);
  },

  /**
   * 调用app原生接口
   * @param params 原生对象参数
   * @param callBack 返回调用，暂时无用，预留
   */
  callNative(params, callBack) {
    let userAgent = navigator.userAgent;
    //ios浏览器
    // if (userAgent.indexOf('iOS') != -1) {
    try {
      // IOS
      window.webkit.messageHandlers.tr_jsapi.postMessage(params);
    } catch (e) {
      try {
        AndroidAPI.tr_jsapi(JSON.stringify(params));
      } catch (e) {
      }
    }
    // }
    // else {
    //
    // }
    if (callBack) {
      callBack();
    }
  }
};
export default AppNative;
