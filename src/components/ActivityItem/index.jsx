import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ClTag } from "mp-colorui"
import IconFont from '../../components/iconfont'
import { isEmpty } from '../../utils/is'
import { Toast } from '../../utils/toast'
import { activityDeleteEnroll, dispatchMyEnroll } from '../../actions/activity'
import { useDispatch } from '@tarojs/redux'

import './index.scss'

export default function Index(props) {

    const { item, from } = props

    const dispatch = useDispatch()

    // 点击item事件
    function handleClick() {
        switch (from) {
            case 'myEnroll': // 来源：我的报名页面进来
                handleVerification()
                return
            default:
                handleActivity()
                return
        }
    }

    function handleVerification() {
        console.log('核销')
        if (Number(item.is_sign || 0) === 1) {
            Toast('已核销')
        } else {
            Taro.navigateTo({
                url: `/subPages4/pages/activityVerification/activityVerification?target_id=${item.id}`
            })
        }
    }

    function handleActivity() {
        Taro.navigateTo({
            url: `/subPages4/pages/activityDetail/activityDetail?target_id=${item.id}`
        })
    }

    // 取消报名
    async function handleDeleteEnroll(e) {
        e.stopPropagation()
        const res = await activityDeleteEnroll(item.e_id)
        if (res.code === 200) {
            Toast('取消活动报名成功')
            await dispatch(dispatchMyEnroll())
        }
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
            text: '预报名',
            color: 'green',
            plain: true,
        },
        {
            text: '已核销',
            color: 'black',
            plain: true,
        },
        {
            text: `第${Number(item.sequence || 0)}位报名`,
            color: 'black',
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
                    {
                        from !== 'myEnroll' &&
                        <Text className='activity_cate_name'>{item.cate_name || '活动分类名称'}</Text>
                    }
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
                                            // 预报名
                                            <ClTag tags={tags.slice(4, 5)} shape='radius' />
                                    }
                                </View>
                        }
                    </View>
                    {
                        // 仅在我的报名页面，并且报名已被核销时显示此tag
                        from === 'myEnroll' && (Number(item.is_sign || 0) === 1) &&
                        <View className='activity_tag3'>
                            <ClTag tags={tags.slice(5, 6)} shape='radius' />
                        </View>
                    }
                    {
                        from === 'myEnroll' &&
                        <View className='activity_tag4'>
                            <ClTag tags={tags.slice(6, 7)} shape='radius' />
                        </View>
                    }
                </View>
                {
                    from != 'myEnroll' &&
                    <View className='right_activity'>
                        <Text className='enroll_number'>{item.enroll_number || 0}</Text>
                        <Text className='enroll_txt'>已报名</Text>
                    </View>
                }
                {
                    from === 'myEnroll' && (Number(item.is_sign || 0) === 0) &&
                    <View className='right_myenroll' onClick={handleDeleteEnroll}>
                        <IconFont name='shanchu' size={28} color='#333' />
                        <Text className='delete_txt'>取消</Text>
                    </View>
                }
            </View>
        </View>
    )
}

Index.defaultProps = {
    item: {},
    from: '',
}