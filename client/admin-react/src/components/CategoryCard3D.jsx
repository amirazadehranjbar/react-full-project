// src/components/CategoryCard3D.jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Suspense } from 'react';
import Model3D from './Model3D';

/**
 * CategoryCard3D Component
 * Modern card-based design with 3D model and gradient background
 *
 * @param {Object} category - Category data
 * @param {Function} onClick - Click handler
 */
function CategoryCard3D({ category, onClick }) {
    return (
        <div
            className="relative w-full h-64 rounded-2xl overflow-hidden shadow-2xl group transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl"
            style={{
                background: 'radial-gradient(circle at center, rgba(180, 190, 200, 0.8) 0%, rgba(240, 243, 246, 0.3) 70%)'
            }}
        >
            {/* 3D Model Container (Left Side) */}
            <div className="absolute inset-0 w-2/3 h-full">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 50 }}
                    style={{ width: '100%', height: '100%' }}
                >
                    <Suspense fallback={null}>
                        {/* Lighting */}
                        <ambientLight intensity={0.8} />
                        <directionalLight position={[10, 10, 5]} intensity={1.2} />
                        <pointLight position={[-10, -10, -5]} intensity={0.7} />

                        {/* 3D Model */}
                        <Stage environment="city" intensity={0.6}>
                            <Model3D
                                modelPath={category.model3D}
                                scale={2}
                                autoRotate={false}
                            />
                        </Stage>

                        {/* Optional: User interaction */}
                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            false
                            autoRotateSpeed={2}
                        />
                    </Suspense>
                </Canvas>
            </div>

            {/* Category Info Card (Right Side) */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 flex flex-col justify-center items-center p-6 space-y-4">
                {/* Category Name */}
                <div className="w-full bg-slate-600/90 backdrop-blur-sm rounded-lg px-6 py-4 shadow-lg">
                    <h3 className="text-xl font-bold text-white text-center">
                        {category.name}
                    </h3>
                </div>

                {/* Explore Button */}
                <button
                    onClick={onClick}
                    className="w-full bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-slate-300 rounded-lg px-6 py-3 text-slate-700 font-semibold transition-all duration-300 hover:scale-105 shadow-md cursor-pointer"
                >
                    Explore products
                </button>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
    );
}

export default CategoryCard3D;