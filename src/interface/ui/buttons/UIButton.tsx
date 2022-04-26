
import React from 'react';

interface UIButtonProps {
  template: string
  children: string
  onActionPerformed: () => void
}

const UIButton: React.FC<UIButtonProps> = (props) => {
  return (
    <button 
      type="button" 
      onClick={props.onActionPerformed}
      className={`button-${props.template}`}
    >
      {props.children}
    </button>
  );
};

export default UIButton;