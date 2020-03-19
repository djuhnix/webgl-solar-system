class Moon {
    constructor(radius, segments, scene, controls) {
        this.scene = scene;
        this.controls = controls;
        this.moon = this.createMoon(radius, segments, Moon.moonTexture);
        this.moon.position.set(35,0,0);
    }
    initScene() {
        this.scene.add(this.moon);
    }

    createMoon(radius, segments, map){
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius, segments,segments),
            new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(map),
            })
        );
    }

    render() {
        this.controls.update();
        let theta = 0, r = 35;
        const dTheta = 2 * Math.PI / 1000;

        //Moon orbit
        theta += dTheta;
        this.moon.position.x = r * Math.cos(theta);
        this.moon.position.z = r * Math.sin(theta);
    }

}

Moon.moonTexture = "images/moon_texture.jpg";

export default Moon;