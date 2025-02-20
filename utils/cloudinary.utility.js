const cloudinary = require("../config/cloudinary");

const getPublicId = (URL) => {
  try {
    const urlParts = URL.split("/");
    const filenameWithExtension = urlParts.pop();
    const folderName = urlParts.pop();
    const publicId = filenameWithExtension.split(".")[0];

    return folderName ? `${folderName}/${publicId}` : publicId;
  } catch (error) {
    console.error("Error extracting publicId:", error);
    return null;
  }
};

const deleteFileFromCloudinary = async (fileURL) => {
  try {
    const publicId = getPublicId(fileURL);
    if (!publicId) {
      throw new Error("Invalid Cloudinary URL format");
    }

    const response = await cloudinary.uploader.destroy(publicId);
    console.log(`Deleted ${publicId} from Cloudinary`, response);
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = { deleteFileFromCloudinary };
