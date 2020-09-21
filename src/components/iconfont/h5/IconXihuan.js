/* eslint-disable */

import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconXihuan = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 907.198807c-18.537192 0-35.900651-7.255241-48.919153-20.433378L140.374074 560.376801C83.402525 502.750335 56.895825 423.089018 67.632353 341.79962c10.670014-80.634482 57.475016-150.632719 128.455627-192.044898 99.382475-57.994855 228.64242-37.989219 314.301336 48.659233l1.610684 1.627057 1.610684-1.627057c85.676311-86.665849 214.95263-106.654089 314.301336-48.659233 70.979588 41.420365 117.785613 111.418602 128.455627 192.054108 10.736529 81.280188-15.769149 160.950715-72.741721 218.567971L560.90278 886.781802c-13.002129 13.160741-30.365588 20.417005-48.90278 20.417005zM319.140551 185.495738c-30.767747 0-61.182454 7.708566-88.426959 23.603581-52.492538 30.633694-87.101777 82.278935-94.953605 141.708465-7.934716 60.075237 11.541871 118.850875 53.465702 161.252591l322.723146 326.406025 322.823429-326.406025c41.923832-42.401716 61.400419-101.177354 53.465703-161.244404-7.850805-59.429531-42.460044-111.074771-94.953606-141.708466-72.322166-42.209334-167.224606-26.724665-230.823086 37.620829l-26.037003 26.330692c-12.884448 13.052271-35.96819 13.052271-48.852638 0l-26.037002-26.330692c-39.656185-40.102347-91.478458-61.232596-142.394081-61.232596z m540.059056 350.72285h0.167822-0.167822z"
        fill={getIconColor(color, 0, '#444444')}
      />
      <path
        d="M461.252199 546.622542l-60.736293 60.736293-170.06121-170.061211c-26.835182-26.835182-26.835182-70.343091 0-97.178273l12.147668-12.147668 218.649835 218.650859z"
        fill={getIconColor(color, 1, '#00D8A0')}
      />
    </svg>
  );
};

IconXihuan.defaultProps = {
  size: 18,
};

export default IconXihuan;
