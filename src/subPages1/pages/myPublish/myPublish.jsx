import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import PublishList from '../../../components/PublishList'
import { getMyPublish } from '../../../actions/publish'

import './myPublish.scss'

export default function MyPublish() {

    const [list, setList] = useState([])

    useEffect(()=>{
        async function getData() {
            const res = await getMyPublish()
            if (res.code === 200) {
                setList(res.data.point_list)
            }
        }
        getData()
    },[])


    return (
        <View className='my_publish_index'>
            <PublishList list={list} from='myPublish'/>
        </View>
    )

}
MyPublish.config = {
    navigationBarTitleText: '我的发布',
}