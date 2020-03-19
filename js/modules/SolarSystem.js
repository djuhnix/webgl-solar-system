import Earth from "./Earth.js";

class SolarSystem {
    constructor(canvas) {
        //const webglEl = document.getElementById('webgl');
        this.canvas = document.getElementById (canvas);
        this.scene = new THREE.Scene ();

        this.ALight = new THREE.AmbientLight(0x333333);

        this.DLight = new THREE.DirectionalLight(0xffffff, 1);
        this.DLight.position.set(5,3,5);

        let width  = canvas.innerWidth,
            height = canvas.innerHeight;

        //this.controls = new THREE.TrackballControls(this.camera);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        this.earth = new Earth(0.5, 32, 6, this.scene);
        this.initScene();

        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.z = 30;
        //webglEl.appendChild(renderer.domElement);
        this.animate();
    }

    animate ()
    {
        requestAnimationFrame (() => this.animate ());

        this.earth.render();
        this.renderer.render (this.scene, this.camera);
    }

    initScene() {
        this.scene.add(this.ALight);
        this.scene.add(this.DLight);
        //this.earth.initScene();
    }
}

export default SolarSystem;