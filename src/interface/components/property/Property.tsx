import Vec3 from '@engine/math/Vec3';
import UIInputSlider from '@ui/inputslider/UIInputSlider';
import { BigFloat32 } from 'bigfloat';
import React, { useEffect, useState } from 'react';

interface PropertyProps {
  title: string
  defaultValue?: Vec3
  setProperty: (x: BigFloat32, y: BigFloat32, z: BigFloat32) => void
}

const Property: React.FC<PropertyProps> = (props) => {
  const [x, setX] = useState<BigFloat32>(new BigFloat32(props.defaultValue?.x ?? 0));
  const [y, setY] = useState<BigFloat32>(new BigFloat32(props.defaultValue?.y ?? 0));
  const [z, setZ] = useState<BigFloat32>(new BigFloat32(props.defaultValue?.z ?? 0));

  useEffect(() => {
    props.setProperty(x, y, z)
  }, [x, y, z]);

  useEffect(() => {
    if(props.defaultValue) {
      setX(new BigFloat32(props.defaultValue.x))
      setY(new BigFloat32(props.defaultValue.y))
      setZ(new BigFloat32(props.defaultValue.z))
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