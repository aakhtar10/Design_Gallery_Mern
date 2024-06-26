const { ArtModel } = require("../model/art.model");
const {  uploadImageToCloudinary } = require("./uploadImage");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dwetm19fr",
  api_key: "276842751399855",
  api_secret: "ZauqP9k0AFc9PoLpEpK2_J_KVhw",
});

const postArt = async (req, res) => {
  try {
// console.log(req.files);
if (!req.files || !req.files.artImage) {
  return res.status(400).json({ error: "No images uploaded" });
}

const file = req.files.artImage;

const uploadedImage = await uploadImageToCloudinary(file.tempFilePath, "artImages");

if (!uploadedImage) {
  return res.status(500).json({ error: "Image upload failed" });
}
    const newArt = new ArtModel({
      artImage: uploadedImage.secure_url,
      artName: req.body.artName,
      artCategory: req.body.artCategory,
      artPrice: req.body.artPrice,
      artDimension: req.body.artDimension,
      created_at: req.body.created_at,
      userID: req.body.userID,
      username: req.body.username,
    });
    const savedArt = await newArt.save();
    // setArts((prevArts) => [savedArt, ...prevArts]);
    res.status(201).json(savedArt);
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getArt = async (req, res) => {
  try {
    if (req.role == "artist") {
      const getArt = await ArtModel.find({ userID: req.body.userID }).sort({ createdAt: -1 });
      // console.log("---", req.role);
      res.status(200).json({ getArt, role: req.role });
    }
  } catch (err) {
    console.log(err);
    console.log("Not able to get art");
  }
};

const deleteArt = async (req, res) => {
  const { id } = req.params;
  try {
    const art = await ArtModel.findById(id);
    // console.log("art-->", art);
    if (!art) {
      return res.status(404).send("Art not found");
    }
    if (art.userID == req.body.userID) {
      const deletedArt = await ArtModel.findByIdAndDelete(id);
      if (deletedArt) {
        res.status(200).send(deletedArt);
      } else {
        res.status(500).send("Failed to delete art");
      }
    } else {
      res.status(403).send("Only the artist who created the art can delete it");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while deleting art");
  }
};

const updateArt = async (req, res) => {
  const { id } = req.params;
  try {
    const art = await ArtModel.findById(id);
    if (art.userID == req.body.userID) {
      const updateArt = await ArtModel.findByIdAndUpdate(id, req.body);
      res.status(200).send(updateArt);
    } else {
      res.status(400).send("Only artist can update the art");
    }
  } catch (err) {
    console.log(err);
    console.log("Not able to update art");
  }
};

const getArtById = async (req, res) => {
  const { id } = req.params;
  const { userID } = req.body;
  

  try {
    const getArtById = await ArtModel.findById(id);
    res.status(200).json({ getArtById, userID });
  } catch (err) {
    console.log(err);
    console.log("Not able to get art by id");
  }
};

module.exports = {
  postArt,
  getArt,
  deleteArt,
  updateArt,
  getArtById,
};