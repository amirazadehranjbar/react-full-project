// Custom React carousel with state management
import { useState } from "react";

function SliderComp({imagesList}) {
    
    // State: Current slide index
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Guard: No images check
    if (!imagesList || imagesList.length === 0) {
        return <div className="text-center p-4">No images available</div>;
    }
    
    // Prev slide function
    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
    };
    
    // Next slide function
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
    };
    
    // Go to specific slide
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };
    
    return (
        <div className="relative w-full max-w-4xl mx-auto">
            {/* Carousel container */}
            <div className="relative h-96 overflow-hidden rounded-lg bg-gray-100">
                {/* Images */}
                {imagesList.map((image, index) => (
                    <div 
                        key={index}
                        className={`absolute w-full h-full transition-opacity duration-700 ${
                            index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img 
                            src={image} 
                            alt={`Product ${index + 1}`}
                            className="w-full h-full object-contain"
                        />
                    </div>
                ))}
            </div>
            
            {/* Dot indicators */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {imagesList.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-400'
                        }`}
                    />
                ))}
            </div>
            
            {/* Previous button */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 z-30 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            
            {/* Next button */}
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 z-30 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}

export default SliderComp;
