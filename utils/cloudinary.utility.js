const cloudinary = require("../config/cloudinary");

const getPublicId = (URL) => {
  const parts = URL.split("/");
  const folderName = parts[parts.length - 2];
  const filename = parts[parts.length - 1];
  const publicId = filename.split(".")[0];
  return `${folderName}/${publicId}`;
};

const deleteFileFromCloudinary = async (fileURL, folderName) => {
  try {
    const publicId = getPublicId(fileURL, folderName);
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    throw error;
  }
};

module.exports = { getPublicId, deleteFileFromCloudinary };
