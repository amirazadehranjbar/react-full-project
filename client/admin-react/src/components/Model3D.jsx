// src/components/Model3D.jsx
import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useSpring, animated } from '@react-spring/three';

/**
 * Model3D Component
 * Displays a 3D model with rotation animation
 *
 * @param {String} modelPath - Path to GLB/GLTF file
 * @param {Number} scale - Model scale (default: 1)
 * @param {Boolean} autoRotate - Auto-rotate on hover (default: true)
 */
function Model3D({ modelPath, scale = 1, autoRotate = true }) {
    const meshRef = useRef();

    // Load the 3D model
    const gltf = useLoader(GLTFLoader, modelPath);

    // Auto-rotation animation
    useFrame((state, delta) => {
        if (autoRotate && meshRef.current) {
            meshRef.current.rotation.y += delta * 0.5; // Rotate speed
        }
    });

    return (
        <primitive
            ref={meshRef}
            object={gltf.scene}
            scale={scale}
        />
    );
}

export default Model3D;