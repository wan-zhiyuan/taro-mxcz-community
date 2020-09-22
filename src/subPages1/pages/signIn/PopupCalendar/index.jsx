import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PopupWrap from '../../../../components/PopupWrap'
import { ClCalendar } from "mp-colorui"
import dayjs from 'dayjs'

import './index.scss'

export default function Index(props) {

    const { isOpened, onClose, dayData} = props

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
                    tipDay={[
                        {
                            date: dayjs().format("YYYY-MM-DD"),
                            tipTop: '已签到',
                            tipTopColor: 'red',
                        },
                        {
                            date: dayjs().add(1,'day').format("YYYY-MM-DD"),
                            tipTop: '已签到',
                            tipTopColor: 'red',
                        },
                        {
                            date: dayjs().add(2,'day').format("YYYY-MM-DD"),
                            tipTop: '已签到',
                            tipTopColor: 'red',
                        },
                        // {
                        //     date: dayjs()
                        //         .add(4, "day")
                        //         .format("YYYY-MM-DD"), // 已今天为基准+4天
                        //     tipTop: "生日",
                        //     tipBottom: "可预约",
                        //     tipTopColor: "red",
                        //     tipBottomColor: "green"
                        // },
                        // {
                        //     date: dayjs()
                        //         .add(8, "day")
                        //         .format("YYYY-MM-DD"),
                        //     tipTop: "回家",
                        //     tipBottom: "可预约",
                        //     tipTopColor: "red",
                        //     tipBottomColor: "olive"
                        // }
                    ]}
                    // badge={[
                    //     {
                    //         date: dayjs()
                    //             .add(4, "day")
                    //             .format("YYYY-MM-DD"),
                    //         color: "red",
                    //         num: 3
                    //     },
                    //     {
                    //         date: dayjs()
                    //             .add(8, "day")
                    //             .format("YYYY-MM-DD"),
                    //         color: "pink"
                    //     }
                    // ]}
                    
                />
            </View>
        </PopupWrap>
    )
}
Index.defaultProps = {
    isOpened: true,
    onClose: ()=>{},
    dayData: [], // 用户的签到数据
}