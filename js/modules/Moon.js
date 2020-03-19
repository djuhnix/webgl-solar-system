class Moon {

    constructor(radius, segments, scene, controls) {
        this.scene = scene;
        this.controls = controls;
        this.moon = this.createMoon(radius, segments, Moon.moonTexture);
        this.moon.position.set(Moon.R,0,0);
        this.theta = 0;

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

        //Moon orbit
        this.theta += Moon.DTHETA;
        this.moon.position.x = Moon.R * Math.cos(this.theta);
        this.moon.position.z = Moon.R * Math.sin(this.theta);
    }

}
Moon.R = 35;
Moon.DTHETA = 2 * Math.PI / 1000;
Moon.moonTexture = "images/moon_texture.jpg";

export default Moon;