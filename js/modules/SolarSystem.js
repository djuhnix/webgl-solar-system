import Earth from "./Earth.js";
//import * as THREE from "./three.js";

class SolarSystem {
    constructor() {

        this.scene = new THREE.Scene ();

        this.ALight = new THREE.AmbientLight(0xf1f1f1);

        this.DLight = new THREE.DirectionalLight(0xffffff, 1);
        this.DLight.position.set(50, 50, 5);

        let width  = window.innerWidth,
            height = window.innerHeight;

        this.dx = .01;
        this.dy = -.01;
        this.dz = -.05;
        this.vec = new THREE.Vector3(0,0,0);



        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( width, height );
        let webglDomEl = this.renderer.domElement;
        document.body.appendChild( webglDomEl );

        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.set(0, 35, 70);

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
        this.scene.add(this.ALight);
        this.scene.add(this.DLight);
        this.earth.initScene();

    }

    createObject() {
        this.earth = new Earth(10, 50, 6, this.scene, this.controls);
    }

    render() {
        /*
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
        this.earth.render();

    }
}

export default SolarSystem;