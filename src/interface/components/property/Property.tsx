import UIInputSlider from '@ui/inputslider/UIInputSlider';
import React from 'react';

interface PropertyProps {
  title: string
}

const Property: React.FC<PropertyProps> = (props) => {
  return (
    <div className="property">
        <h4> {props.title} </h4>
        <ul>
          <li>
            <span>x</span> 
            <UIInputSlider  />
          </li>
          <li>
            <span>y</span> 
            <UIInputSlider  />
          </li>
          <li>
            <span>z</span>
            <UIInputSlider  />
          </li>
        </ul>
      </div>
  );
};

export default Property;