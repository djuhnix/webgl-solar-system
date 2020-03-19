import Earth from "./Earth.js";
//import * as THREE from "./three.js";

class SolarSystem {
    constructor() {

        this.scene = new THREE.Scene ();

        this.ALight = new THREE.AmbientLight(0x333333);

        this.DLight = new THREE.DirectionalLight(0xffffff, 1);
        this.DLight.position.set(5,3,5);

        let width  = window.innerWidth,
            height = window.innerHeight;



        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( width, height );
        let webglDomEl = this.renderer.domElement;
        document.body.appendChild( webglDomEl );

        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.z = 30;
        this.controls = new THREE.OrbitControls( this.camera, webglDomEl );
        this.earth = new Earth(3, 32, 6, this.scene, this.controls);

        this.initScene();
        this.animate();
    }

    animate ()
    {
        this.earth.render();

        this.renderer.render (this.scene, this.camera);
        requestAnimationFrame (() => this.animate ());
    }

    initScene() {
        this.scene.add(this.ALight);
        this.scene.add(this.DLight);
        this.earth.initScene();
    }
}

export default SolarSystem;