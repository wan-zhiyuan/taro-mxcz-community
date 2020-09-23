import Taro, { useState, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import ActivityItem from '../ActivityItem'
import Divider from '../../../../components/DividerComponent'

import './index.scss'

export default function Index(props) {

    const { activityList } = props

    // const [activityList, setActivityList] = useState([
    //     { id: '1', title: '9月7日语文课', cate_name: '浦东1站', price:0, status: 0, enroll_number: '11', pic: ActivityPic1 },
    //     { id: '2', title: '9月6日数学课', cate_name: '浦东2站', price:0, status: 1, enroll_number: '0', pic: ActivityPic2 },
    //     { id: '3', title: '9月5日英语课', cate_name: '浦东3站', price:0, status: 0, enroll_number: '122', pic: ActivityPic3 },
    //     { id: '4', title: '9月4日舞蹈课', cate_name: '浦东4站', price:0, status: 0, enroll_number: '88', pic: '' },
    //     { id: '5', title: '9月3日美术课', cate_name: '浦东5站', price:0, status: 0, enroll_number: '54', pic: '' },
    //     { id: '6', title: '9月2日体育课', cate_name: '浦东6站', price:0, status: 0, enroll_number: '20', pic: '' },
    //     { id: '7', title: '9月1日生物课', cate_name: '浦东7站', price:0, status: 0, enroll_number: '31', pic: '' },
    //     { id: '8', title: '8月31日复变课', cate_name: '浦东8站', price:0, status: 0, enroll_number: '111', pic: '' },
    //     { id: '9', title: '8月30日烹饪课', cate_name: '浦东9站', price:0, status: 0, enroll_number: '119', pic: '' },
    // ])

    return (
        <View className='activity_list'>
            {
                activityList.map((item, idx) => {
                    return (
                        <ActivityItem key={'index_' + idx} item={item} />
                    )
                })
            }
            <View className='divider'>
                <Divider />
            </View>
        </View>
    )
}
Index.defaultProps = {
    activityList: []
}
