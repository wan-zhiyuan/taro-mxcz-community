/* eslint-disable */

import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconFirst = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M657.212778 692.010817c198.527542-34.618449 302.065663-272.621051 302.065663-485.913878-63.067384 0-134.414339 0-162.91751 0 9.620102-68.769246 15.646352-124.139322 15.646352-143.373385-91.650373 0-506.526335 0-598.173638 0 3.317559 36.776601 7.833409 87.304392 14.016225 143.373385-28.79686 0-99.963713 0-163.856905 0 0 216.192877 104.930841 453.824019 307.677475 486.460324 32.152281 41.288358 56.08025 58.536184 83.363639 67.988464 0 19.120476 0 47.786353 0 47.786353L339.263355 808.332079l-86.837764 152.959717 520.990768 0L686.578596 808.333102 570.804802 808.333102l0-47.786353C595.832825 754.150062 628.084367 727.289298 657.212778 692.010817zM715.530998 598.039585c24.75173-57.706283 52.937676-207.106941 72.409147-334.572008 12.798491 0 32.917714 0 60.302411 0 0 179.800016-78.458933 313.974901-135.833665 341.376994C713.450616 602.567715 714.549647 600.293929 715.530998 598.039585zM175.243745 263.4686c26.479071 0 46.303582 0 59.31799 0 15.940041 128.166031 40.496319 269.923616 78.456886 341.55198C254.878456 578.178235 175.243745 443.267593 175.243745 263.4686zM399.837966 563.42216 399.837966 503.305991l75.555813 0L475.393779 271.492344l-77.660754 17.544585 0-61.98882 153.216567-32.280194L550.949592 503.305991l75.088162 0 0 60.117193L399.837966 563.423183z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconFirst.defaultProps = {
  size: 30,
};

export default IconFirst;
