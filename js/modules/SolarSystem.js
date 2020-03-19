import Earth from "./Earth.js";
import Sun from "./Sun.js";
//import * as THREE from "./three.js";

class SolarSystem {
    constructor() {

        this.scene = new THREE.Scene ();

        let width  = window.innerWidth,
            height = window.innerHeight;


        this.vec = new THREE.Vector3(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( width, height );
        let webglDomEl = this.renderer.domElement;
        document.body.appendChild( webglDomEl );

        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);
        this.camera.position.set(0, 35, 70);
        this.camera.rotation.y = - Math.PI * 0.5;

        this.controls = new THREE.OrbitControls( this.camera, webglDomEl );
        this.createObject();

        this.initScene();
        this.animate();
    }

    animate ()
    {
        this.render();

        this.renderer.render (this.scene, this.camera);
        requestAnimationFrame (() => this.animate ());
    }

    initScene() {
        //Add ambient light to the scene
        this.scene.add( new THREE.AmbientLight(0xf1f1f1, 0.7));
        for (let object in this.systemObjects) {
            this.systemObjects[object].initScene();
        }

    }

    createObject() {
        this.systemObjects = {
            sun: new Sun(30, 50, this.scene, this.controls),
            earth: new Earth(10, 50, 6, this.scene, this.controls)
        };
    }

    render() {
        /*
        this.dx = .01;
        this.dy = -.01;
        this.dz = -.05;
        //Flyby
        if (this.camera.position.z < 0) {
            this.dx *= -1;
        }
        this.camera.position.x += this.dx;
        this.camera.position.y += this.dy;
        this.camera.position.z += this.dz;

        this.camera.lookAt(this.vec);

        //Flyby reset
        if (this.camera.position.z < -100) {
            this.camera.position.set(0,35,70);
        }

        this.camera.lookAt(this.vec);
        */
        for (let object in this.systemObjects) {
            this.systemObjects[object].render();
        }
    }
}

export default SolarSystem;