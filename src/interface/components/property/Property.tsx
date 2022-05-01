import Vec3 from '@engine/math/Vec3';
import UIInputSlider from '@ui/inputslider/UIInputSlider';
//import { BigFloat32 } from 'bigfloat';
import React, { useEffect, useState } from 'react';

interface PropertyProps {
  title: string
  defaultValue?: Vec3
  setProperty: (x: number, y: number, z: number) => void
}

const Property: React.FC<PropertyProps> = (props) => {
  const [x, setX] = useState<number>(props.defaultValue ? props.defaultValue.x*100 : 0);
  const [y, setY] = useState<number>(props.defaultValue ? props.defaultValue.y*100 : 0);
  const [z, setZ] = useState<number>(props.defaultValue ? props.defaultValue.z*100 : 0);

  useEffect(() => {
    props.setProperty(x/100, y/100, z/100)
  }, [x, y, z]);

  useEffect(() => {
    if(props.defaultValue) {
      setX(props.defaultValue.x*100)
      setY(props.defaultValue.y*100)
      setZ(props.defaultValue.z*100)
    }
  }, [props.defaultValue]);

  return (
    <div className="property">
        <h4> {props.title} </h4>
        <ul>
          <li>
            <span>x</span> 
            <UIInputSlider value={x} onActionPerformed={setX}  />
          </li>
          <li>
            <span>y</span> 
            <UIInputSlider value={y} onActionPerformed={setY}  />
          </li>
          <li>
            <span>z</span>
            <UIInputSlider value={z} onActionPerformed={setZ}  />
          </li>
        </ul>
      </div>
  );
};

export default Property;