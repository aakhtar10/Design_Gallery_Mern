const { ArtModel } = require("../model/art.model");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {uploadImage} = require("./uploadImage");
cloudinary.config({ 
  cloud_name: 'dwetm19fr', 
  api_key: '276842751399855', 
  api_secret: 'ZauqP9k0AFc9PoLpEpK2_J_KVhw' 
});

// const postArt = async (req, res) => {
//   try {
//     if (req.role == "artist") {
//       const art = new ArtModel(req.body);
//       await art.save();
//       res.status(201).send(art);
//     } else {
//       res.status(400).send("Only artist can post art");
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Not able to create art");
//   }
// };
// const postArt = async (req, res) => {
//   try {
//     const multipleImage = uploadImage.uploadMultipleImages(req.body.artImage);
//     const uploadedImages = await multipleImage;
//     console.log(uploadedImages);


//     const newArt = new ArtModel({
//       artImage: uploadedImages,
//       artName: req.body.artName,
//       artCategory: req.body.artCategory,
//       artPrice: req.body.artPrice,
//       artDimension: req.body.artDimension,
//       created_at: req.body.created_at,
//     });

//     const savedArt = await newArt.save();
//     res.status(201).json(savedArt);
//   } catch (error) {
//     console.error("Error uploading images:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
const postArt = async (req, res) => {
  try {
    if (!req.files || !req.files.artImage) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    const files = req.files.artImage;
    const uploadedImages = await Promise.all(files.map(file => uploadImage(file.tempFilePath)));

    const newArt = new ArtModel({
      artImage: uploadedImages,
      artName: req.body.artName,
      artCategory: req.body.artCategory,
      artPrice: req.body.artPrice,
      artDimension: req.body.artDimension,
      created_at: req.body.created_at,
    });

    const savedArt = await newArt.save();
    res.status(201).json(savedArt);
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getArt = async (req, res) => {
  try {
    if (req.role=="artist") {
      const getArt = await ArtModel.find({ userID: req.body.userID });
      res.status(200).send(getArt);
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
    console.log("art-->", art);
    if (!art) {
      return res.status(404).send("Art not found");
    }
    console.log(art.userID, req.body.userID);
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
  try {
    const getArtById = await ArtModel.findById(id);
    res.status(200).send(getArtById);
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
