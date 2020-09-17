import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

export default function Index(props) {

    const { } = props

    const [category, setCategory] = useState(['语文课', '数学课', '英语课', '政治课', '语文课', '数学课', '英语课', '政治课', '美术课', '体育课', '心理课', '自习课'])
    const [currentCate, setCurrentCate] = useState(0)

    function changeCurrentCate(idx) {
        setCurrentCate(idx)
    }

    return (
        <View className='info_publish_header'>
            <Text className='title'>选择主题分类</Text>
            <View className='publish_category'>
                <ScrollView
                    className='category_scroll'
                    scrollX
                    scrollWithAnimation
                    enableFlex={true}
                >
                    {
                        category.map((item, idx) => {
                            return (
                                <View
                                    className='item_category'
                                    key={'index_' + idx}
                                    style={(currentCate === idx) ? { color: '#ff0044', borderColor: '#ff0044' } : {}}
                                    onClick={() => { changeCurrentCate(idx) }}
                                >
                                    {item}
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )
}
Index.defaultProps = {

}