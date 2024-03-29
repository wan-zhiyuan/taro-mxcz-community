import Taro, { useState, useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTextarea } from 'taro-ui'
import { publishExtend, informationExtend } from '../../../actions/publish'
import { communityBusinessExtend } from '../../../actions/community'
import { isEmpty } from '../../../utils/is'

import './commentPage.scss'
import { Toast, ToastSuccess } from '../../../utils/toast'


export default function CommentPage() {

    const router = useRouter()
    const { type = '', target_id = 0 } = router.params

    const [value, setValue] = useState('')

    function handleChange(v) {
        setValue(v)
    }

    /* 提交 */
    function handleSubmit() {
        if (isEmpty(value)) return
        let v = value.replace(/\ud83c[\udc00-\udfff]|\ud83d[\udc00-\udfff]|[\u2000-\u2fff]/g, "") // 正则过滤emoji表情
        if (type === 'publish') {
            let postData = {
                op: 'publish_extend',
                target_id,
                type: 2,
                content: v
            }
            publishExtend(postData).then(res => {
                if (res.code === 200) {
                    ToastSuccess('评论成功')
                } else {
                    Toast('评论失败')
                }
                Taro.navigateBack()
            })
        } else if (type === 'information') {
            let postData = {
                op: 'information_extend',
                target_id,
                type: 2,
                content: v
            }
            informationExtend(postData).then(res => {
                if (res.code === 200) {
                    ToastSuccess('评论成功')
                } else {
                    Toast('评论失败')
                }
                Taro.navigateBack()
            })
        } else if (type === 'business') {
            let postData = {
                op: 'business_extend',
                target_id,
                type: 2,
                content: v,
            }
            communityBusinessExtend(postData).then(res => {
                if (res.code === 200) {
                    ToastSuccess('评论成功')
                } else {
                    Toast('评论失败')
                }
                Taro.navigateBack()
            })
        }
    }

    return (
        <View className='comment_page_index'>
            <View className='input'>
                <AtTextarea
                    value={value}
                    onChange={handleChange}
                    maxLength={200}
                    height={300}
                    placeholder='请输入你的评论'
                />
            </View>
            <View
                className='submit'
                onClick={handleSubmit}
            >
                <Text>提交</Text>
            </View>
        </View>
    )

}
CommentPage.config = {
    navigationBarTitleText: '评论',
}