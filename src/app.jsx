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
      'pages/index/index',
      'pages/publishInformation/publishInformation',
      'pages/publishDetail/publishDetail',
      'pages/community/community',
      'pages/activity/activity',
      'pages/activitySub/activitySub',
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
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
