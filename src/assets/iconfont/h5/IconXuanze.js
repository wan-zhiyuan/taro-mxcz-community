/* eslint-disable */

import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconXuanze = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M511.984 64C264.976 64 64 264.96 64 512.016 64 759.024 264.976 960 511.984 960 759.056 960 960 759.024 960 512.016 960 264.944 759.024 64 511.984 64z"
        fill={getIconColor(color, 0, '#FFBD27')}
      />
      <path
        d="M456.624 685.696a36.8 36.8 0 0 1-26.112-10.848l-147.712-148.32c-14.4-14.464-14.4-37.968 0-52.432a36.816 36.816 0 0 1 52.224 0l121.6 122.08 232.352-233.28a36.752 36.752 0 0 1 52.224 0c14.4 14.464 14.4 37.92 0 52.4L482.736 674.848a36.864 36.864 0 0 1-26.112 10.848z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IconXuanze.defaultProps = {
  size: 30,
};

export default IconXuanze;
