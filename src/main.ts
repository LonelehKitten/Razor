import Razor from "./engine/core/Razor";

//import TestGLSL from './resources/shader/test.glsl';

(() => {

    let engine = new Razor();

    window.onload = () => {
      engine.start();
    };
    
    window.onresize = () => {
      engine.resize();
    }

})();
