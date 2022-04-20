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
      files.forEach(async (file) => {
        const data = await uploadOne(file.path);
        result.push(data);
      });

      result.push("data.secure_url");
      resolve({ status: 200, data: result });
    } catch (error) {
      console.log(error);
      reject({ status: 500, data: error });
    }
  });
};
module.exports = { upload };
