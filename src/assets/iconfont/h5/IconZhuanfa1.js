/* eslint-disable */

import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconZhuanfa1 = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M565.248 839.68c-19.2 0-36.4544-11.3664-44.032-29.0304L428.6976 594.944 213.3504 502.7328A47.73376 47.73376 0 0 1 184.32 458.24a47.75424 47.75424 0 0 1 29.952-43.9296l559.5136-226.4576c17.8688-7.2192 38.1952-3.072 51.8656 10.5472a47.89248 47.89248 0 0 1 10.5472 51.8656l-226.4576 559.5136a47.70816 47.70816 0 0 1-43.9296 29.9008h-0.5632zM240.7936 458.8032l209.2544 89.6c11.3664 4.864 20.2752 13.824 25.1904 25.1392l89.9072 209.664 220.5696-544.9728L240.7936 458.8032zM783.36 211.6096z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconZhuanfa1.defaultProps = {
  size: 30,
};

export default IconZhuanfa1;
