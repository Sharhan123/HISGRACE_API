
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name:'dp5y9nivq',
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
}) 

export const  uploadImageToCloudinary = async(base64String:any)=> {
    try { 
      
      const result = await cloudinary.uploader.upload(base64String, { resource_type: "auto" });
      console.log("Image uploaded successfully:", result.url);
      return result.url; 
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  }

  export const removeImage = async(url:String)=>{
    try{
      const result = await cloudinary.uploader.destroy(url)
      return result
    }catch(err){
      throw err
      
    }
  }
 