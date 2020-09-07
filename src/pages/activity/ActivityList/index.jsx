import Taro, { useState, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import ActivityItem from '../ActivityItem'
import ActivityPic1 from '../../../assets/images/activity_pic_1.png'
import ActivityPic2 from '../../../assets/images/activity_pic_2.png'
import ActivityPic3 from '../../../assets/images/activity_pic_3.png'

import './index.scss'

export default function Index() {

    const [activityList, setActivityList] = useState([
        { aid: '1', title: '9月7日语文课', community: '浦东1站', tag: '免费', state: 0, num: '11', pic: ActivityPic1 },
        { aid: '2', title: '9月6日数学课', community: '浦东2站', tag: '免费', state: 1, num: '0', pic: ActivityPic2 },
        { aid: '3', title: '9月5日英语课', community: '浦东3站', tag: '免费', state: 0, num: '122', pic: ActivityPic3 },
        { aid: '4', title: '9月4日舞蹈课', community: '浦东4站', tag: '免费', state: 0, num: '88', pic: '' },
        { aid: '5', title: '9月3日美术课', community: '浦东5站', tag: '免费', state: 0, num: '54', pic: '' },
        { aid: '6', title: '9月2日体育课', community: '浦东6站', tag: '免费', state: 0, num: '20', pic: '' },
        { aid: '7', title: '9月1日生物课', community: '浦东7站', tag: '免费', state: 0, num: '31', pic: '' },
        { aid: '8', title: '8月31日复变课', community: '浦东8站', tag: '免费', state: 0, num: '111', pic: '' },
        { aid: '9', title: '8月30日烹饪课', community: '浦东9站', tag: '免费', state: 0, num: '119', pic: '' },
    ])

    return (
        <View className='activity_list'>
            {
                activityList.map((item, idx) => {
                    return (
                        <ActivityItem key={'index_' + idx} activity={item} />
                    )
                })
            }
        </View>
    )
}
