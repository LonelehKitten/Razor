import VBO from '../engine/buffer/VBO';
import GameCore from '../engine/core/GameCore'
import ResourceLoader from '../engine/core/ResourceLoader'
import Scene from '../engine/core/Scene';
import SimpleRenderer from './renderers/SimpleRenderer'
import SimpleEntity from './entities/SimpleEntity'

class GameTest extends GameCore {
    public constructor() {
        super()
    }

    public start() {

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
        let vertices = [
             0,  0, 0,
             0, 100, 0,
            100, 100, 0,
            100,  0, 0
        ];

        let colors = [
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0
        ]

        let indices = [0, 1, 2, 0, 2, 3]

        ResourceLoader.loadVAO([{
            name: 'obj1',
            objectData: [
                new VBO(new Float32Array(vertices), 3, true),
                new VBO(new Float32Array(colors), 4, true),
                new VBO(new Uint16Array(indices), 1, false),
            ]
        }])
        .forEachVAO((vao) => {
            vao.create();
        })

        const simpleRenderer = new SimpleRenderer();
        this.getRenderStrategy().add(simpleRenderer)

        this.getSceneManager()
            .add(new Scene('scene1'), true)
            .get('scene1')
            .add(new SimpleEntity(
                'entity1', 
                ResourceLoader.getVAO('obj1'), 
                ResourceLoader.getShader('shader1'),
                simpleRenderer
            ))

    }

    public update() {
        super.update();
    }

    public render() {
        super.render();
    }


}

export default GameTest