(()=>{"use strict";var e=null;class t{static getInstance(){return null!==t.instance&&void 0!==t.instance||(t.instance=new t),t.instance}loop=()=>{this.run(),requestAnimationFrame(this.loop)};run(){e.clear(e.COLOR_BUFFER_BIT)}}const n=t;(()=>{let t=new class{constructor(){this._gameLoop=n.getInstance()}start(){this._canvas=class{static init(){let t=document.createElement("canvas");if(document.body.appendChild(t),void 0===(e=t.getContext("webgl")))throw new Error("Unable to initialize WebGL!");return t}}.init(),this.resize(),e.clearColor(0,0,0,1),this._gameLoop.loop()}resize(){if(void 0===this._canvas)throw new Error("Canvas was not initialized!");this._canvas.width=window.innerWidth,this._canvas.height=window.innerHeight}};window.onload=()=>{t.start();let e=document.createElement("div");(class{static async load(e){let t;return await fetch(e).then((e=>e.body)).then((async e=>{t=e.getReader()})),await t.read().then((e=>(new TextDecoder).decode(e.value)))}}).load("/resources/shader/test.glsl").then((t=>e.innerText=t)),document.body.appendChild(e)},window.onresize=()=>{t.resize()}})()})();
//# sourceMappingURL=index.js.map