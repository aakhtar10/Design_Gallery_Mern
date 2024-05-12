const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
    cloud_name: 'dwetm19fr', 
    api_key: '276842751399855', 
    api_secret: 'ZauqP9k0AFc9PoLpEpK2_J_KVhw' 
});

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto"
};

// Function to upload a single image
const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, opts, (err, result) => {
            if (result && result.secure_url) {
                console.log(result.secure_url);
                resolve(result.secure_url);
            } else {
                console.log(err);
                reject(err);
            }
        });
    });
};

// Function to upload multiple images
const uploadMultipleImages = (images) => {
    return new Promise((resolve, reject) => {
        const uploads = images.map((image) => uploadImage(image));
        Promise.all(uploads)
            .then((values) => resolve(values))
            .catch((err) => reject(err));
    });
};

module.exports = { uploadImage, uploadMultipleImages };
