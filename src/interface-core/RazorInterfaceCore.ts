import Camera from '@engine/core/Camera';
import VBO from "@engine/buffer/VBO";
import GameCore from "@engine/core/GameCore";
import Razor from "@engine/core/Razor";
import ResourceLoader from "@engine/core/ResourceLoader";
import Scene from "@engine/core/Scene";
import Vec3 from "@engine/math/Vec3";
import Transform from '@engine/math/Transform';
import CanvasCamera from "./CanvasCamera";
import SimpleEntity from "./entities/SimpleEntity";
import EditorRenderer from "./renderers/EditorRenderer";
import SimpleRenderer from "./renderers/SimpleRenderer";
import CameraManager from './CameraManager';


class RazorInterfaceCore extends GameCore {

  private _editorRenderer: EditorRenderer

  private _cameraManager: CameraManager

  private _sceneObserver: (keys: string[]) => void;
  private _cameraManagerObserver: (keys: string[]) => void
  private _cameraObserver: (transform: Transform) => void
  private _selectedEntity: string
  private _selectedCamera: string

  public constructor(
    sceneObserver: (keys: string[]) => void,
    cameraObserver: (transform: Transform) => void,
    cameraManagerObserver: (keys: string[]) => void
  ) {
    super()
    this._sceneObserver = sceneObserver
    this._cameraManagerObserver = cameraManagerObserver
    this._cameraObserver = cameraObserver
    this._selectedEntity = null
    this._cameraManager = new CameraManager(this.getRenderStrategy())
  }
  
  public start(): void {

    this.createNewCamera()
    this.setSelectedCamera('camera0')
    this.getCameraManager().setActive('camera0');

    // ========= SHADER ==========

    ResourceLoader.loadShader([
      {
        name: 'shader1',
        vertexShaderPathname: '/resources/shader/vert.glsl', 
        fragmentShaderPathname: '/resources/shader/frag.glsl'
      },
      {
        name: 'editor-shader',
        vertexShaderPathname: '/resources/shader/editor.vert.glsl', 
        fragmentShaderPathname: '/resources/shader/editor.frag.glsl'
      }
    ])
    .forEachShader((shader) => {
      shader.create();
    })

        

    // ========= OBJECT DATA ==========
    // b = bottom, t = top, l = left, r = right, f = far, n = near
    const vertices = [
      -0.5, -0.5, -0.5,   // b l n
      0.5, -0.5, -0.5,    // b r n
      -0.5, -0.5, 0.5,    // b l f
      0.5, -0.5, 0.5,     // b r f

      -0.5, 0.5, -0.5,    // t l n
      0.5, 0.5, -0.5,     // t r n
      -0.5, 0.5, 0.5,     // t l f
      0.5, 0.5, 0.5       // t r f
    ];

    const colors = [
      1.0, 0.0, 0.0, 1.0, // 0 red
      0.0, 1.0, 0.0, 1.0, // 1 green
      0.0, 0.0, 1.0, 1.0, // 2 blue
      1.0, 0.5, 0.5, 1.0, // 3 pink
      0.5, 1.0, 0.5, 1.0, // 4 
      0.0, 1.0, 1.0, 1.0, // 5
      1.0, 1.0, 0.0, 1.0, // 6
      0.0, 0.0, 0.0, 1.0, // 7
    ]

    const indices = [0, 1, 3, 0, 3, 2, 0, 4, 1, 1, 4, 5, 5, 7, 3, 5, 3, 1, 0, 2, 6, 0, 6, 4, 7, 5, 4, 6, 7, 4, 2, 3, 7, 2, 7, 6]

    ResourceLoader.loadVAO([
      {
        name: 'obj1',
        objectData: [
          new VBO(new Float32Array(vertices), 3, true),
          new VBO(new Float32Array(colors), 4, true),
          new VBO(new Uint16Array(indices), 1, false),
        ]
      },
      {
        name: 'spider',
        objectData: '/resources/objects/spider/spider.obj'
      }
    ])
    .forEachVAO((vao) => {
      vao.create();
    })

    const simpleRenderer = new SimpleRenderer(this._cameraManager);
    this.getRenderStrategy().add(simpleRenderer)

    this.getSceneManager().add(new Scene('scene1'), true)

    this._editorRenderer = new EditorRenderer(this._cameraManager, this.getSceneManager())

  }

  public update(time: number, delta: number): void {
    super.update(time, delta);

    this._cameraManager.getActive().update(delta)
  }

  public render(): void {
    this._editorRenderer.render();
    super.render();
  }

  public createNewEntity(vaoName: string): void {

    const scene = this.getSceneManager().getActive()
    let name = 'entity'
    for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
      if(!scene.has(name+i)) {
        name += i
        break;
      }
    }

    scene
      .add(new SimpleEntity(
        name,
        ResourceLoader.getVAO(vaoName), 
        ResourceLoader.getShader('shader1'),
        this.getRenderStrategy().get('renderer1')
      ))
      .get(name)
      .getTransform()
      .setTranslation(new Vec3(0, 0, 0))
    scene.get(name).getTransform().setRotation(new Vec3(0, 0, 0))
    scene.get(name).getTransform().setScale(new Vec3(1, 1, 1))

    if(this._sceneObserver) {
      this._sceneObserver(scene.getKeys())
    }
  }

  public removeEntity(name: string): void {
    const scene = this.getSceneManager().getActive()
    if(scene.has(name)) {
      scene.remove(name);
    }
    if(this._sceneObserver) {
      this._sceneObserver(scene.getKeys())
    }
  }

  public selectEntity(mouseX: number, mouseY: number): string {

    mouseX -= Razor.CANVAS.offsetLeft
    mouseY -= Razor.CANVAS.offsetTop

    const data = this._editorRenderer.getTexture().getData()

    console.log(Razor.CANVAS.offsetTop+Razor.CANVAS.height, mouseY, 
      (data.length - mouseY * Razor.CANVAS.width * 4 - 1) / (Razor.CANVAS.width*4), 
      (mouseY * Razor.CANVAS.width * 4) / (Razor.CANVAS.width*4));
    

    const color = [
      data.at((data.length - mouseY * Razor.CANVAS.width * 4 - 1) - (Razor.CANVAS.width - mouseX) * 4 - 3),
      data.at((data.length - mouseY * Razor.CANVAS.width * 4 - 1) - (Razor.CANVAS.width - mouseX) * 4 - 2),
      data.at((data.length - mouseY * Razor.CANVAS.width * 4 - 1) - (Razor.CANVAS.width - mouseX) * 4 - 1),
      data.at((data.length - mouseY * Razor.CANVAS.width * 4 - 1) - (Razor.CANVAS.width - mouseX) * 4),
    ]

    if(color[3] > 0) {

      const id = color[0] * 256**2 + color[1] * 256 + color[2]
  
      const entities = this.getSceneManager().getActive()
        .filterVisible((entity) => (entity as SimpleEntity).getId() === id)

      if(entities.length > 0) {
        this.setSelectedEntity(entities[0].getName())
        return this._selectedEntity
      }
      
    }
    
    return null
  }

  public setSelectedEntity(entity: string) {
    if(this._selectedEntity) {
      (this.getSceneManager().getActive().get(this._selectedEntity) as SimpleEntity)
        .setSelected(false);
    }
    if(entity) {
      (this.getSceneManager().getActive().get(entity) as SimpleEntity)
      .setSelected(true)
    }
    this._selectedEntity = entity
  }

  public getCameraManager(): CameraManager {
    return this._cameraManager
  }

  public createNewCamera(): void {

    let name = 'camera'
    for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
      if(!this.getCameraManager().has(name+i)) {
        name += i
        break;
      }
    }

    this.getCameraManager()
      .add(new CanvasCamera(name, this._cameraObserver))
      .get(name)
      .getTransform()
      .setTranslation(new Vec3(0, 0, 0))
    this.getCameraManager().get(name).getTransform().setRotation(new Vec3(0, 0, 0))
    this.getCameraManager().get(name).getTransform().setScale(new Vec3(1, 1, 1))

    if(this._sceneObserver) {
      this._cameraManagerObserver(this.getCameraManager().getKeys())
    }
  }

  public setSelectedCamera(camera: string) {
    if(this._selectedCamera) {
      (this.getCameraManager().get(this._selectedCamera) as CanvasCamera)
        .setSelected(false);
    }
    if(camera) {
      (this.getCameraManager().get(camera) as CanvasCamera)
      .setSelected(true)
    }
    this._selectedCamera = camera
  }

}


export default RazorInterfaceCore
