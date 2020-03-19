//import * as THREE from "./three.js";

class Earth {

    constructor(radius, segments, rotation, scene, controls) {
        // field //
        this.radius = radius;
        this.segments = segments;
        this.rotation = rotation;
        this.scene = scene;
        this.controls = controls;
    }

    createSphere(radius, segments, noCloudTexture, bumpMap, waterTexture) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius, segments, segments),
            new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(noCloudTexture),
                bumpMap: new THREE.TextureLoader().load(bumpMap),
                bumpScale: 0.005,
                specularMap: new THREE.TextureLoader().load(waterTexture),
                specular: new THREE.Color('grey')
            })
        );
    }
    createClouds(radius, segments, cloudTexture) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius + 0.003, segments, segments),
            new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(cloudTexture),
                transparent: true
            })
        );
    }

    createStars(radius, segments, starFieldTexture) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius, segments, segments),
            new THREE.MeshBasicMaterial({
                map:  new THREE.TextureLoader().load(starFieldTexture),
                side: THREE.BackSide
            })
        );
    }

    initScene() {
        this.sphere = this.createSphere(this.radius, this.segments, Earth.noCloudTexture, Earth.bumpMap, Earth.waterTexture);
        this.sphere.rotation.y = this.rotation;

        this.clouds = this.createClouds(this.radius, this.segments, Earth.cloudTexture);
        this.clouds.rotation.y = this.rotation;

        this.stars = this.createStars(90, 64, Earth.starFieldTexture);

        for(let object of [this.sphere, this.clouds, this.stars])
        {
            this.scene.add(object);
        }
    }

    render() {
        this.controls.update();
        this.sphere.rotation.y += 0.005;
        this.clouds.rotation.y += 0.005;
    }
}

Earth.starFieldTexture = 'images/galaxy_starfield.png';
Earth.cloudTexture = 'images/fair_clouds_4k.png';
Earth.waterTexture = 'images/water_4k.png';
Earth.bumpMap = 'images/elev_bump_4k.jpg';
Earth.noCloudTexture = 'images/2_no_clouds_4k.jpg';

export default Earth;