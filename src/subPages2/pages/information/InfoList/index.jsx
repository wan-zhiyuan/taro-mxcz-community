import Taro from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import InfoListItem from '../InfoListItem'
import { getWindowHeightNoPX } from '../../../../utils/style'

import './index.scss'

export default function Index(props) {

    const { infoList } = props

    return (
        <View className='info_list'>
            <ScrollView
                className='information_scroll'
                scrollY
                scrollWithAnimation
                style={{ height: `${getWindowHeightNoPX()-60}px` }}
            >
                {
                    infoList.map((item, idx) => {
                        return (
                            <InfoListItem key={'index_' + idx} item={item} />
                        )
                    })
                }
            </ScrollView>

        </View>
    )
}
Index.defaultProps = {
    infoList: []
}
