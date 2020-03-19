//import * as THREE from "./three.js";

import Moon from "./Moon.js";

class Earth {

    constructor(radius, segments, rotation, scene, controls) {
        // field //
        this.sphere = this.createSphere(radius, segments, Earth.earthTexture, Earth.bumpMap, Earth.waterTexture);
        this.sphere.rotation.y = rotation;

        this.clouds = this.createClouds(radius, segments, Earth.cloudTexture);
        this.clouds.rotation.y = rotation;

        this.stars = this.createStars(1000, segments + 15, Earth.starFieldTexture);

        this.scene = scene;
        this.controls = controls;
        this.moon = new Moon(3.5, 50, this.scene, this.controls);
    }

    createSphere(radius, segments, map, bumpMap, specularMap) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius, segments, segments),
            new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(map),
                bumpMap: new THREE.TextureLoader().load(bumpMap),
                bumpScale: 0.005,
                specularMap: new THREE.TextureLoader().load(specularMap),
                specular: new THREE.Color('grey'),
                shininess: 2
            })
        );
    }
    createClouds(radius, segments, cloudTexture) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius + 0.3, segments, segments),
            new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(cloudTexture),
                transparent: true,
                opacity: 0.2
            })
        );
    }

    createStars(radius, segments, starFieldTexture) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius, segments, segments),
            new THREE.MeshPhongMaterial({
                map:  new THREE.TextureLoader().load(starFieldTexture),
                side: THREE.DoubleSide,
                shininess: 0
            })
        );
    }

    initScene() {
        this.moon.initScene();
        for(let object of [this.sphere, this.clouds, this.stars])
        {
            this.scene.add(object);
        }
    }

    render() {
        this.controls.update();
        //Rotate the earth about the y-axis
        this.sphere.rotation.y += 0.0005;
        this.clouds.rotation.y -= 0.00025;
        this.moon.render();
    }
}

Earth.starFieldTexture = 'images/galaxy_starfield.png';
Earth.cloudTexture = 'images/clouds_2.jpg';
Earth.waterTexture = 'images/water_4k.png';
Earth.bumpMap = 'images/elev_bump_4k.jpg';
Earth.earthTexture = 'images/earth_texture.jpg';

export default Earth;