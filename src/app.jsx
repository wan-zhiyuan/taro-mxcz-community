import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/index'
import Home from './pages/home'
import configStore from './store'

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
      'pages/publishInformation/publishInformation',
      'pages/publishDetail/publishDetail',
    ],
    subpackages: [
      // 关于登陆和个人的相关页面
      {
        "root": "subPages1",
        "pages": [
          'pages/login/login',
          'pages/signIn/signIn',
          'pages/signInRank/signInRank',
          'pages/search/search',
          'pages/pointDetail/pointDetail',
          'pages/myCollection/myCollection',
        ]
      },
      // 社区及活动相关页面
      {
        "root": "subPages2",
        "pages": [
          'pages/community/community',
          'pages/communityDetail/communityDetail',
          'pages/communityLocate/communityLocate',
          'pages/communityComment/communityComment',
          'pages/activity/activity',
          'pages/activitySub/activitySub',
          'pages/activityDetail/activityDetail',
          'pages/information/information',
          'pages/infoPublish/infoPublish',
          'pages/infoDetail/infoDetail',
        ]
      },
      // 商城相关的页面
      {
        "root": "subPages3",
        "pages": [
          'pages/order/order',
        ]
      },
      // 社区帖子相关页面（发帖、搜索、帖子详情）
      // {
      //   "root": "subPages4",
      //   "pages": [

      //   ]
      // },
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
