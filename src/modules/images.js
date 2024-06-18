const { Storage } = require("@google-cloud/storage");
const { nanoid } = require("nanoid");
require("dotenv").config();

const path = require("path");

const pathKey = path.resolve("./teman-tani-10-04e6d3cf3344.json");

const gcs = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: pathKey,
});

const bucketName = process.env.BUCKET_NAME;
const bucket = gcs.bucket(bucketName);
const folder = process.env.BUCKET_FOLDER;

function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${bucketName}/${folder}/${filename}`;
}

const uploadToGcs = async (image) => {
  return new Promise((resolve, reject) => {
    if (!image) {
      reject(new Error("No image provided"));
      return;
    }

    const gcsname = nanoid(8);
    const filePath = `${folder}/${gcsname}`;
    const file = bucket.file(filePath);

    const stream = file.createWriteStream({
      metadata: {
        contentType: image.mimetype,
      },
    });

    stream.on("error", (err) => {
      image.cloudStorageError = err;
      reject(err);
    });

    stream.on("finish", () => {
      const publicUrl = getPublicUrl(gcsname);
      resolve(publicUrl);
    });

    stream.end(image.buffer);
  });
};

module.exports = { uploadToGcs };
