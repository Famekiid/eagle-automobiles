import React from 'react';

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Extends standard input slider properties
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (props, ref) => (
    <input
      type="range"
      ref={ref}
      {...props}
    />
  )
);

Slider.displayName = 'Slider';
