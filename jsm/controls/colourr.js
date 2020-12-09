var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
camera.position.setScalar(50);
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
var canvas = renderer.domElement;
document.body.appendChild(canvas);

var controls = new THREE.OrbitControls(camera, canvas);

var cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var boxMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
var meshMaterial = new THREE.MeshStandardMaterial({ color: 0x0055ff, flatShading: true,});

var geometry1 = new THREE.CylinderBufferGeometry(5, 5, 20, 32);
var cylinder = new THREE.Mesh(geometry1, cylinderMaterial);
cylinder.position.x = -20;
scene.add(cylinder);

var geometry2 = new THREE.SphereBufferGeometry(7, 32, 32);
var sphere = new THREE.Mesh(geometry2, sphereMaterial);
scene.add(sphere);

var geometry3 = new THREE.BoxBufferGeometry(10, 10, 10);
var cube = new THREE.Mesh(geometry3, boxMaterial);
cube.position.x = 20;
scene.add(cube);

var loader = new THREE.PLYLoader();
loader.load('https://threejs.org/examples/models/ply/binary/Lucy100k.ply', function(geometry) {
  //geometry.computeVertexNormals();
  
  var mesh = new THREE.Mesh(geometry, meshMaterial);
  mesh.scale.multiplyScalar( 0.04 );
  mesh.position.x = 40;
  scene.add(mesh);
});


      var light1 = new THREE.SpotLight();
			light1.position.set(150, 150, 50);
			//light1.castShadow = true;
			scene.add(light1);
			
			var light2 = new THREE.SpotLight();
			
			light2.position.set(-50, -130, -100);
			//light2.castShadow = true;		
			scene.add(light2);
var guiControls = new function() {
  this.color = cylinderMaterial.color.getStyle();
  this.wireframe = cylinderMaterial.wireframe;
};

var gui = new dat.GUI();


 gui.add(guiControls, "wireframe")
				
				.onChange(function (e) {
					cylinder.material.wireframe = e;
					sphere.material.wireframe = e;
          cube.material.wireframe = e;
					//mesh.material.wireframe = e;
				});



render();

function resize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render() {
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}