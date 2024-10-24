import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import styled from "styled-components";
import beeModel from "../assets/model/modelinput_final.glb"; // 3D model
import Modal from "../components/Modal";
import obj1 from "../assets/mining/1.png";
import obj2 from "../assets/mining/2.png";
import obj3 from "../assets/mining/3.png";
import obj4 from "../assets/mining/4.png";
import obj5 from "../assets/mining/5.png";
import obj6 from "../assets/mining/6.png";

import TrustWalletConnect from "../components/TrustWalletConnect"; // Connect Wallet component
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles

const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: #5c3aff;
  }
`;

const CloseButton = styled.svg`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 18px;
  top: 18px;
  cursor: pointer;
`;

const LandingPage3 = () => {
  const [isOpen1, toggle1] = useState(false);
  const [isOpen2, toggle2] = useState(false);
  const [isOpen3, toggle3] = useState(false);
  const [isOpen4, toggle4] = useState(false);
  const [isOpen5, toggle5] = useState(false);
  const [isOpen6, toggle6] = useState(false);
  const beeRef = useRef(); // Ref for the bee model
  const cameraRef = useRef(); // Ref for the camera
  const rendererRef = useRef(); // Ref for the renderer
  const mixerRef = useRef(); // Ref for the animation mixer
  const gltfRef = useRef();

  const handleOpenModal = (index, open) => {
    if (open === true) {
      const objectElementList = document.querySelectorAll(`.obj-item`);
      objectElementList.forEach((item) => {
        item.style.zIndex = "999999";
      });
    }
    if (index === 1) {
      toggle1(open);
    } else if (index === 2) {
      toggle2(open);
    } else if (index === 3) {
      toggle3(open);
    } else if (index === 4) {
      toggle4(open);
    } else if (index === 5) {
      toggle5(open);
    } else if (index === 6) {
      toggle6(open);
    }
  };

  const handleAnimation = () => {
    setAnimation((prev) => !prev);
  };

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
    const rect = objectElement.getBoundingClientRect();
    const elementPosition = {
      top: rect.top, // Distance from the top of the viewport
      left: rect.left, // Distance from the left of the viewport
      right: rect.right, // Distance from the right of the viewport
      bottom: rect.bottom, // Distance from the bottom of the viewport
      width: rect.width, // Width of the element
      height: rect.height, // Height of the element
    };

    console.log("Object Element Position:", elementPosition);

    if (!objectElement || !beeRef.current || !cameraRef.current) return;
    const objectElementList = document.querySelectorAll(`.obj-item`);
    objectElementList.forEach((item) => {
      item.style.zIndex = "0";
    });

    if (objClassName === "obj-1") {
      // Animate the model's position and rotation
      gsap.to(beeRef.current.position, {
        x: -16,
        y: -13,
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
          playAnimation(objClassName);
        },
      });
    } else if (objClassName === "obj-2") {
      // Animate the model's position and rotation
      gsap.to(beeRef.current.position, {
        x: -15,
        y: 0,
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
          playAnimation(objClassName);
        },
      });
    } else if (objClassName === "obj-3") {
      // Animate the model's position and rotation
      gsap.to(beeRef.current.position, {
        x: 5,
        y: -8,
        z: 0,
        duration: 2,
        ease: "power1.out",
      });

      // Animate the model to rotate towards the target
      gsap.to(beeRef.current.rotation, {
        x: 0,
        y: 0.2,
        z: 0.2,
        duration: 2, // Smooth transition duration
        ease: "power1.out", // Easing for smooth animation
        onComplete: () => {
          playAnimation(objClassName);
        },
      });
    } else if (objClassName === "obj-4") {
      // Animate the model's position and rotation
      gsap.to(beeRef.current.position, {
        x: -8,
        y: -6,
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
          playAnimation(objClassName);
          objectElement.style.zIndex = "99999999";
        },
      });
    } else if (objClassName === "obj-5") {
      // Animate the model's position and rotation
      gsap.to(beeRef.current.position, {
        x: 15,
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
          playAnimation(objClassName);
        },
      });
    } else if (objClassName === "obj-6") {
      // Animate the model's position and rotation
      gsap.to(beeRef.current.position, {
        x: 12,
        y: 0,
        z: 0,
        duration: 2,
        ease: "power1.out",
      });

      // Animate the model to rotate towards the target
      gsap.to(beeRef.current.rotation, {
        x: 0,
        y: 3,
        z: 0,
        duration: 2, // Smooth transition duration
        ease: "power1.out", // Easing for smooth animation
        onComplete: () => {
          playAnimation(objClassName);
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
  const playAnimation = (objName) => {
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
        onComplete: () => {
          if (objName === "obj-1") {
            handleOpenModal(1, true);
          } else if (objName === "obj-2") {
            handleOpenModal(2, true);
          } else if (objName === "obj-3") {
            handleOpenModal(3, true);
          } else if (objName === "obj-4") {
            handleOpenModal(4, true);
          } else if (objName === "obj-5") {
            handleOpenModal(5, true);
          } else if (objName === "obj-6") {
            handleOpenModal(6, true);
          }
        },
      });

      // Stop the animation after the timeout
      action.stop();

      handleOpenModal(true);
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
          duration: 1,
          ease: "power1.out",
        });
        gsap.to(beeRef.current.rotation, {
          x: newCoordinates.rotation.x,
          y: newCoordinates.rotation.y - 1,
          z: newCoordinates.rotation.z,
          duration: 1,
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
          <div className="obj">
            <img
              onClick={() => {
                executeAnimation("obj-1");
              }}
              className="obj-item obj-1"
              src={obj1}
              alt=""
            />
            <img
              onClick={() => {
                executeAnimation("obj-2");
              }}
              className="obj-item obj-2"
              src={obj2}
              alt=""
            />
            <img
              onClick={() => {
                executeAnimation("obj-3");
              }}
              className="obj-item obj-3"
              src={obj3}
              alt=""
            />
            <img
              onClick={() => {
                executeAnimation("obj-4");
              }}
              className="obj-item obj-4"
              src={obj4}
              alt=""
            />
            <img
              onClick={() => {
                executeAnimation("obj-5");
              }}
              className="obj-item obj-5"
              src={obj5}
              alt=""
            />
            <img
              onClick={() => {
                executeAnimation("obj-6");
              }}
              className="obj-item obj-6"
              src={obj6}
              alt=""
            />
          </div>
        </div>
      </div>
      <div id="container3D"></div>
      <Modal isOpen={isOpen1}>
        <ModalContent>
          <CloseButton
            style={{ zIndex: "999999999" }}
            onClick={(e) => handleOpenModal(1, false)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20.39 20.39"
          >
            <title>X</title>
            <line
              x1="19.39"
              y1="19.39"
              x2="1"
              y2="1"
              fill="none"
              stroke="#5c3aff"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
            <line
              x1="1"
              y1="19.39"
              x2="19.39"
              y2="1"
              fill="none"
              stroke="#5c3aff"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
          </CloseButton>
          <div className="flex flex-1 w-full p-12 sm:p-[100px] gap-6">
            <div className="flex flex-col w-full flex-auto gap-5">
              <p className="text-4xl sm:text-2xl font-extrabold subpixel-antialiased text-cyan-400">
                The Importance of Crypto
              </p>
              <p className="text-white">
                Market Capitalization: Crypto reached $1.17 trillion (2023),
                with Bitcoin and Ethereum leading the way.
              </p>
              <p className="text-white">
                Trading Volume: Binance processes over $76 billion per day.
              </p>
              <p className="text-white">
                Users: 420 million people own crypto, with an increasing number
                of countries legalizing it.
              </p>
              <p className="text-white">
                Blockchain Applications: Over 80% of major banks are investing
                in this technology.
              </p>
            </div>
          </div>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen2}>
        <ModalContent>
          <CloseButton
            style={{ zIndex: "999999999" }}
            onClick={(e) => handleOpenModal(2, false)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20.39 20.39"
          >
            <title>X</title>
            <line
              x1="19.39"
              y1="19.39"
              x2="1"
              y2="1"
              fill="none"
              stroke="#5c3aff"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
            <line
              x1="1"
              y1="19.39"
              x2="19.39"
              y2="1"
              fill="none"
              stroke="#5c3aff"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
          </CloseButton>
          <div className="flex flex-1 w-full p-12 sm:p-[100px] gap-6">
            <div className="flex flex-col w-full flex-auto gap-5">
              <p className="text-4xl sm:text-2xl font-extrabold subpixel-antialiased text-cyan-400">
                What is Kaspool ?
              </p>
              <p className="text-white">
                Kaspool is a platform for mining digital assets through coin
                mining pools. With a coin based on Kaspa's DAG technology, it
                represents a pioneering approach to enhancing performance
                without sacrificing decentralization.
              </p>
              <p className="text-white">
                Kaspool is committed to providing opportunities for quick and
                sustainable profits.
              </p>
            </div>
          </div>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen3}>
        <ModalContent>
          <CloseButton
            style={{ zIndex: "999999999" }}
            onClick={(e) => handleOpenModal(3, false)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20.39 20.39"
          >
            <title>X</title>
            <line
              x1="19.39"
              y1="19.39"
              x2="1"
              y2="1"
              fill="none"
              stroke="#5c3aff"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
            <line
              x1="1"
              y1="19.39"
              x2="19.39"
              y2="1"
              fill="none"
              stroke="#5c3aff"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
          </CloseButton>
          <div className="flex flex-1 w-full p-12 sm:p-[100px] gap-6">
            <div className="flex flex-col w-full flex-auto gap-5">
              <p className="text-4xl sm:text-2xl font-extrabold subpixel-antialiased text-cyan-400">
                BlockDAG Technology
              </p>
              <p className="text-white">
                Kaspool utilizes the BlockDAG platform and references GhostDAG
                technology, which minimizes the waste of computational resources
                and creates parallel blocks. This enables the processing of a
                large volume of transactions without issues related to network
                congestion or orphan blocks.
              </p>
            </div>
          </div>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen4}>
        <ModalContent>
          <CloseButton
            onClick={(e) => handleOpenModal(4, false)}
            style={{ zIndex: "9999" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20.39 20.39"
          >
            <title>X</title>
            <line
              x1="19.39"
              y1="19.39"
              x2="1"
              y2="1"
              fill="none"
              stroke="#5c3aff"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
            <line
              x1="1"
              y1="19.39"
              x2="19.39"
              y2="1"
              fill="none"
              stroke="#5c3aff"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
          </CloseButton>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <div className="flex flex-col flex-auto h-full sm:p-[200px] pt-[20px] pl-[20px] pr-[20px] sm:gap-5 gap-5">
                <p className="text-5xl sm:text-2xl font-extrabold subpixel-antialiased text-cyan-400">
                  KASPOOL MAIN FEATURES
                </p>
                <p className="text-white pl-8">MULTI-SOURCE MINING</p>
                <p className="text-white pl-16">
                  KASPOOL will develop a digital asset mining system from
                  various sources, leveraging the power of the community to
                  optimize mining efforts.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col flex-auto h-full sm:p-[200px] pt-[20px] pl-[20px] pr-[20px] sm:gap-5 gap-5">
                <p className="text-5xl sm:text-2xl font-extrabold subpixel-antialiased text-cyan-400">
                  KASPOOL MAIN FEATURES
                </p>
                <p className="text-white pl-8">KASPOOL COIN</p>
                <p className="text-white pl-16">
                  KASPOOL will incorporate the best technical criteria from
                  Kaspa, including:
                </p>

                <p className="text-white pl-16">
                  The kHeavyHash algorithm, which enhances mining efficiency and
                  reduces energy consumption.
                </p>

                <p className="text-white pl-16">
                  GhostDAG technology, which ensures network integrity and
                  allows for near-instant transaction confirmations.
                </p>

                <p className="text-white pl-16">
                  Complete decentralization, ensuring that everyone can
                  participate in mining and transaction validation without
                  third-party control.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col flex-auto h-full sm:p-[200px] pt-[20px] pl-[20px] pr-[20px] sm:gap-5 gap-5">
                <p className="text-5xl sm:text-2xl font-extrabold subpixel-antialiased text-cyan-400">
                  KASPOOL MAIN FEATURES
                </p>
                <p className="text-white pl-8">
                  STABLE AND FAIR INVESTMENT VALUES:
                </p>
                <p className="text-white pl-16">
                  The main goal of Kaspool is to create an investment ecosystem
                  that offers high returns while ensuring stability. Thanks to
                  BlockDAG technology, Kaspool will provide sustainable and
                  long-term investment opportunities for investors.
                </p>
                <p className="text-white pl-16">
                  The value of investment returns will be fairly distributed
                  based on contributions made within the mining network.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col flex-auto h-full sm:p-[200px] pt-[20px] pl-[20px] pr-[20px] sm:gap-5 gap-5">
                <p className="text-5xl sm:text-2xl font-extrabold subpixel-antialiased text-cyan-400">
                  KASPOOL MAIN FEATURES
                </p>
                <p className="text-white pl-8">SECURITY AND TRANSPARENCY:</p>
                <p className="text-white pl-16">
                  Kaspool will implement strict security principles similar to
                  Kaspa, utilizing PoW (Proof-of-Work) technology with the
                  kHeavyHash algorithm, ensuring high security while optimizing
                  energy efficiency.
                </p>
                <p className="text-white pl-16">
                  The user management and interaction system will be based on
                  Web3.0, ensuring security and transparency.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen5}>
        <ModalContent>
          <CloseButton
            onClick={(e) => handleOpenModal(5, false)}
            style={{ zIndex: "9999" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20.39 20.39"
          >
            <title>X</title>
            <line
              x1="19.39"
              y1="19.39"
              x2="1"
              y2="1"
              fill="none"
              stroke="#5c3aff"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
            <line
              x1="1"
              y1="19.39"
              x2="19.39"
              y2="1"
              fill="none"
              stroke="#5c3aff"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
          </CloseButton>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <div className="flex flex-col flex-auto h-full sm:p-[200px] pt-[20px] pl-[20px] pr-[20px] sm:gap-5 gap-5">
                <p className="text-5xl sm:text-2xl font-extrabold subpixel-antialiased text-cyan-400">
                  Development Strategy
                </p>
                <p className="text-white pl-8">Q4 - 2024</p>
                <p className="text-white pl-16">
                  Complete technology tests for mining pools.
                </p>
                <p className="text-white pl-8">Q1 2025</p>
                <p className="text-white pl-16">
                  Launch of the multi-platform wallet, KasPool Wallet.
                </p>
                <p className="text-white pl-8">Q2/2025</p>
                <p className="text-white pl-16">
                  Launch of the testNet for the private blockchain system,
                  KasPoolChain.
                </p>
                <p className="text-white pl-8">Q3-Q4/2025</p>
                <p className="text-white pl-16">
                  Update the TestNet system and launch the KSP coin on the
                  KasPoolChain network.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col flex-auto h-full sm:p-[200px] pt-[20px] pl-[20px] pr-[20px] sm:gap-5 gap-5">
                <p className="text-5xl sm:text-2xl font-extrabold subpixel-antialiased text-cyan-400">
                  Development Strategy
                </p>
                <p className="text-white pl-8">Q1/2026</p>
                <p className="text-white pl-16">
                  Official launch of KasPoolChain
                </p>
                <p className="text-white pl-8">Q1/2026</p>
                <p className="text-white pl-16">
                  Official launch of KasPoolChain
                </p>
                <p className="text-white pl-8">2027</p>
                <p className="text-white pl-16">
                  Launch of the digital asset exchange, KasExchange
                </p>
                <p className="text-white pl-8">POST-2027</p>
                <p className="text-white pl-16">
                  Launch of an open decentralized platform, allowing users to
                  access exclusive BlockDAG technologies and create their own
                  applications.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen6}>
        <ModalContent>
          <CloseButton
            style={{ zIndex: "999999999" }}
            onClick={(e) => handleOpenModal(6, false)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20.39 20.39"
          >
            <title>X</title>
            <line
              x1="19.39"
              y1="19.39"
              x2="1"
              y2="1"
              fill="none"
              stroke="#5c3aff"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
            <line
              x1="1"
              y1="19.39"
              x2="19.39"
              y2="1"
              fill="none"
              stroke="#5c3aff"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
          </CloseButton>
          <div className="flex flex-1 w-full p-12 sm:p-[100px] gap-6">
            <div className="flex flex-col w-full flex-auto gap-5">
              <p className="text-4xl sm:text-2xl font-extrabold subpixel-antialiased text-cyan-400">
                Advantages for Investors
              </p>
              <p className="text-white">
                Stable profits: Clear ROI with low mining costs.
              </p>
              <p className="text-white">
                High security: DAG technology protects assets.
              </p>
              <p className="text-white">
                High liquidity: Easily exchangeable on major exchanges.
              </p>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LandingPage3;

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
