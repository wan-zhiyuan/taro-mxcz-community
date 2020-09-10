import { isEmpty } from './is'
import { get as getGlobalData } from '../global_data'
import { Toast } from './toast'

/* 用于商品名称的分割 （规则：中文#英文) */
export function nameSplit(name) {
    // if (name.split('#')[1]) {
    //     return name.split('#')
    // } else {
    //     return [name, '']
    // }
    return name.split('#')
}

/* 富文本添加样式 */
export function richParse(richtext) {
    if (isEmpty(richtext)) {
        return ''
    }
    // console.log('richtext:' + richtext)
    // let newTxt = richtext
    // let newTxt = richtext.replace(/width\s*:\s*[0-9]+px/g, 'width:100%');
    // let newTxt = richtext.replace(/<([\/]?)(center)((:?\s*)(:?[^>]*)(:?\s*))>/g, '<$1div$3>');//替换center标签
    // let newTxt = richtext.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/ig, 'style="width:100%;height:auto;display: block;margin:auto"')
    let newTxt = richtext.replace(/\<img/gi, '<img class="rich-img" ') //正则给img标签增加class
    newTxt = newTxt.replace(/\<p/gi, '<P class="rich-p" ');//正则给p标签增加class
    // console.log('newTxt:' + newTxt)
    return newTxt
}

/* 判断网络 */
export function judgeNetwork() {
    var network = getGlobalData('network')
    if (network === 0) {
        Toast('网络异常')
        return false
    }
    return true
}

/* 判断是否有Mid和桌号 */
export function judgeMidTable() {
    let mid = getGlobalData('mid') || 0
    if (isEmpty(mid) || mid === 0) {
        // Toast('mid=0，不允许使用点餐功能')
        Toast('点餐功能仅店内扫码场景使用')
        return false
    }
    let tn_id = getGlobalData('tn_id') || 0
    if (isEmpty(tn_id) || tn_id === 0) {
        // Toast('tn_id=0，不允许使用点餐功能')
        Toast('点餐功能仅店内扫码场景使用')
        return false
    }
    return true
}


