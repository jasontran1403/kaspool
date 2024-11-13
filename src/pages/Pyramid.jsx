import { Stats, OrbitControls, Environment } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import beeModel from "../assets/model/pyramid_glas_gray.glb"; // 3D model
import IMAGE from "../assets/model/night-9.jpg";
import TrustWalletConnect from "../components/TrustWalletConnect"; // Connect Wallet component


const Pyramid = () => {
    const gltf = useLoader(GLTFLoader, beeModel);

    return (
        <div className="landingpage">
            <header className="navbar">
                <div className="content-fit">
                    <div className="logo">
                        <a href="/" style={{ textDecoration: "none", fontSize: "30px", color: "white" }}>
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
            
            <Canvas camera={{ position: [20, 35, 35] }}>
                <Environment
                    files={IMAGE}
                    background
                    backgroundBlurriness={0.07}
                />
                <directionalLight position={[3.3, 1.0, 4.4]} intensity={9000} />
                <primitive object={gltf.scene} position={[0, 10, 0]} />
                <OrbitControls target={[0, 1, 0]} autoRotate />
                {/* <Stats /> */}
            </Canvas>
            <div className="hashrate-container">
                <span>ádjalskdjasldasd</span>
            </div>
        </div>

    )
}

export default Pyramid;