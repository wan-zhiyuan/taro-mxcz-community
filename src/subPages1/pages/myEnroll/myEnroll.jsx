import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { dispatchMyEnroll } from '../../../actions/activity'
import ActivityList from '../../../components/ActivityList'
import { useDispatch, useSelector } from '@tarojs/redux'
import CertificateBg from '../../images/honor_certificate_background.png'
import { strokeRoundRect, fillRoundRect, drawText } from './utils/draw.js'
import { getDateType } from '../../../utils/timer'
import { Toast } from '../../../utils/toast'
import { isEmpty } from '../../../utils/is'
import { AtIcon } from 'taro-ui'

import './myEnroll.scss'

export default function MyEnroll() {

    const myEnrollList = useSelector(state => state.activity.myEnrollList)
    const [isShowCanvas, setIsShowCanvas] = useState(false) // 是否现实证书
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [rate, setRate] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {

    }, [])
    useDidShow(()=>{
        async function getData() {
            await dispatch(dispatchMyEnroll())
        }
        getData()


        const d = Taro.getSystemInfoSync()
        const w = d.windowWidth * 0.85
        const h = (w / 0.75).toFixed(2)
        const rate = (d.windowWidth / 375).toFixed(2)
        console.log('width:' + w)
        console.log('height:' + h)
        console.log('rate:' + rate)
        setWidth(w)
        setHeight(h)
        setRate(1)
    })

    function handleTouchMove(e) {
        // 阻止滚动穿透
        e.stopPropagation()
    }

    async function saveCard(e) {
        //将canvas图片内容到出指定的大小的图片
        // 解决导出的图片模糊问题：
        // 方法1：将destWidth和destHeight设置为width的四倍
        // 方法2：不设置destWidth和destHeight
        let res = await Taro.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 320,
            height: 457,
            // destWidth: 1280,
            // destHeight: 1828,
            canvasId: 'cardCanvas',
            fileType: 'jpg',
            quality: 1,
        })
        let saveRes = await Taro.saveImageToPhotosAlbum({
            filePath: res.tempFilePath
        })
        if (saveRes.errMsg === 'saveImageToPhotosAlbum:ok') {
            Taro.showModal({
                title: '证书保存成功',
                content: '证书成功保存到相册',
                showCancel: false,
                confirmText: '确认'
            })
        } else {
            Taro.showModal({
                title: '证书保存失败',
                content: '请重新尝试',
                showCancel: false,
                confirmText: '确认'
            })
        }
        setIsShowCanvas(false)
        e.stopPropagation()
    }

    // 生成海报
    // function handleShowCanvas() {
    //     setIsShowCanvas(true)
    //     drawImageFunc()
    //     Taro.showLoading({
    //         title: '绘制中...'
    //     })
    // }

    // 画海报主体内容
    async function drawImageFunc(name, date) {
        console.log('drawImageFunc()')
        const ctx = Taro.createCanvasContext('cardCanvas');
        const cx = 5 * rate + 20 * rate
        const cy = 12 * rate + 20 * rate

        // 绘制海报画布大小
        ctx.fillStyle = '#fff' // 背景颜色
        // ctx.fillRect(0, 0, width, height)
        ctx.fillRect(0, 0, 320, 457)
        ctx.save()

        // 绘制背景图片
        ctx.beginPath();
        ctx.drawImage(CertificateBg, -2, 0, 322, 457); // 解决左侧白边问题, 使用偏移并且放大背景图片的办法
        ctx.restore();

        ctx.beginPath()
        drawText(ctx, '#333', name, 50 * rate, 190 * rate, 14)
        drawText(ctx, '#333', date, 200 * rate, 390 * rate, 10)
        
        ctx.save()


        // 头像
        // ctx.beginPath()
        // ctx.arc(50, 70, 25 * rate, 0, 2 * Math.PI)
        // ctx.clip()
        // ctx.drawImage(avatarPath, 25 * rate, 45 * rate, 50 * rate, 50 * rate)
        // ctx.restore()
        // ctx.closePath()

        // 绘制方块
        // strokeRoundRect(ctx, 200, 65, 95, 25, 5, 1.5, '#CEB68A')


        // // 测试：绘制圆角矩形
        // strokeRoundRect(ctx, 10, 10, 100, 50, 10)
        // fillRoundRect(ctx, 110, 110, 100, 50, 10)

        ctx.draw(false, () => {
            // setTimeout(() => {
            //     console.log('绘制完成')
            //     Taro.hideLoading()
            // }, 300)
            console.log('绘制完成')
            Taro.hideLoading()
        })

    }

    const showCertificate = (item) => {
        console.log('显示证书');
        console.log(item);
        if (isEmpty(item) || isEmpty(item.contact_name)) {
            Toast('数据异常')
            return
        }
        // const name = item.enroll_child_name.replace(';','、') + '同学'
        const name = item.contact_name + '：'
        var timestamp = Date.parse(new Date()); 
        const date = getDateType(timestamp/1000)
        setIsShowCanvas(true)
        drawImageFunc(name, date)
        Taro.showLoading({
            title: '绘制中...'
        })
        // handleShowCanvas()
    }


    return (
        <View className='my_enroll_index'>
            <ActivityList list={myEnrollList} from='myEnroll' showCertificate={showCertificate}/>
            {/* 优化点：海报的显示控制，和显示内容都放入redux，让ActivityList和ActivityItem组件耦合性更低 */}
            {
                isShowCanvas &&
                <View className="canvas-wrap" onTouchMove={handleTouchMove} onClick={() => { setIsShowCanvas(false) }}>
                    <Canvas
                        id="card-canvas"
                        className="card-canvas"
                        style={{ width: `${320}px`, height: `${457}px` }}
                        canvasId="cardCanvas"
                        onClick={(e) => { e.stopPropagation() }}>
                    </Canvas>
                    <View className='btn-save' onClick={saveCard}>
                        <AtIcon value='download' size='16' color='#fff' ></AtIcon>
                        <Text style={{ marginLeft: '10px' }}>保存到相册</Text>
                    </View>
                </View>
            }
        </View>
    )

}
MyEnroll.config = {
    navigationBarTitleText: '我的报名',
}