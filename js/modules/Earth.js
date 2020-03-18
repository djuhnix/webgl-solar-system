class Earth {

    constructor(radius, segments, rotation, scene) {
        // constant //
        this.starFieldTexture = 'images/galaxy_starfield.png';
        this.cloudTexture = 'images/fair_clouds_4k.png';
        this.waterTexture = 'images/water_4k.png';
        this.bumpMap = 'images/elev_bump_4k.jpg';
        this.noCloudTexture = 'images/2_no_clouds_4k.jpg';

        // field //
        this.radius = radius;
        this.segments = segments;
        this.rotation = rotation;
        this.scene = scene;
        //this.controls = controls;

        this.initScene();
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
        this.sphere = this.createSphere(this.radius, this.segments, this.noCloudTexture, this.bumpMap, this.waterTexture);
        this.sphere.rotation.y = this.rotation;

        this.clouds = this.createClouds(this.radius, this.segments, this.cloudTexture);
        this.clouds.rotation.y = this.rotation;

        this.stars = this.createStars(90, 64, this.starFieldTexture);

        this.scene.add(this.sphere);
        this.scene.add(this.clouds);
        this.scene.add(this.stars);
        /*for(let object of [this.sphere, this.clouds, this.stars])
        {
            this.scene.add(object);
        }*/
    }

    render() {
        //this.controls.update();
        this.sphere.rotation.y += 0.0005;
        this.clouds.rotation.y += 0.0005;
    }
}

export default Earth;