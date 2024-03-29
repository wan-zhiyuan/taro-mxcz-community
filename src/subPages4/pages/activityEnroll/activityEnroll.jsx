import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { ClCard, ClInput, ClRadio, ClLayout, ClSelect, ClTextarea } from "mp-colorui"
import { activityEnroll } from '../../../actions/activity'
import { Toast, ToastSuccess } from '../../../utils/toast'
import { ClUtils } from "mp-colorui/dist/weapp/lib"
import { useSelector } from '@tarojs/redux'

import './activityEnroll.scss'

export default function ActivityEnroll() {

    const router = useRouter()
    const { target_id, price } = router.params
    const activity = useSelector(state => state.activity.communityActivityDetail)

    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('男')
    const [child1, setChild1] = useState('')
    const [child2, setChild2] = useState('')
    const [child3, setChild3] = useState('')
    const [child4, setChild4] = useState('')
    const [child5, setChild5] = useState('')
    const [oftenStation, setOftenStation] = useState('')
    const [sc, setSc] = useState('') // 学校或公司
    const [remark, setRemark] = useState('')
    const [politicalId, setPoliticalId] = useState(0)
    const [isVaccinationId, setIsVaccinationId] = useState(0)

    /* 报名 */
    async function handleEnroll() {
        if (!ClUtils.rule.required(name)) {
            Toast('请输入姓名')
            return
        }
        if (!ClUtils.rule.phone(mobile)) {
            Toast('手机号不正确')
            return
        }
        // 判断price的值 执行不同报名流程
        if (activity.basic.need_enroll_age == 1) {
            if (!ClUtils.rule.required(age)) {
                Toast('请输入年龄')
                return
            }
        }


        let child_name = ''
        if (activity.basic.need_enroll_child_name_num > 0) {
            if (!ClUtils.rule.required(child1)) {
                Toast('请输入孩子1姓名')
                return
            }
            child_name = child_name + child1
        }
        if (activity.basic.need_enroll_child_name_num > 1) {
            if (!ClUtils.rule.required(child2)) {
                Toast('请输入孩子2姓名')
                return
            }
            child_name = child_name + ';' + child2
        }
        if (activity.basic.need_enroll_child_name_num > 2) {
            if (!ClUtils.rule.required(child3)) {
                Toast('请输入孩子3姓名')
                return
            }
            child_name = child_name + ';' + child3
        }
        if (activity.basic.need_enroll_child_name_num > 3) {
            if (!ClUtils.rule.required(child4)) {
                Toast('请输入孩子4姓名')
                return
            }
            child_name = child_name + ';' + child4
        }
        if (activity.basic.need_enroll_child_name_num > 4) {
            if (!ClUtils.rule.required(child5)) {
                Toast('请输入孩子5姓名')
                return
            }
            child_name = child_name + ';' + child5
        }
        let gender_data = ''
        if (activity.basic.need_enroll_gender == 1) {
            gender_data = gender
        }
        // 判断学校或者公司
        if (activity.basic.need_enroll_school_or_company == 1) {
            if (!ClUtils.rule.required(sc)) {
                Toast('请输入学校或者公司')
                return
            }
        }
        // 判断备注
        if (activity.basic.need_enroll_remarks == 1) {
            if (!ClUtils.rule.required(remark)) {
                Toast('请输入身份证号/家庭地址')
                return
            }
        }
        let political_data = ''
        if (activity.basic.need_enroll_political_outlook == 1) {
            political_data = range_political[politicalId]
        }
        let isVaccination_data = ''
        if (activity.basic.need_enroll_new_crown_vaccination == 1) {
            isVaccination_data = range_new_crown_vaccination[isVaccinationId]
        }

        let postData = {
            op: 'activity_enroll',
            activity_id: target_id,
            contact_name: name,
            contact_mobile: mobile,
            enroll_age: age,
            enroll_gender: gender_data,
            enroll_child_name: child_name,
            enroll_often_service_station: oftenStation,
            enroll_remarks: remark,
            school_or_company: sc,
            political_outlook: political_data,
            is_new_crown_vaccination: isVaccination_data,
        }
        const res = await activityEnroll(postData)
        if (res.code === 200) {
            ToastSuccess('报名成功')
            setTimeout(() => {
                Taro.navigateBack()
            }, 1500)
        } else {
            Toast(res.msg || '报名失败')
        }
    }

    function handleChangeName(v) {
        setName(v)
    }
    function handleChangeMobile(v) {
        setMobile(v)
    }
    function handleChangeAge(v) {
        setAge(v)
    }
    function handleChangeAgeGender(v) {
        setGender(v)
    }
    function handleChangeChild1(v) {
        setChild1(v)
    }
    function handleChangeChild2(v) {
        setChild2(v)
    }
    function handleChangeChild3(v) {
        setChild3(v)
    }
    function handleChangeChild4(v) {
        setChild4(v)
    }
    function handleChangeChild5(v) {
        setChild5(v)
    }
    function handleChangeOftenStation(v) {
        setOftenStation(v)
    }
    function handleChangeSchoolOrCompany(v) {
        setSc(v)
    }
    function handleChangeRemark(v) {
        setRemark(v)
    }
    function handleChangePolitical(v) {
        console.log(v);
        console.log(range_political[v]);
        setPoliticalId(v)
    }
    function handleChangeNewCrown(v) {
        console.log(v);
        console.log(range_new_crown_vaccination[v]);
        setIsVaccinationId(v)
    }


    const radioGroup = [
        {
            key: "男",
            value: "男"
        },
        {
            key: "女",
            value: "女"
        }
    ]

    const range_political = ["党员", "民主党", "无党派", "群众", "学生"];
    const range_new_crown_vaccination = ['已接种', '未接种']

    return (
        <View className='activity_enroll_index'>

            <ClLayout>
                <ClCard>
                    <ClInput title='姓名' placeholder="请输入姓名" type='text' value={name} onChange={handleChangeName} />
                    <ClInput title='电话' placeholder="请输入您的电话" type="number" value={mobile} onChange={handleChangeMobile} />
                    {
                        activity.basic.need_enroll_age == 1
                        &&
                        <ClInput title='年龄' placeholder="请输入年龄" type="number" value={age} onChange={handleChangeAge} />
                    }
                    {
                        activity.basic.need_enroll_gender == 1
                        &&
                        <ClRadio
                            type="form"
                            title="性别"
                            radioGroup={radioGroup}
                            checkedValue={gender}
                            direction="horizontal"
                            onChange={handleChangeAgeGender}
                        />
                    }
                    {
                        activity.basic.need_enroll_child_name_num > 0
                        && <ClInput title='孩子1' placeholder="请输入孩子1姓名" type="text" value={child1} onChange={handleChangeChild1} />
                    }
                    {
                        activity.basic.need_enroll_child_name_num > 1
                        && <ClInput title='孩子2' placeholder="请输入孩子2姓名" type="text" value={child2} onChange={handleChangeChild2} />
                    }
                    {
                        activity.basic.need_enroll_child_name_num > 2
                        && <ClInput title='孩子3' placeholder="请输入孩子3姓名" type="text" value={child3} onChange={handleChangeChild3} />
                    }
                    {
                        activity.basic.need_enroll_child_name_num > 3
                        && <ClInput title='孩子4' placeholder="请输入孩子4姓名" type="text" value={child4} onChange={handleChangeChild4} />
                    }
                    {
                        activity.basic.need_enroll_child_name_num > 4
                        && <ClInput title='孩子5' placeholder="请输入孩子5姓名" type="text" value={child5} onChange={handleChangeChild5} />
                    }
                    {
                        activity.basic.need_enroll_often_service_station == 1
                        &&
                        <ClInput title='常去驿站' placeholder="请输入常去驿站" type="text" value={oftenStation} onChange={handleChangeOftenStation} />
                    }
                    {
                        activity.basic.need_enroll_school_or_company == 1
                        &&
                        <ClInput title='学校或单位' placeholder="请输入学校或单位" type="text" value={sc} onChange={handleChangeSchoolOrCompany} />
                    }
                    {
                        activity.basic.need_enroll_remarks == 1
                        &&
                        // <ClInput title='备注' 
                        // placeholder="请输入身份证号/家庭地址等" 
                        // type="text" 
                        // value={remark} 
                        // onChange={handleChangeRemark} />
                        <ClTextarea 
                        placeholder="请输入身份证号/家庭地址"
                        value={remark} 
                        onChange={handleChangeRemark}
                         />
                    }
                </ClCard>
                {
                    (activity.basic.need_enroll_political_outlook == 1) || (activity.basic.need_enroll_new_crown_vaccination == 1)
                        ?
                        <ClCard>
                            {
                                activity.basic.need_enroll_political_outlook == 1
                                &&
                                <ClSelect
                                    selector={{ 
                                        range: range_political,
                                        value: politicalId,
                                     }}
                                    mode="selector"
                                    title="政治面貌"
                                    onChange={handleChangePolitical}
                                />
                            }
                            {
                                activity.basic.need_enroll_new_crown_vaccination == 1
                                &&
                                <ClSelect
                                // selector使用value来记录值的变化
                                    selector={{ 
                                        range: range_new_crown_vaccination,
                                        value: isVaccinationId,
                                    }}
                                    mode="selector"
                                    title="新冠疫苗"
                                    onChange={handleChangeNewCrown}
                                />
                            }
                        </ClCard>
                        : null
                }

            </ClLayout>
            {
                (Number(activity.basic.need_honor_certificate || 0) === 1) &&
                <View className='activity_enroll_ps'>
                    PS:建议填写真实姓名 会关联到证书
                </View>
            }

            <View className='enroll_box'>
                <View className='enroll' onClick={handleEnroll}>报名</View>
            </View>
        </View>
    )

}
ActivityEnroll.config = {
    navigationBarTitleText: '报名',
}
