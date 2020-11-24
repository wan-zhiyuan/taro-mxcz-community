import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtInput } from 'taro-ui'
import { ClTextarea } from "mp-colorui";
import { getCooperate, postCooperate, updateCooperate } from '../../../actions/user'
import { ClUtils } from "mp-colorui/dist/weapp/lib"

import './cooperate.scss'
import { Toast } from '../../../utils/toast';

export default function Cooperate() {

    const router = useRouter()
    const { status = 0 } = router.params // status=0\1\2 0-新增 1-修改


    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [content, setContent] = useState('')
    const [btnText, setBtnText] = useState('申请合作')
    const [cid, setCid] = useState(0)

    useEffect(() => {
        async function getInit(){
            if (status == 0) {

            } else if (status == 1) {
                const res = await getCooperate()
                if (res.code !== 200) {
                    return
                }
                let cooperateData = res.data
                setName(cooperateData.coop_name)
                setMobile(cooperateData.coop_phone)
                setEmail(cooperateData.coop_email)
                setContent(cooperateData.coop_content)
                setBtnText('修改')
                setCid(cooperateData.id)
            }
        }
        getInit()
    }, [])

    function handleChangeName(value) {
        setName(value)
    }
    function handleChangeMobile(value) {
        setMobile(value)
    }
    function handleChangeEmail(value) {
        setEmail(value)
    }
    function handleChangeContent(value) {
        setContent(value)
    }


    async function handleCooperate() {
        console.log('handleCooperate（）')
        console.log('status=' + status)
        if (!ClUtils.rule.required(name)) {
            Toast('请输入申请人名称')
            return
        }
        if (!ClUtils.rule.phone(mobile)) {
            Toast('电话不正确')
            return
        }
        if (!ClUtils.rule.required(email)) {
            Toast('请输入电子邮箱')
            return
        }
        if (!ClUtils.rule.required(content)) {
            Toast('请输入合作意向')
            return
        }
        if (content.length > 200) {
            Toast('合作意向字数超过最大限制')
            return
        }
        if (Number(status) === 0) {
            // 提交合作申请
            console.log('提交合作申请')
            let postData = { 
                op: 'cooperate',
                coop_name: name, 
                coop_phone: mobile, 
                coop_email: email, 
                coop_content: content }
            const resPost = await postCooperate(postData)
            if (resPost.code === 200) {
                Toast('提交成功')
                Taro.showLoading()
                setTimeout(() => {
                    Taro.hideLoading()
                    Taro.navigateBack()
                }, 1000)
            }
        } else {
            // 修改合作申请
            console.log('修改合作申请')
            let putData = { 
                op: 'cooperate',
                coop_name: name, 
                coop_phone: mobile, 
                coop_email: email, 
                coop_content: content }
            const resPut = await updateCooperate(cid, putData)
            if (resPut.code === 200) {
                Toast('提交成功')
                Taro.showLoading()
                setTimeout(() => {
                    Taro.hideLoading()
                    Taro.navigateBack()
                }, 1000)
            }
        }
    }

    return (
        <ScrollView
            className='cooperate_index'
            scrollY
        >
            <AtInput
                name='value1'
                title='申请人：'
                type='text'
                maxLength={32}
                placeholder='请输入机构/个人名称'
                value={name}
                onChange={handleChangeName}
            // onBlur={hanldeBlurName}
            />
            <AtInput
                name='value2'
                title='联系方式：'
                type='phone'
                maxLength={16}
                placeholder='请输入联系方式'
                value={mobile}
                onChange={handleChangeMobile}
            // onBlur={handleBlurMobile}
            />
            <AtInput
                name='value2'
                title='邮箱：'
                type='text'
                maxLength={16}
                placeholder='请输入邮箱'
                value={email}
                onChange={handleChangeEmail}
            // onBlur={handleBlurMobile}
            />

            <View className='cooperate_content'>
                <Text className='label'>具体意向：</Text>
                <View className='value'>
                    <ClTextarea
                        className='textarea'
                        value={content}
                        onChange={handleChangeContent}
                        placeholder="请输入……"
                        showLengthTip
                        height={220}
                        maxLength={200} />
                </View>
            </View>

            <View className='cooperate_btn' onClick={handleCooperate}>
                <Text>{btnText}</Text>
            </View>
        </ScrollView>
    )

}
Cooperate.config = {
    navigationBarTitleText: '合作申请',
}