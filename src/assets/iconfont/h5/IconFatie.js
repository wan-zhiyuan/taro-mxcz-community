/* eslint-disable */

import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconFatie = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 64C262.4 64 64 262.4 64 512s198.4 448 448 448 448-198.4 448-448-198.4-448-448-448z m0 832c-211.2 0-384-172.8-384-384s172.8-384 384-384 384 172.8 384 384-172.8 384-384 384z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M672 480h-128v-128c0-19.2-12.8-32-32-32s-32 12.8-32 32v128h-128c-19.2 0-32 12.8-32 32s12.8 32 32 32h128v128c0 19.2 12.8 32 32 32s32-12.8 32-32v-128h128c19.2 0 32-12.8 32-32s-12.8-32-32-32z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IconFatie.defaultProps = {
  size: 30,
};

export default IconFatie;
