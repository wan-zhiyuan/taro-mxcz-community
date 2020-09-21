/* eslint-disable */

import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconWo = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M640 473.6c57.6-38.4 96-108.8 96-185.6C736 166.4 633.6 64 512 64S288 166.4 288 288c0 76.8 38.4 140.8 96 185.6-147.2 57.6-256 211.2-256 390.4 0 19.2 0 44.8 6.4 70.4 0 12.8 12.8 25.6 32 25.6h691.2c12.8 0 32-12.8 32-25.6 6.4-25.6 6.4-44.8 6.4-70.4 0-179.2-108.8-332.8-256-390.4zM352 288C352 198.4 422.4 128 512 128s160 70.4 160 160S601.6 448 512 448 352 377.6 352 288zM832 896H192v-32C192 672 332.8 512 512 512s320 160 320 352v32z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconWo.defaultProps = {
  size: 30,
};

export default IconWo;
