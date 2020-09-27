Component({
  properties: {
    // lianxidianhua | zaixiankefu | xiangji | meiyoushuju | haibao | weixin | second | third | first | zhuanfa | zhuanfa1 | xuanze | xuanze_disable | daohang | qiandao | chufang | chufang-copy | shouye | xihuan | wode | lishi | dingdan | huiyuan | chazhao | liwu | dingwei | dianhua | shezhi | linggan | dianzan | shuru | tongzhi | bianji | dengdai | shuoming | liulan | huangguan | xingji | goumai | tixing | dianpu | xingji-yellow | shouye-copy | wode-copy | user | home | home-fill | fatie | wo | icon-test | icon-test1 | icon-test2 | icon-test3 | icon-test4 | icon-test5 | icon-test6 | icon-test7 | tianjia | tianjia-copy
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      observer: function(color) {
        this.setData({
          colors: this.fixColor(),
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 30,
      observer: function(size) {
        this.setData({
          svgSize: size / 750 * wx.getSystemInfoSync().windowWidth,
        });
      },
    },
  },
  data: {
    colors: '',
    svgSize: 30 / 750 * wx.getSystemInfoSync().windowWidth,
    quot: '"',
    isStr: true,
  },
  methods: {
    fixColor: function() {
      var color = this.data.color;
      var hex2rgb = this.hex2rgb;

      if (typeof color === 'string') {
        return color.indexOf('#') === 0 ? hex2rgb(color) : color;
      }

      return color.map(function (item) {
        return item.indexOf('#') === 0 ? hex2rgb(item) : item;
      });
    },
    hex2rgb: function(hex) {
      var rgb = [];

      hex = hex.substr(1);

      if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1');
      }

      hex.replace(/../g, function(color) {
        rgb.push(parseInt(color, 0x10));
        return color;
      });

      return 'rgb(' + rgb.join(',') + ')';
    }
  }
});
