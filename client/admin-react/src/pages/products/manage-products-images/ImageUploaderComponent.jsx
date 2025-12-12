// React component for uploading product images
import React, {useState} from 'react';
import {uploadProductImage, uploadMultipleImages} from '../../../supabaseDatabase/uploadImage.js';
import * as PropTypes from "prop-types";

//region🧩 COMPONENTS
function SelectImage(props) {
    return <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Images
        </label>
        <input
            type="file"
            accept="image/*"
            multiple
            onChange={props.onChange}
            className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
        />
    </div>;
}

SelectImage.propTypes = {onChange: PropTypes.func};


function SelectedFilesPreview(props) {
    return <>
        {props.selectedFiles.length > 0 && (
            <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                    Selected Files ({props.selectedFiles.length}):
                </p>
                <div className="space-y-1">
                    {props.selectedFiles.map(props.callbackfn)}
                </div>
            </div>
        )}
    </>;
}

SelectedFilesPreview.propTypes = {
    selectedFiles: PropTypes.arrayOf(PropTypes.any),
    callbackfn: PropTypes.func
};

function UploadButton(props) {
    return <button
        onClick={props.onClick}
        disabled={props.uploading || props.selectedFiles.length === 0}
        className={`w-full py-2 px-4 rounded-md font-medium text-white
                    ${props.uploading || props.selectedFiles.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
    >
        {props.uploading ? "Uploading..." : "Upload Images"}
    </button>;
}

UploadButton.propTypes = {
    onClick: PropTypes.func,
    uploading: PropTypes.bool,
    selectedFiles: PropTypes.arrayOf(PropTypes.any)
};

//endregion


/**
 * ImageUploader Component
 * Allows users to select and upload product images to Supabase
 */
function ImageUploaderComponent({category = 'mouse'}) {
    // State for selected files
    const [selectedFiles, setSelectedFiles] = useState([]);
    // State for upload progress and results
    const [uploading, setUploading] = useState(false);
    const [uploadResults, setUploadResults] = useState([]);

    /**
     * Handle file selection
     * Triggered when user selects files from file input
     */
    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
        setUploadResults([]); // Clear previous results
    };

    /**
     * Handle file upload
     * Uploads all selected files to Supabase Storage
     */
    const handleUpload = async () => {
        // Validate: Check if files are selected
        if (selectedFiles.length === 0) {
            alert('Please select at least one image');
            return;
        }

        // Set uploading state to true (shows loading indicator)
        setUploading(true);

        try {
            // Upload all selected files using the helper function
            const results = await uploadMultipleImages(selectedFiles, category);

            // Store results to display to user
            setUploadResults(results);

            // Show success/error messages
            const successCount = results.filter(r => r.success).length;
            const failCount = results.filter(r => !r.success).length;

            alert(`Upload complete!\nSuccessful: ${successCount}\nFailed: ${failCount}`);

            // Clear selected files after successful upload
            if (failCount === 0) {
                setSelectedFiles([]);
            }

        } catch (error) {
            // Handle unexpected errors
            console.error('Upload failed:', error);
            alert('Upload failed: ' + error.message);
        } finally {
            // Always reset uploading state
            setUploading(false);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
            {/* Header */}
            <h2 className="text-2xl font-bold mb-4">Upload {category} Images</h2>

            {/* File Input */}
            <SelectImage onChange={handleFileSelect}/>

            {/* Selected Files Preview */}
            <SelectedFilesPreview selectedFiles={selectedFiles} callbackfn={(file, index) => (
                <div key={index} className="text-sm text-gray-600">
                    {index + 1}. {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </div>
            )}/>

            {/* Upload Button */}
            <UploadButton onClick={handleUpload} uploading={uploading} selectedFiles={selectedFiles}/>

            {/* Upload Results */}
            {uploadResults.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Upload Results:</h3>
                    <div className="space-y-2">
                        {uploadResults.map((result, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-md ${
                                    result.success ? 'bg-green-50' : 'bg-red-50'
                                }`}
                            >
                                {result.success ? (
                                    <>
                                        <p className="text-green-700 font-medium">✓ Success</p>
                                        <p className="text-sm text-gray-600 truncate">
                                            URL: {result.url}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Path: {result.path}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-red-700 font-medium">✗ Failed</p>
                                        <p className="text-sm text-gray-600">
                                            Error: {result.error}
                                        </p>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImageUploaderComponent;