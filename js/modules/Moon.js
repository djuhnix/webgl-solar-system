class Moon {

    constructor(radius, segments, parent, scene, controls) {
        this.parent = parent;
        this.scene = scene;
        this.controls = controls;
        this.moon = this.createMoon(radius, segments, Moon.MOON_TEXTURE, Moon.MOON_BUMP);
        this.moon.position.x = parent.position.x + Moon.R;
        this.theta = 0;
        this.spotLight = new THREE.SpotLight(new THREE.Color('green'));
        this.spotLight.position.x = Moon.R;
    }
    initScene() {
        this.parent.add(this.moon);
        this.moon.add(this.spotLight);
        this.scene.add(this.spotLight.target);
    }

    createMoon(radius, segments, map, bumpMap) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius, segments,segments),
            new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(map),
                bumpMap     : new THREE.TextureLoader().load(bumpMap),
                bumpScale   : 0.05,
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
Moon.MOON_TEXTURE = "images/moon_texture.jpg";
Moon.MOON_BUMP = "images/moonbump1k.jpg";

export default Moon;