import Razor from "./engine/core/Razor";
import GameTest from './game/GameTest'

//import TestGLSL from './resources/shader/test.glsl';

(() => {

    let engine = new Razor(new GameTest());

    window.onload = () => {
      engine.start();
    };
    
    window.onresize = () => {
      engine.resize();
    }

})();
