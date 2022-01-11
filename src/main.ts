import Razor from "./engine/core/Razor";
import FileUtils from "./engine/utils/FileUtils"

//import TestGLSL from './resources/shader/test.glsl';

(() => {

    let engine = new Razor();

    window.onload = () => {
      engine.start();

      let div : HTMLDivElement = document.createElement("div") as HTMLDivElement;
      FileUtils.load('/resources/shader/test.glsl')
        .then((file) => div.innerText = file);
        //div.innerText = TestGLSL;
        document.body.appendChild(div);
    };
    
    window.onresize = () => {
      engine.resize();
    }

})();
