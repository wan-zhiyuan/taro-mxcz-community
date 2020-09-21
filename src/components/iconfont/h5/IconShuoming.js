/* eslint-disable */

import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconShuoming = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 958.708971c-246.322082 0-446.704878-200.392006-446.704878-446.714088 0-246.313895 200.382796-446.704878 446.704878-446.704878s446.704878 200.392006 446.704878 446.704878c0 246.323105-200.382796 446.714088-446.704878 446.714088z m0-824.694745c-208.419843 0-377.98168 169.561837-377.98168 377.981681 0 208.42803 169.561837 377.989867 377.98168 377.989867s377.98168-169.561837 377.98168-377.989867c-0.001023-208.419843-169.561837-377.98168-377.98168-377.981681z"
        fill={getIconColor(color, 0, '#444444')}
      />
      <path
        d="M554.947138 328.503802c0-18.977213-15.384385-34.361599-34.361599-34.361598h-17.181311c-18.977213 0-34.361599 15.384385-34.361599 34.361598v240.533239h85.904509V328.503802z"
        fill={getIconColor(color, 1, '#00D8A0')}
      />
      <path
        d="M511.994883 671.659303m-51.542909 0a51.54291 51.54291 0 1 0 103.085819 0 51.54291 51.54291 0 1 0-103.085819 0Z"
        fill={getIconColor(color, 2, '#00D8A0')}
      />
    </svg>
  );
};

IconShuoming.defaultProps = {
  size: 18,
};

export default IconShuoming;
