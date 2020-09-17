import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtDivider } from 'taro-ui'
import PointListItem from '../PointListItem'

import './index.scss'

export default function Index(props) {

    const { pointList } = props

    return (
        <View className='point_list'>
            {
                pointList.map((item,idx)=>{
                    return (
                        <PointListItem key={'index_'+idx} item={item} value={item}/>
                    )
                })
            }
            <AtDivider content='NO MORE' fontColor='#ccc' lineColor='#f2f2f2' fontSize={22} height={80}/>
        </View>
    )
}
Index.defaultProps = {
    pointList: [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6],
}