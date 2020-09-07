import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import BBSItem from '../HomeBBSItem'

import './index.scss'

export default function Index(props) {

    const [bbsData, setBbsData] = useState([
        {avatar:'',realname:'老王',desc:'',picArr:[],publishTime:'2020-08-07 15:55', readed:'5468', praise:'58'},
        {avatar:'',realname:'老万',desc:'',picArr:[],publishTime:'2020-07-07 01:55', readed:'1255', praise:'200'},
        {avatar:'',realname:'老周',desc:'',picArr:[],publishTime:'2020-02-011 12:00', readed:'900', praise:'198'},
        {avatar:'',realname:'小确幸',desc:'',picArr:[],publishTime:'2020-01-20 09:06', readed:'12306', praise:'2453'},
        {avatar:'',realname:'不会吧不会吧',desc:'',picArr:[],publishTime:'2019-06-19 21:23', readed:'4763', praise:'2500'},
    ])

    return (
        <View className='bbs_index'>
            <View className='title'>
                <Text style={{ marginLeft: '15px' }}>社区论坛</Text>
            </View>
            <View className='content'>
                {
                    bbsData.map((item, idx) => {
                        return (
                            <BBSItem key={'index_' + idx} bbsItem={item}/>
                        )
                    })
                }
            </View>
        </View>
    )
}

Index.defaultProps = {

}