import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtDivider } from 'taro-ui'
import PublishItem from '../../../components/PublishItem'

import './index.scss'

export default function Index(props) {

    const { hasMore } = props

    const [publishList, setPublishList] = useState([
        {
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599502290284&di=385a6ac02b837f35299026bbfc2b2e9f&imgtype=0&src=http%3A%2F%2Fdp.gtimg.cn%2Fdiscuzpic%2F0%2Fdiscuz_x5_gamebbs_qq_com_forum_201306_19_1256219xc797y90heepdbh.jpg%2F0',
            realname: '老王', desc: '众所周知，酷热炎炎夏季是白酒的销售淡季，在这个时候，是选择默默等待淡季来临?还是未雨绸缪将促销进行到底，打一场漂亮的淡季冲锋战?相信贵厂一定会明智的选择后者! ',
            picArr: [
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599502060313&di=9176e19112bcaf9883dcd26aaf43591f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Fthumb150%2F9cd8eac3gy1gfv5ohdh2fj20hs0dcmym.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599502060312&di=262cd2b9c10618469886f5aa90b001ab&imgtype=0&src=http%3A%2F%2Fk.sinaimg.cn%2Fn%2Fsinakd2020813s%2F80%2Fw960h720%2F20200813%2F069d-ixreehp6316874.jpg%2Fw150h100f1t0l0q100syf.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599502060313&di=30e111e55fceca4a1545fa358d4fc1e1&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fbaike%2Fs%253D220%2Fsign%3Dd8e8ff028626cffc6d2ab8b089004a7d%2F63d0f703918fa0ec6757ed96229759ee3c6ddb9d.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599502060312&di=f5fbd52f8283458b096389fe49ece31b&imgtype=0&src=http%3A%2F%2Fk.sinaimg.cn%2Fn%2Fsinakd20200807s%2F305%2Fw553h552%2F20200807%2F9727-ixkvvuc9637694.jpg%2Fw150h100f1t0l0q100syf.jpg'
            ], publishTime: '2020-08-07 15:55', read: '5468', like: '58'
        },
        {
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599502313302&di=91ed2151654cfeb784615f593de1d417&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3D4ade172e8ad4b31cf03c94b3b7d7276f%2Fe5452d55b319ebc4b7767af48326cffc1f1716c0.jpg',
            realname: '老万', desc: '为迎接中国第四届国际动漫节的召开，欢庆“五一”国际劳动节，提高广大干部群众的环境卫生意识，进一步推进街道实施“最清洁城乡”工程，根据杭州市“第四次百万市民清洁大行动”统一部署，经研究，决定在全街道组织开展以“迎动漫、庆五一”为主题的清洁城乡大行动。',
            picArr: [
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599502413024&di=f6b543460f296e8754e6c94daa5e8569&imgtype=0&src=http%3A%2F%2Fwww.oujian.net%2Fuploadfiles%2Fpictures%2Fnews%2F20181101153321_6509.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599502470054&di=0dfbc6b018a9ec4d9884ff19e7f2a2b1&imgtype=0&src=http%3A%2F%2Fp3.img.cctvpic.com%2Fphotoworkspace%2Fcontentimg%2F2019%2F07%2F27%2F2019072719325022887.jpg'
            ], publishTime: '2020-07-07 01:55', read: '1255', like: '200'
        },
        {
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599502369267&di=cf15aa383b3c455f97f4f4c97c36892c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201311%2F13%2F20131113205308_4mAC8.jpeg',
            realname: '老周', desc: '你是最棒的',
            picArr: [
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599502493585&di=03ae4ef5a5e86b9559d798b824878228&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1606%2F09%2Fc5%2F22592303_1465431295276_mthumb.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599502493583&di=62fe27c0a8813fab2ae0facb3914d447&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180210%2Fcd88b7f4fa0b499c8975200f6c57c1f5.jpeg',
                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1413333322,1381745219&fm=26&gp=0.jpg',
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2251655685,1021679266&fm=26&gp=0.jpg'
            ], publishTime: '2020-02-011 12:00', read: '900', like: '198'
        },
        {
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599502575455&di=759afdd787aa570b54f724c841465030&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201310%2F24%2F20131024112350_CXVuJ.thumb.700_0.gif',
            realname: '小确幸', desc: '为了深入开展“爱我环保模范城”环保主题月活动，进一步提高我校学生的环保意识和激发学生参与环保社会实践活动的积极性，积极响应市教育局、市环保局的号召，通过小手牵大手、孩子带动家庭的形式，发动全社会关注污染减排，以实际行动保护身边的环境。经学校研究决定：我校将举行“校园二手市场进社区”活动。',
            picArr: [
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599502618298&di=a481fe1ce7f5819cbcf7a989fb5bbc12&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20150713%2Fmp22466698_1436756023392_2.jpeg'
            ], publishTime: '2020-01-20 09:06', read: '12306', like: '2453'
        },
        {
            avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=219620645,1001703926&fm=26&gp=0.jpg',
            realname: '不会吧不会吧', desc: '你好',
            picArr: [
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599502682859&di=3638a3507c1d8fdb19a09917ee88b4b7&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20190125%2Fb6d308671cdd4deabf2e303238ff219c.jpeg'
            ], publishTime: '2019-06-19 21:23', read: '4763', like: '2500'
        },
    ])

    return (
        <View className='home_publish_index'>
            <View className='title'>
                <Text style={{ marginLeft: '15px' }}>社区发布</Text>
            </View>
            <View className='content'>
                {
                    publishList.map((item, idx) => {
                        return (
                            <PublishItem key={'index_' + idx} publishItem={item} />
                        )
                    })
                }
            </View>
            {
                !hasMore &&
                <View className='divider'>
                    <AtDivider
                    height={50}
                    content='没有更多了'
                    fontSize={20}
                    fontColor='#ccc'
                    lineColor='#ccc' />
                </View>
                
            }
        </View>
    )
}

Index.defaultProps = {
    hasMore: false,
}