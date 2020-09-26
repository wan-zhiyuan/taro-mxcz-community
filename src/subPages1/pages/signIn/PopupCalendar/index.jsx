import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PopupWrap from '../../../../components/PopupWrap'
import { ClCalendar } from "mp-colorui"

import './index.scss'

export default function Index(props) {

    const { isOpened, onClose, signList } = props

    function handleClickCalendar(e) {
        // 如果传递了onClose给PopupWrap，即点击阴影区域可以关闭，
        // 需要设置显示的组件部分禁止冒泡，避免点击显示的弹窗造成弹窗关闭的现象
        e.stopPropagation()
    }

    return (
        <PopupWrap isOpened={isOpened} onClose={onClose}>
            <View className='popup_calendar' onClick={handleClickCalendar}>
                <ClCalendar
                    showType="full"
                    calendarType="month"
                    tipDay={signList}
                />
            </View>
        </PopupWrap>
    )
}
Index.defaultProps = {
    isOpened: true,
    onClose: () => { },
    signList: [], // 用户的签到数据
}