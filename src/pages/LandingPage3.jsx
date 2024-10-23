import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import '../landingPage.css';
import beeModel from "../assets/model/modelinput_final.glb"; // 3D model
import obj1 from "../assets/mining/1.png";
import obj2 from "../assets/mining/2.png";
import obj3 from "../assets/mining/3.png";
import obj4 from "../assets/mining/4.png";
import obj5 from "../assets/mining/5.png";
import obj6 from "../assets/mining/6.png";

import TrustWalletConnect from "../components/TrustWalletConnect"; // Connect Wallet component

const LandingPage3 = () => {
  const beeRef = useRef(); // Ref for the bee model
  const cameraRef = useRef(); // Ref for the camera
  const rendererRef = useRef(); // Ref for the renderer
  const mixerRef = useRef(); // Ref for the animation mixer
  const gltfRef = useRef();

  // Positions and rotations for different sections
  const arrPositionModel = [
    {
      id: "banner",
      position: { x: 0, y: -1, z: 0 },
      rotation: { x: 0, y: 3, z: 0 },
    },
    // Add more positions for other sections if needed
  ];

  // Function to handle rotation of the model to face the object
  const handleFaceToObject = (objClassName) => {
    const objectElement = document.querySelector(`.${objClassName}`);
    if (!objectElement || !beeRef.current || !cameraRef.current) return;
    objectElement.style.zIndex = '0';
    if (objClassName === "obj-1") {
      // Animate the model's position and rotation
      gsap.to(beeRef.current.position, {
        x: -20,
        y: -10,
        z: 0,
        duration: 2,
        ease: "power1.out",
      });

      // Animate the model to rotate towards the target
      gsap.to(beeRef.current.rotation, {
        x: 0,
        y: 0.2,
        z: 0.5,
        duration: 2, // Smooth transition duration
        ease: "power1.out", // Easing for smooth animation
        onComplete: () => {
          playAnimation();
        },
      });
    } else if (objClassName === "obj-2") {
      // Animate the model's position and rotation
      gsap.to(beeRef.current.position, {
        x: -21,
        y: 4,
        z: 0,
        duration: 2,
        ease: "power1.out",
      });

      // Animate the model to rotate towards the target
      gsap.to(beeRef.current.rotation, {
        x: 0,
        y: 0.2,
        z: 0,
        duration: 2, // Smooth transition duration
        ease: "power1.out", // Easing for smooth animation
        onComplete: () => {
          playAnimation();
        },
      });
    } else if (objClassName === "obj-3") {
      // Animate the model's position and rotation
      gsap.to(beeRef.current.position, {
        x: -2,
        y: -1,
        z: 0,
        duration: 2,
        ease: "power1.out",
      });

      // Animate the model to rotate towards the target
      gsap.to(beeRef.current.rotation, {
        x: 0,
        y: 0.2,
        z: 0.5,
        duration: 2, // Smooth transition duration
        ease: "power1.out", // Easing for smooth animation
        onComplete: () => {
          playAnimation();
        },
      });
    } else if (objClassName === "obj-4") {
      // Animate the model's position and rotation
      gsap.to(beeRef.current.position, {
        x: 0,
        y: -10,
        z: 0,
        duration: 2,
        ease: "power1.out",
      });

      // Animate the model to rotate towards the target
      gsap.to(beeRef.current.rotation, {
        x: 0,
        y: 3,
        z: 0.5,
        duration: 2, // Smooth transition duration
        ease: "power1.out", // Easing for smooth animation
        onComplete: () => {
          playAnimation();
          objectElement.style.zIndex = '99999999';
        },
      });
    } else if (objClassName === "obj-5") {
      // Animate the model's position and rotation
      gsap.to(beeRef.current.position, {
        x: 24,
        y: -10,
        z: 0,
        duration: 2,
        ease: "power1.out",
      });

      // Animate the model to rotate towards the target
      gsap.to(beeRef.current.rotation, {
        x: 0,
        y: 3,
        z: 0.5,
        duration: 2, // Smooth transition duration
        ease: "power1.out", // Easing for smooth animation
        onComplete: () => {
          playAnimation();
        },
      });
    } else if (objClassName === "obj-6") {
      // Animate the model's position and rotation
      gsap.to(beeRef.current.position, {
        x: 20,
        y: 3,
        z: 0,
        duration: 2,
        ease: "power1.out",
      });

      // Animate the model to rotate towards the target
      gsap.to(beeRef.current.rotation, {
        x: 0,
        y: 3,
        z: 0.1,
        duration: 2, // Smooth transition duration
        ease: "power1.out", // Easing for smooth animation
        onComplete: () => {
          playAnimation();
        },
      });
    }

    
  };

  // Execute animation when clicking on obj-1
  const executeAnimation = (objName) => {
    console.log("Start animation...");
    handleFaceToObject(objName); // Call handleFaceToObject when obj-1 is clicked
  };

  // Function to play the animation
  const playAnimation = () => {
    if (!beeRef.current || !mixerRef.current || !gltfRef.current) return; // Ensure all references are valid

    const action = mixerRef.current.clipAction(gltfRef.current.animations[0]);
    action.setLoop(THREE.LoopOnce); // Set the animation to play once

    // Start the animation
    action.play();

    // Animate the model's position and rotation after a delay
    const timeoutDuration = 3000; // 3 seconds delay before the position/rotation change

    setTimeout(() => {
      gsap.to(beeRef.current.position, {
        x: 0,
        y: -1,
        z: 0,
        duration: 2,
        ease: "power1.out",
      });

      gsap.to(beeRef.current.rotation, {
        x: 0,
        y: 3,
        z: 0,
        duration: 2, // Smooth transition duration
        ease: "power1.out", // Easing for smooth animation
      });

      // Stop the animation after the timeout
      action.stop();
    }, timeoutDuration);
  };

  // Setup Three.js scene, camera, renderer, and model loading
  useEffect(() => {
    // Setup the camera
    const camera = new THREE.PerspectiveCamera(
      10,
      window.innerWidth / window.innerHeight,
      0.1,
      800
    );
    camera.position.z = window.innerWidth < 768 ? 30 : 300;
    cameraRef.current = camera; // Save the camera to ref

    const scene = new THREE.Scene();
    let mixer;

    // Load the 3D model
    const loader = new GLTFLoader();
    loader.load(beeModel, function (gltf) {
      const bee = gltf.scene;
      gltfRef.current = gltf;
      beeRef.current = bee; // Save the model to ref
      mixer = new THREE.AnimationMixer(bee);
      mixerRef.current = mixer; // Save mixer to ref
      // mixer.clipAction(gltf.animations[0]).play(); // Optionally play the animation initially
      scene.add(bee);
      bee.position.set(0, 0, 0); // Center the model
      modelMove();
    });

    let isRotating = false;
    const modelMove = () => {
      if (isRotating) return;

      const sections = document.querySelectorAll(".section");
      let currentSection;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
          currentSection = section.id;
        }
      });

      let positionActive = arrPositionModel.findIndex(
        (val) => val.id === currentSection
      );

      if (positionActive >= 0) {
        const newCoordinates = arrPositionModel[positionActive];

        gsap.to(beeRef.current.position, {
          x: newCoordinates.position.x,
          y: newCoordinates.position.y,
          z: newCoordinates.position.z,
          duration: 3,
          ease: "power1.out",
        });
        gsap.to(beeRef.current.rotation, {
          x: newCoordinates.rotation.x,
          y: newCoordinates.rotation.y - 1,
          z: newCoordinates.rotation.z,
          duration: 3,
          ease: "power1.out",
        });
      }
    };

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("container3D").appendChild(renderer.domElement);
    rendererRef.current = renderer; // Save the renderer to ref

    // Setup lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 1);
    topLight.position.set(800, 800, 800);
    scene.add(topLight);

    // Animation loop
    const reRender3D = () => {
      requestAnimationFrame(reRender3D);
      renderer.render(scene, camera);
      if (mixer) mixer.update(0.02);
    };
    reRender3D();

    // Handle window resizing
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="landingpage">
      <header className="navbar">
        <div className="content-fit">
          <div className="logo">
            <a
              style={{
                textDecoration: "none",
                cursor: "pointer",
                fontSize: "30px",
                color: "white",
              }}
              href="/"
            >
              <p>Kaspool</p>
            </a>
          </div>
          <nav>
            <ul className="landingpage-nav">
              <li>
                <TrustWalletConnect />
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="section" id="banner">
        <div className="content-fit">
          <div className="title">KASPOOL</div>
          <div className="obj">
            <img
              onClick={() => {
                executeAnimation("obj-1");
              }}
              className="obj-1"
              src={obj1}
              alt=""
            />
            <img
              onClick={() => {
                executeAnimation("obj-2");
              }}
              className="obj-2"
              src={obj2}
              alt=""
            />
            <img
              onClick={() => {
                executeAnimation("obj-3");
              }}
              className="obj-3"
              src={obj3}
              alt=""
            />
            <img
              onClick={() => {
                executeAnimation("obj-4");
              }}
              className="obj-4"
              src={obj4}
              alt=""
            />
            <img
              onClick={() => {
                executeAnimation("obj-5");
              }}
              className="obj-5"
              src={obj5}
              alt=""
            />
            <img
              onClick={() => {
                executeAnimation("obj-6");
              }}
              className="obj-6"
              src={obj6}
              alt=""
            />
          </div>
        </div>
      </div>
      <div id="container3D"></div>
    </div>
  );
};

export default LandingPage3;
