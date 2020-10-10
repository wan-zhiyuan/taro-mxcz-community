import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ClTag } from "mp-colorui"
import { isEmpty } from '../../utils/is'


import './index.scss'


export default function Index(props) {

    const { item, from } = props

    function handleClick() {
        switch (from) {
            case 'myEnroll':
                handleVerification()
                return
            default:
                handleActivity()
                return
        }
    }

    function handleVerification() {
        console.log('核销')
        Taro.navigateTo({
            url: `/subPages4/pages/activityVerification/activityVerification?target_id=${item.id}`
        })
    }

    function handleActivity() {
        Taro.navigateTo({
            url: `/subPages4/pages/activityDetail/activityDetail?target_id=${item.id}`
        })
    }

    const tags = [
        {
            text: '免费',
            color: 'red'
        },
        {
            text: '收费',
            color: 'blue'
        },
        {
            text: '进行中',
            color: 'blue',
            plain: true
        },
        {
            text: '已结束',
            color: 'gray',
            plain: true,
        },
        {
            text: '未开始',
            color: 'green',
            plain: true,
        },
    ]

    return (
        <View className='activity_item' onClick={handleClick}>
            {
                !isEmpty(item.logo)
                    ? <Image className='activity_pic' src={item.logo} mode='scaleToFill'></Image>
                    : <Image className='activity_pic_default'></Image>
            }
            <View className='activity_title'>{item.title || ''}</View>
            <View className='activity_bottom'>
                <View className='left'>
                    <Text className='activity_cate_name'>{item.cate_name || '活动分类名称'}</Text>
                    {/* 价格为0时，显示免费图标 */}
                    <View className='activity_tag1'>
                        {
                            Number(item.price) === 0
                                ? <ClTag tags={tags.slice(0, 1)} shape='radius' />
                                : <ClTag tags={tags.slice(1, 2)} shape='radius' />
                        }
                    </View>
                    <View className='activity_tag2'>
                        {
                            // 同时判断 status 和 isenroll 后续实际数据添加判断
                            (Number(item.status || '') === 1 && Number(item.is_enroll) === 1)
                                ?
                                // 进行中
                                <ClTag tags={tags.slice(2, 3)} shape='radius' />
                                :
                                <View>
                                    {
                                        Number(item.status || '') === 2
                                            ?
                                            // 已结束
                                            <ClTag tags={tags.slice(3, 4)} shape='radius' />
                                            :
                                            // 未开始
                                            <ClTag tags={tags.slice(4, 5)} shape='radius' /> 
                                    }
                                </View>
                        }
                    </View>
                </View>
                <View className='right' style={from === 'myEnroll' ? { display: 'none' } : {}}>
                    <Text className='enroll_number'>{item.enroll_number || 0}</Text>
                    <Text className='enroll_txt'>已报名</Text>
                </View>
            </View>
        </View>
    )
}

Index.defaultProps = {
    item: {},
    from: '',
}