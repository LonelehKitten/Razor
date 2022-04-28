import React, { forwardRef, useEffect, useRef } from 'react';

interface ViewportProps {
  
}

const Viewport: React.ForwardRefRenderFunction<HTMLCanvasElement, ViewportProps> = (props, ref) => {
  return (
    <canvas ref={ref as React.MutableRefObject<HTMLCanvasElement>} className='container-content'>
    </canvas>
  );
};

export default forwardRef(Viewport);