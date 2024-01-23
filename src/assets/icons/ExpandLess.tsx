import React from 'react';

function ExpandLess({ className }: { className?: string }) {
  return (
    <svg
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 24 24'
      height='1em'
      width='1em'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path fill='none' d='M0 0h24v24H0V0z'></path>
      <path d='m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z'></path>
    </svg>
  );
}

export default ExpandLess;
