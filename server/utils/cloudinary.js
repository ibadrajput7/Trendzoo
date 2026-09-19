import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (fileBuffer, originalName) => {
    try {
        if (!fileBuffer) return null;

        return await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    public_id: originalName
                        ? `${Date.now()}-${originalName.replace(/\.[^/.]+$/, "")}`
                        : undefined,
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            uploadStream.end(fileBuffer);
        });
    } catch (error) {
        console.error("Cloudinary upload failed:", error);
        return null;
    }
};

export { uploadOnCloudinary };