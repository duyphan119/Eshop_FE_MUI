const cloudinary = require("../config/configCloudinary");

const uploadOne = async (image) => {
  return new Promise(async (resolve, reject) => {
    cloudinary.uploader.upload(image, {}, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const upload = async (files) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = [];

      for (const file of files) {
        const data = await uploadOne(file.path);
        result.push(data.secure_url);
        // // You aren't doing anything with data so no need for the return value
        // await uploadToRemoteBucket(file.path);

        // // Delete the file like normal
        // await unlinkAsync(file.path);
      }

      resolve({ status: 200, data: result });
    } catch (error) {
      console.log(error);
      reject({ status: 500, data: error });
    }
  });
};
module.exports = { upload };
