import Taro, { useState } from '@tarojs/taro'
import { View, Video } from '@tarojs/components'

import './index.scss'

export default function Index(props) {

    const { } = props

    const [images, setImages] = useState([
        'http://5b0988e595225.cdn.sohucs.com/images/20180708/5d4fbf3f4f894bada7f19928775690d5.jpeg',

    ])

    return (
        <View className='info_detail_content'>
            <View className='box_video'>
                <Video
                    className='video'
                    src='https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
                    controls={true} // 是否显示默认播放控件
                    autoplay={false}
                    poster='https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
                    initialTime='0'
                    id='video'
                    loop={false}
                    muted={false}
                />
            </View>
            <View className='box_image'>
                {
                    images.map((item, idx) => {
                        return (
                            <Image
                                key={'index_' + idx}
                                className='image'
                                src={item}
                                mode='widthFix'
                            ></Image>
                        )
                    })
                }
            </View>
        </View>
    )
}
Index.defaultProps = {

}