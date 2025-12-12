import React from 'react'
import ImageUploaderComponent from "./ImageUploaderComponent.jsx";

function ManageProductsImages() {
    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Test Image Upload to Supabase
                </h1>

                {/* Upload component for different categories */}
                <div className="space-y-6">
                    {/* Mouse images uploader */}
                    <ImageUploaderComponent category="mouse"/>
                    <ImageUploaderComponent category="keyboard"/>
                    <ImageUploaderComponent category="speaker"/>
                    <ImageUploaderComponent category="monitor"/>
                </div>
            </div>
        </div>
    )
}

export default ManageProductsImages
