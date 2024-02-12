import axios from "axios";

async function ImageUpload(image) {
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "u6fuaioa");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dblj4xikl/image/upload",
      formData
    );

    console.log('Upload successful:', response.data.url);

    return response.data.url;
  } catch (error) {
    // Handle errors
    console.error('Upload failed:', error.message);

    // Return an appropriate value or throw an error, depending on your needs
    throw error;
  }
}

export default ImageUpload;
