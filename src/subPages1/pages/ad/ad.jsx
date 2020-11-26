import Taro, { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './ad.scss'

export default function Ad() {

    const router = useRouter()
    const { url } = router.params

    function handleClickImage() {
        Taro.previewImage({
            urls:[url]
        })
    }

    return (
        <View className='ad_index'>
            <Image className='ad_image' src={url} mode='scaleToFill' onClick={handleClickImage}/>
        </View>
    )

}
Ad.config = {
    navigationBarTitleText: '',
}