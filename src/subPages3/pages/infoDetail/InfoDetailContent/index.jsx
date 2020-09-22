import Taro from '@tarojs/taro'
import { View, Video, Image } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'

import './index.scss'

export default function Index(props) {

    const infoDetail = useSelector(state => state.publish.informationDetail.basic)

    return (
        <View className='info_detail_content'>
            {
                !!infoDetail.video_url &&
                <View className='box_video'>
                    <Video
                        className='video'
                        // src='https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
                        src={infoDetail.video_url}
                        controls={true} // 是否显示默认播放控件
                        autoplay={false}
                        // poster='https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg' // 预览图
                        poster=''
                        initialTime='0'
                        id='video'
                        loop={false}
                        muted={false}
                    />
                </View>
            }
            {
                infoDetail.images !== '' &&
                <View className='box_image'>
                    {
                        infoDetail.images.split('|').map((item, idx) => {
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
            }
        </View>
    )
}
Index.defaultProps = {

}