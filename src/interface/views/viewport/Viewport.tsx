import React, { useEffect, useRef } from 'react';
import { useDispatch } from '@store/Root.store';
import { RazorActions } from '@store/Razor.store';
import RazorInterfaceCore from '@interface-core/RazorInterfaceCore';

interface ViewportProps {
  
}

const Viewport: React.FC<ViewportProps> = () => {

  const dispatch = useDispatch();

  const ref = useRef<HTMLCanvasElement>();

  useEffect(() => {
    dispatch(RazorActions.init({
      gameCore: new RazorInterfaceCore(),
      canvas: ref.current
    }))
    dispatch(RazorActions.start())
  }, []);

  return (
    <canvas ref={ref} className='container-content'>
    </canvas>
  );
};

export default Viewport;