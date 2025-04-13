import * as React from 'react';

const CheckIcon = (props: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.width ?? '16'}
    height={props.height ?? '16'}
    fill='none'
    viewBox='0 0 16 16'
    className={props.className ?? ''}
  >
    <path
      fill='#3897F0'
      d='m5.527 16-1.382-2.438-2.618-.61.255-2.819L0 8l1.782-2.133-.255-2.82 2.618-.609L5.527 0 8 1.105 10.473 0l1.381 2.438 2.619.61-.255 2.819L16 8l-1.782 2.133.255 2.82-2.619.609L10.474 16 8 14.895zm1.71-5.295L11.344 6.4l-1.018-1.105-3.09 3.238-1.564-1.6L4.655 8z'
    ></path>
  </svg>
);

export default CheckIcon;
