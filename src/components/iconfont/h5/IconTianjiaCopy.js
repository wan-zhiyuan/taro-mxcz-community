/* eslint-disable */

import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconTianjiaCopy = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M511.984 64C264.976 64 64 264.96 64 512.016 64 759.024 264.976 960 511.984 960 759.056 960 960 759.024 960 512.016 960 264.944 759.024 64 511.984 64z"
        fill={getIconColor(color, 0, '#82f461')}
      />
      <path
        d="M695.76 552.16h-143.616v143.536A40.224 40.224 0 0 1 512 735.936a40.256 40.256 0 0 1-40.128-40.24v-143.52h-143.632a40.208 40.208 0 1 1 0-80.4h143.632v-143.584a40.16 40.16 0 1 1 80.288 0v143.568h143.616a40.208 40.208 0 1 1 0 80.416z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IconTianjiaCopy.defaultProps = {
  size: 18,
};

export default IconTianjiaCopy;
