import Razor from "./engine/core/Razor";
import FileLoader from "./engine/loaders/FileLoader"

//import TestGLSL from './resources/shader/test.glsl';

(() => {

    let engine = new Razor();

    window.onload = () => {
      engine.start();

      let div : HTMLDivElement = document.createElement("div") as HTMLDivElement;
      FileLoader.load('/resources/shader/test.glsl')
        .then((file) => div.innerText = file);
        //div.innerText = TestGLSL;
        document.body.appendChild(div);
    };
    
    window.onresize = () => {
      engine.resize();
    }

})();
