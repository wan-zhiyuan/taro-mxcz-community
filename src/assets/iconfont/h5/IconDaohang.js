/* eslint-disable */

import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconDaohang = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1025 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M0 708.758693C0 621.843389 70.755296 551.384615 157.374078 551.384615L315.241314 551.384615C402.156623 551.384615 472.615385 622.139912 472.615385 708.758693L472.615385 866.625922C472.615385 953.541226 401.860096 1024 315.241314 1024L157.374078 1024C70.458774 1024 0 953.244704 0 866.625922L0 708.758693ZM0 157.374078C0 70.458774 70.755296 0 157.374078 0L315.241314 0C402.156623 0 472.615385 70.755296 472.615385 157.374078L472.615385 315.241307C472.615385 402.156611 401.860096 472.615385 315.241314 472.615385L157.374078 472.615385C70.458774 472.615385 0 401.860088 0 315.241307L0 157.374078ZM689.908775 40.434208C743.913118-13.57015 831.655739-13.385909 885.47584 40.434208L983.565785 138.524156C1037.570166 192.52851 1037.385925 280.271116 983.565785 334.091229L885.47584 432.181177C831.471498 486.185535 743.728876 486.001294 689.908775 432.181177L591.818831 334.091229C537.814449 280.086875 537.99869 192.344269 591.818831 138.524156L689.908775 40.434208ZM551.384615 708.758693C551.384615 621.843389 622.139904 551.384615 708.758686 551.384615L866.62593 551.384615C953.541238 551.384615 1024 622.139912 1024 708.758693L1024 866.625922C1024 953.541226 953.244711 1024 866.62593 1024L708.758686 1024C621.843377 1024 551.384615 953.244704 551.384615 866.625922L551.384615 708.758693Z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconDaohang.defaultProps = {
  size: 30,
};

export default IconDaohang;
