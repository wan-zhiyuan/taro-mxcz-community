/* eslint-disable */

import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconLishi = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 958.708971c-246.324128 0-446.708971-200.39303-446.708971-446.708971S265.675872 65.290005 512 65.290005 958.708971 265.684058 958.708971 512 758.324128 958.708971 512 958.708971z m0-824.693721c-208.42189 0-377.98475 169.56286-377.98475 377.98475S303.57811 889.98475 512 889.98475s377.98475-169.56286 377.98475-377.98475S720.42189 134.01525 512 134.01525z"
        fill={getIconColor(color, 0, '#444444')}
      />
      <path
        d="M628.680443 710.055798L479.106846 560.481178a34.363645 34.363645 0 0 1-10.064217-24.297383V297.380968h85.905532v217.448474l134.478808 134.478807-60.746526 60.747549z"
        fill={getIconColor(color, 1, '#00D8A0')}
      />
    </svg>
  );
};

IconLishi.defaultProps = {
  size: 30,
};

export default IconLishi;
