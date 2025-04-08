import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECERT 
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
      if (!localFilePath)
        return null
      //upload on cloudinary
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type : "auto"
      })
      //file uploaded
      console.log('file uploaded on cloudinary,response.url');
      return response;
  } catch{
      fs.unlinkSync(localFilePath); //remove the loacally saved temporary saved as the upload operation is failed
      return null;
  }
}

export default uploadOnCloudinary;