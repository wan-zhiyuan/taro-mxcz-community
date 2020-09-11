import Taro, { Component } from '@tarojs/taro'
import { View, Text, } from '@tarojs/components'
import { AtIcon, } from 'taro-ui'
import './index.scss'

export default class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            status: 20,
            navHeight: 44,
        }
    }

    static defaultProps = {
        title: '标题',
        showCapsule: 1,
        titleLeft: false,
        background: '#00D8A0', // 背景色
    }

    componentDidMount() {
        this.setNavSize()
    }

    setNavSize() {
        let sysinfo = Taro.getSystemInfoSync()
        let statusHeight = sysinfo.statusBarHeight
        let isiOS = sysinfo.system.indexOf('iOS') > -1
        let navHeight
        if (!isiOS) {
            navHeight = 48;
        } else {
            navHeight = 44;
        }
        this.setState({
            status: statusHeight,   // 顶部状态栏高度
            navHeight: navHeight    // 导航栏高度
        })
    }

    handleSearch() {
        Taro.navigateTo({
            url: `/subPages1/pages/search/search`
        })
    }

    render() {
        const { status, navHeight } = this.state
        return (
            <View className="nav-box">
                <View className='nav' style={{ height: `${status + navHeight}px` }}>
                    <View className='status' style={{ 'height': this.state.status + 'px', backgroundColor: this.props.background }}></View>
                    <View className='navbar' style={{ 'height': this.state.navHeight + 'px', backgroundColor: this.props.background }}>
                        {/* 定位 */}
                        <View className='home_top_position'>
                            <Text style={{marginRight:'4px'}}>上海市</Text>
                            <AtIcon value='chevron-down' size='14px' color='#fff'></AtIcon>
                        </View>
                        {/* 搜索 */}
                        <View className='home_top_search' onClick={()=>{this.handleSearch()}}>
                            {/* <View style={{width:'6px',height:'100%'}}></View> */}
                            <AtIcon value='search' size='14px' color='#666'></AtIcon>
                            <Text style={{marginLeft:'4px'}}>请输入您想要搜索的内容</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

}