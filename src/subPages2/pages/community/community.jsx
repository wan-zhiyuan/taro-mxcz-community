import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import CommunityItem from './CommunityItem'
import Community01 from '../../images/community01.png'
import Community02 from '../../images/community02.png'
import Community03 from '../../images/community03.png'
import Community04 from '../../images/community04.png'
import CommunityList from './CommunityList'
import { getCommunityBusiness } from '../../../actions/community'
import { getLocationStringPopup } from '../../../utils/location'

import './community.scss'

export default function Community() {

    const [location, setLocation] = useState('')
    const [list, setList] = useState([])
    const [community, setCommunity] = useState([
        { cid: '1', name: '上海市浦东新区人民政府潍坊新村街道办事处', address: '上海市浦东新区福山路317号', rate: 5, popul: 120, phone: 68757800, range: '15.4km', pic: Community01 },
        { cid: '2', name: '北京市丰台区人民政府丰台街道办事处', address: '北京市丰台区文体路与正阳大街交叉路口往北约100米', rate: 4, popul: 880, phone: 13865433456, range: '15.4km', pic: Community02 },
        { cid: '3', name: '漕河泾街道残疾人服务社阳光心园', address: '宾阳路11号甲', rate: 4.5, popul: 120, phone: 13865433456, range: '15.4km', pic: Community03 },
        { cid: '4', name: '上海市阳光社区青少年事务中心', address: '汉中路158号上海青年创业大厦中楼1层', rate: 2, popul: 323, phone: 13865433456, range: '15.4km', pic: Community04 },
        { cid: '5', name: '上海市浦东新区人民政府潍坊新村街道办事处', address: '上海市浦东新区福山路317号', rate: 1, popul: 22, phone: 13865433456, range: '15.4km', pic: Community01 },
    ])

    useEffect(() => {


        // 获取社区商户列表
        getBusiness()
    }, [])

    async function getBusiness() {
        const location = await getLocationStringPopup()
        if (!location) {
            console.log('无法获取定位，社区商户模块禁止使用')
            return
        }
        const res = await getCommunityBusiness(location, industry = '', 0)
        if (res.code === 200) {
            setList(res.data)
        }
    }

    return (
        <View className='community_index'>
            <ScrollView
                className='community_scroll'
                scrollY
                scrollWithAnimation
            >
                <CommunityList list={community} />
                {/* {
                    community.map((item, idx) => {
                        return (
                            <CommunityItem key={'index_' + idx} community={item} />
                        )
                    })
                } */}
            </ScrollView>
        </View>
    )
}

Community.config = {
    navigationBarTitleText: '所有社区',
}