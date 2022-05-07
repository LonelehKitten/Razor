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

    ResourceLoader.loadVAO([
      {
        name: 'spider',
        objectData: '/resources/objects/spider/spider.obj'
      },
      {
        name: 'cube',
        objectData: '/resources/objects/cube/cube.obj'
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

  public createNewCamera(): string {

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

    return name
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

  public lockCamera(entityName: string) {
    if(this._selectedCamera) {
      let entity = null;
      if(this.getSceneManager().getActive().has(entityName)) {
        entity = this.getSceneManager().getActive().get(entityName)
      }
      (this.getCameraManager().get(this._selectedCamera) as CanvasCamera)
        .lock(entity)
    }
  }

}


export default RazorInterfaceCore
