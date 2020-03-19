class Sun {

    constructor(radius, segments, scene, controls) {
        Sun.RADIUS = radius;
        this.scene = scene;
        this.controls = controls;

        this.sun = this.createSun(radius, segments, Sun.SUN_TEXTURE);
        this.sun.position.set(0, 0, 0);

        this.sunLight = new THREE.PointLight(0xffffff);
        this.sunLight.position.set(0,0,0);
    }

    createSun(radius, segments, map) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius, segments, segments),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(map)
            })
        );
    }

    initScene() {
        this.scene.add(this.sun);
    }

    render() {
        this.controls.update()
    }
}
Sun.SUN_TEXTURE = 'images/sun_texture.jpg';
export default Sun;