const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dwetm19fr",
  api_key: "276842751399855",
  api_secret: "ZauqP9k0AFc9PoLpEpK2_J_KVhw",
});

const uploadImageToCloudinary = async (filePath, folder, height, quality) => {
  const options = { folder };
  if (height) options.height = height;
  if (quality) options.quality = quality;
  options.resource_type = "auto";

  try {
    return await cloudinary.uploader.upload(filePath, options);
  } catch (error) {
    console.log("Error while uploading image:", error);
    throw error;
  }
};

const deleteResourceFromCloudinary = async (url) => {
  if (!url) return;

  try {
    const result = await cloudinary.uploader.destroy(url);
    console.log(`Deleted resource with public ID: ${url}`);
    return result;
  } catch (error) {
    console.error(`Error deleting resource with public ID ${url}:`, error);
    throw error;
  }
};

module.exports = {
  uploadImageToCloudinary,
  deleteResourceFromCloudinary,
};