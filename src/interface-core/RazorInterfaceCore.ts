import VBO from "@engine/buffer/VBO";
import GameCore from "@engine/core/GameCore";
import ResourceLoader from "@engine/core/ResourceLoader";
import Scene from "@engine/core/Scene";
import Vec3 from "@engine/math/Vec3";
import CanvasCamera from "./CanvasCamera";
import SimpleEntity from "./entities/SimpleEntity";
import SimpleRenderer from "./renderers/SimpleRenderer";


class RazorInterfaceCore extends GameCore {

  private _camera: CanvasCamera

  public constructor() {
    super()
  }
  
  public start(): void {

    this._camera = new CanvasCamera();

    // ========= SHADER ==========

    ResourceLoader.loadShader([{
      name: 'shader1',
      vertexShaderPathname: '/resources/shader/vert.glsl', 
      fragmentShaderPathname: '/resources/shader/frag.glsl'
    }])
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

    const simpleRenderer = new SimpleRenderer(this._camera);
    this.getRenderStrategy().add(simpleRenderer)

    this.getSceneManager()
      .add(new Scene('scene1'), true)
      .get('scene1')
      .add(new SimpleEntity(
        'entity1', 
        ResourceLoader.getVAO('spider'), 
        ResourceLoader.getShader('shader1'),
        simpleRenderer
      ))
      .get('entity1')
      .getTransform()
      .setTranslation(new Vec3(0, 0, 3))


  }

  public update(time: number, delta: number): void {
    super.update(time, delta);

    this._camera.update(delta)
  }

  public render(): void {
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
      .setTranslation(new Vec3(0, 0, 3))
  }


}

export default RazorInterfaceCore