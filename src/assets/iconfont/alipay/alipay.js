Component({
  props: {
    // meiyoushuju | haibao | weixin | second | third | first | zhuanfa | zhuanfa1 | xuanze | xuanze_disable | daohang | qiandao | chufang | chufang-copy | shouye | xihuan | wode | lishi | dingdan | huiyuan | chazhao | liwu | dingwei | dianhua | shezhi | linggan | dianzan | shuru | tongzhi | bianji | dengdai | shuoming | liulan | huangguan | xingji | goumai | tixing | dianpu | xingji-yellow | shouye-copy | wode-copy | user | home | home-fill | fatie | wo | icon-test | icon-test1 | icon-test2 | icon-test3 | icon-test4 | icon-test5 | icon-test6 | icon-test7 | tianjia | tianjia-copy
    name: null,
    // string | string[]
    color: '',
    size: 18,
  },
  data: {
    quot: '"',
    svgSize: 18,
    isStr: true,
  },
  didMount() {
    const size = this.props.size;
    const color = this.props.color;

    this.setData({
      isStr: typeof color === 'string',
    });

    if (size !== this.data.svgSize) {
      this.setData({
        svgSize: size / 750 * my.getSystemInfoSync().windowWidth,
      });
    }
  },
  disUpdate(prevProps) {
    const size = this.props.size;
    const color = this.props.color;

    if (color !== prevProps.color) {
      this.setData({
        isStr: typeof color === 'string',
      });
    }

    if (size !== prevProps.size) {
      this.setData({
        svgSize: size / 750 * my.getSystemInfoSync().windowWidth,
      });
    }
  },
});
