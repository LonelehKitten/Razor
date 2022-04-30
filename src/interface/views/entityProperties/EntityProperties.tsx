import React from 'react';
import Property from '@components/property/Property'

interface EntityPropertiesProps {
  
}

const EntityProperties: React.FC<EntityPropertiesProps> = () => {
  return (
    <div className="container-content entity-properties">
      <Property title="Translation"  />
      <Property title="Rotation"  />
      <Property title="Scale"  />
    </div>
  );
};

export default EntityProperties;