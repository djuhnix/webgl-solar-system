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

        this.renderer = new THREE.WebGLRenderer ({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        //renderer.setSize(width, height);
        this.earth = new Earth(0.5, 32, 6, this.scene);
        this.initScene();

        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
        this.camera.position.z = 1.5;
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