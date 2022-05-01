import React, { useEffect, useRef, useState } from 'react';
import {BigFloat32} from 'bigfloat'

import { 
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa'
import { StateSetter } from '@custom-types/react-hooks';

interface UIInputSliderProps {
  value: BigFloat32
  onActionPerformed: StateSetter<BigFloat32>
}

const UIInputSlider: React.FC<UIInputSliderProps> = (props) => {
  const [writeMode, setWriteMode] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>();
  const displayRef = useRef<HTMLDivElement>();
  const clicked = useRef<boolean>(false);

  useEffect(() => {
    inputRef.current.valueAsNumber = Number(formatValue(props.value))
    displayRef.current.innerText = formatValue(props.value)
  }, [props.value]);

  function enterInput() {
    setWriteMode(true)
    inputRef.current.focus()
  }

  function exitInput() {
    props.onActionPerformed(new BigFloat32(inputRef.current.valueAsNumber+0.01))
    setWriteMode(false)
  }

  function changeValue(e: React.MouseEvent) {
    const div = displayRef.current
    if(clicked.current && e.button === 0 && (
      e.clientX > div.offsetLeft &&
      e.clientX < div.offsetLeft+div.offsetWidth &&
      e.clientY > div.offsetTop &&
      e.clientY < div.offsetTop+div.offsetHeight
    )) {
      props.onActionPerformed(oldValue => oldValue.add(new BigFloat32('0.1').mul(e.movementX > 0 ? 1 : -1)))
    }
  }

  function formatValue(value: BigFloat32): string {
    const v = value.toString()
    if(v.includes('.')) {
      return v.substring(0, v.indexOf('.')+3)
    }
    return v
  }

  function decrease() {
    props.onActionPerformed(oldValue => oldValue.add(new BigFloat32('-1')))
  }

  function increase() {
    props.onActionPerformed(oldValue => oldValue.add(new BigFloat32('1')))
  }

  function handleKeyUp(e: React.KeyboardEvent) {
    if(e.key === 'Enter') {
      exitInput()
    }
  }

  return (
    <div 
      className='input-slider' 
      style={{
        width: '10rem'
      }}
    >
      <button type="button" onClick={decrease}>
        <FaChevronLeft  />
      </button>
      <div>
        <input 
          ref={inputRef} 
          type="number" 
          onBlur={exitInput}
          onKeyUp={handleKeyUp}
          style={{
            zIndex: writeMode ? '1' : '0'
          }}
        />
        <div 
          ref={displayRef} 
          onMouseMove={changeValue}
          onDoubleClick={enterInput}
          onMouseDown={() => {clicked.current = true}}
          onMouseUp={() => {clicked.current = false}}
          style={{
            zIndex: writeMode ? '0' : '1'
          }}
        >
        </div>
      </div>
      <button type="button" onClick={increase}>
        <FaChevronRight  />
      </button>
    </div>
  );
};

export default UIInputSlider;