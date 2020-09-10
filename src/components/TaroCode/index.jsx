import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Barcode, QRCode } from 'taro-code'

// class TaroCode extends Component {
//   render() {
//     return (
//       <View>
//         {/* <Barcode text='crayon' width={300} height={60} scale={4} /> */}
//         <QRCode
//           text='crayon'
//           size={300}
//           scale={4}
//           errorCorrectLevel='M'
//           typeNumber={2}
//         />
//       </View>
//     )
//   }
// }

export default function TaroCode(props) {

  return (
    <View>
      {/* <Barcode text='crayon' width={300} height={60} scale={4} /> */}
      <QRCode
        text='crayon'
        size={100}
        scale={4}
        errorCorrectLevel='M'
        typeNumber={2}
      />
    </View>
  )
}