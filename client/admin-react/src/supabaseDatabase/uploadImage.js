// Import configured Supabase client
import supabase from "../utilities/supabaseConfig.js";

/**
 * Upload a single image to Supabase Storage
 * @param {File} file - The image file to upload
 * @param {string} category - Product category (e.g., 'mouse', 'keyboard', 'speaker', 'monitor')
 * @returns {Promise<{success: boolean, url?: string, path?: string, error?: string}>}
 */
export async function uploadProductImage(file, category) {
    try {
        // Generate unique filename using timestamp and random string
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

        // Create file path: products/category/filename
        // Example: products/mouse/1234567890_abc123.jpg
        const filePath = `products/${category}/${fileName}`;

        // Upload file to 'images' bucket with the generated path
        const { data, error } = await supabase.storage
            .from('images')
            .upload(filePath, file, {
                cacheControl: '3600', // Cache for 1 hour
                upsert: false // Don't overwrite if file exists
            });

        // Handle upload errors
        if (error) {
            console.error('Upload error:', error);
            return {
                success: false,
                error: error.message
            };
        }

        // Get public URL for the uploaded image
        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        // Return success with URL and path
        return {
            success: true,
            url: publicUrl,
            path: filePath
        };

    } catch (error) {
        // Handle unexpected errors
        console.error('Unexpected error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Upload multiple images at once
 * @param {FileList|Array<File>} files - Array of image files
 * @param {string} category - Product category
 * @returns {Promise<Array>} Array of upload results
 */
export async function uploadMultipleImages(files, category) {
    // Convert FileList to Array if needed
    const fileArray = Array.from(files);

    // Upload all files in parallel using Promise.all
    const uploadPromises = fileArray.map(file => uploadProductImage(file, category));

    // Wait for all uploads to complete
    const results = await Promise.all(uploadPromises);

    return results;
}

/**
 * Delete an image from Supabase Storage
 * @param {string} filePath - The path of the file to delete (e.g., 'products/mouse/123.jpg')
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function deleteProductImage(filePath) {
    try {
        // Delete file from 'images' bucket
        const { error } = await supabase.storage
            .from('images')
            .remove([filePath]);

        // Handle deletion errors
        if (error) {
            console.error('Delete error:', error);
            return {
                success: false,
                error: error.message
            };
        }

        // Return success
        return {
            success: true
        };

    } catch (error) {
        // Handle unexpected errors
        console.error('Unexpected error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}