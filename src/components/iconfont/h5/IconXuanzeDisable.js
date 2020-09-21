/* eslint-disable */

import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconXuanzeDisable = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 64C262.4 64 64 262.4 64 512s198.4 448 448 448 448-198.4 448-448S761.6 64 512 64z m0 844.8c-217.6 0-396.8-179.2-396.8-396.8S294.4 115.2 512 115.2 908.8 294.4 908.8 512 729.6 908.8 512 908.8z"
        fill={getIconColor(color, 0, '#363F4D')}
      />
    </svg>
  );
};

IconXuanzeDisable.defaultProps = {
  size: 18,
};

export default IconXuanzeDisable;
