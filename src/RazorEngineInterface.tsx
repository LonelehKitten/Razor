// import UIButton from "@ui/buttons/UIButton";
import ResourceManager from "@views/resourceManager/ResourceManager";
import SceneManager from "@views/sceneManager/SceneManager";
import Viewport from "@views/viewport/Viewport";
import React from "react";

function RazorEngineInterface() {
  return (
    <div className="main">
      <div className="container viewport">
        <Viewport  />
      </div>
      <div className="container side-container">
        <SceneManager  />
      </div>
      <div className="container bottom-container">
        <ResourceManager  />
      </div>
      <div className="container side-menu">
        c
      </div>
      <div className="container footer">
        0
      </div>
    </div>
  );
}

/* 
<UIButton 
        template="primary"
        onActionPerformed={() => {console.log('hi!');}}
      >
        Click here
      </UIButton>

*/

export default RazorEngineInterface;
