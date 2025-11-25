// src/components/CategoryCard3D.jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Suspense } from 'react';
import Model3D from './Model3D';

/**
 * CategoryCard3D Component
 * Category card with 3D model icon
 *
 * @param {Object} category - Category data
 * @param {Function} onClick - Click handler
 */
function CategoryCard3D({ category, onClick }) {
    return (
        <li
            className="flex shadow-md shadow-gray-400 rounded-md flex-col gap-10 py-8 first:pt-0 last:pb-0 sm:flex-row cursor-pointer hover:shadow-xl transition-shadow"
            onClick={onClick}
        >
            {/* 3D Model Container */}
            <div className="w-48 h-48 flex-none rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 50 }}
                    style={{ width: '100%', height: '100%' }}
                >
                    <Suspense fallback={null}>
                        {/* Lighting */}
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} />
                        <pointLight position={[-10, -10, -5]} intensity={0.5} />

                        {/* 3D Model */}
                        <Stage environment="city" intensity={0.5}>
                            <Model3D
                                modelPath={category.model3D}
                                scale={1.5}
                                autoRotate={true}
                            />
                        </Stage>

                        {/* Optional: Allow user to rotate */}
                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            minPolarAngle={Math.PI / 2.5}
                            maxPolarAngle={Math.PI / 2.5}
                        />
                    </Suspense>
                </Canvas>
            </div>

            {/* Category Info */}
            <div className="max-w-xl flex-auto">
                <h3 className="text-lg/8 font-semibold tracking-tight text-gray-900">
                    {category.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                    {category.description || 'Explore products'}
                </p>
            </div>
        </li>
    );
}

export default CategoryCard3D;