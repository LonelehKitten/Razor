import VBO from '../engine/buffer/VBO';
import GameCore from '../engine/core/GameCore'
import ResourceLoader from '../engine/core/ResourceLoader'
import Scene from '../engine/core/Scene';
import SimpleRenderer from './renderers/SimpleRenderer'
import SimpleEntity from './entities/SimpleEntity'
import Vec3 from '../engine/math/Vec3';

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
        // b = bottom, t = top, l = left, r = right, f = far, n = near
        let vertices = [
            -0.5, -0.5, -0.5,   // b l n
            0.5, -0.5, -0.5,    // b r n
            -0.5, -0.5, 0.5,    // b l f
            0.5, -0.5, 0.5,     // b r f

            -0.5, 0.5, -0.5,    // t l n
            0.5, 0.5, -0.5,     // t r n
            -0.5, 0.5, 0.5,     // t l f
            0.5, 0.5, 0.5       // t r f
        ];

        let colors = [
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            1.0, 0.5, 0.5, 1.0,
            0.5, 1.0, 0.5, 1.0,
            0.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 0.0, 1.0,
        ]

        let indices = [0, 1, 3, 0, 3, 2, 0, 1, 5, 0, 5, 4, 1, 7, 5, 1, 3, 7, 0, 2, 6, 0, 6, 4, 4, 5, 7, 4, 7, 6, 2, 3, 7, 2, 7, 6]

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
            .get('entity1')
            .getTransform()
            .setTranslation(new Vec3(0, 0, 3))

    }

    public update() {
        super.update();
    }

    public render() {
        super.render();
    }


}

export default GameTest