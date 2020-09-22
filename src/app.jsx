import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/index'
import Home from './pages/home'
import configStore from './store'
import { set as setGlobaleData } from './global_data'
import { getLocationString } from './utils/location'

import './app.scss'
import './custom-variables.scss'
import './assets/css/iconfont.scss' // 引入iconfont文件

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/home/home',
      'pages/publish/publish',
      'pages/mine/mine',
      'pages/index/index', // 测试页面
    ],
    subpackages: [
      // 登陆 && 签到 && 积分 && 我的收藏
      {
        "root": "subPages1",
        "pages": [
          'pages/login/login',
          'pages/signIn/signIn',
          'pages/signInRank/signInRank',
          'pages/search/search',
          'pages/pointDetail/pointDetail',
          'pages/myCollection/myCollection',
          'pages/commentPage/commentPage',
        ]
      },
      // 社区相关： 社区商户 && 社区服务站
      {
        "root": "subPages2",
        "pages": [
          'pages/community/community',
          'pages/communityDetail/communityDetail',
          'pages/communityLocate/communityLocate',
          'pages/communityComment/communityComment',
          'pages/serviceSite/serviceSite',
          'pages/serviceSiteSub/serviceSiteSub',
          'pages/serviceSiteDetail/serviceSiteDetail',
          'pages/serviceSiteLocate/serviceSiteLocate',
        ]
      },
      // 发布相关： publish && information
      {
        "root": "subPages3",
        "pages": [
          'pages/publishConfirm/publishConfirm',
          'pages/publishDetail/publishDetail',
          'pages/category/category',
          'pages/categorySub/categorySub',
          'pages/information/information',
          'pages/infoPublish/infoPublish',
          'pages/infoDetail/infoDetail',
        ]
      },
      // 活动相关： 社区活动 && 志愿者活动
      {
        "root": "subPages4",
        "pages": [
          'pages/activity/activity',
          'pages/activitySub/activitySub',
          'pages/activityDetail/activityDetail',
          'pages/volunteer/volunteer',
          'pages/volunteerDetail/volunteerDetail'
        ]
      },
      // 商城相关的页面
      {
        "root": "subPages5",
        "pages": [
          'pages/order/order',
        ]
      },
    ],
    tabBar: {
      list: [{
        pagePath: 'pages/home/home',
        iconPath: './assets/tab-bar/home.png',
        selectedIconPath: './assets/tab-bar/home-active.png',
        text: '首页'
      }, {
        pagePath: 'pages/publish/publish',
        iconPath: './assets/tab-bar/publish.png',
        selectedIconPath: './assets/tab-bar/publish-active.png',
        text: '发布'
      }, {
        pagePath: 'pages/mine/mine',
        iconPath: './assets/tab-bar/mine.png',
        selectedIconPath: './assets/tab-bar/mine-active.png',
        text: '我的'
      }],
      custom: false,
      color: '#ccc',
      selectedColor: '#0feea7',
      backgroundColor: '#fafafa',
      borderStyle: 'black',
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#00D8A0',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于小程序位置接口的效果展示'
      }
    }

  }

  componentWillMount() {
    Taro.getSetting({
      success: function (res) {
        console.log(res.authSetting)
        let statu = res.authSetting
        if (statu['scope.userLocation']) {
          // 用户设置中开启了位置信息
        } else {
          // 用户设置中未开启位置信息
        }
      }
    })

    // 用户第一次启动小程序，调用位置信息相关的api会弹出系统弹层
    // 如果拒绝，或者在设置中关闭，再调用api时直接走fail方法
    // Taro.getLocation({
    //   type: 'gcj02',
    //   // type: 'wgs84',
    //   success: function (res) {
    //     console.log(res)
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     const speed = res.speed
    //     const accuracy = res.accuracy
    //     // 可以存在redux中，后续使用经纬度的时候如果存在，则不需要调用getLocation
    //   }
    // })

    this.getLocation()
  }

  /* 初始化获取定位 */
  getLocation = async() => {
    const location = await getLocationString()
    setGlobaleData('location',location)
  }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
