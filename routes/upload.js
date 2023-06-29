const axios = require("axios");
const BodyForm = require("form-data");
const Router = require("express").Router();

Router.post("/upload", async (req, res) => {
  if (!req.files) {
    res.status(500).json({
      upload: false,
      msg: "pleas select an image to upload",
    });
    return;
  }

  const img = req.files.file;
  const form = new BodyForm();

  form.append("file", img.data, {
    filename: img.name,
    contentType: img.mimetype,
    knownLength: img.size,
  });

  try {
    const data = await axios({
      url: "https://telegra.ph/upload",
      method: "POST",
      headers: {
        ...form.getHeaders(),
      },
      data: form,
    });

    res.status(200).json({
      upload: true,
      msg: "upload succefully",
      imgUrl: "https://telegra.ph" + data.data[0].src,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      upload: false,
      msg: "Error uploading file",
    });
  }
});

module.exports = Router;

// axios({
//   url: "https://telegra.ph/upload",
//   method: "POST",
//   headers: {
//     ...form.getHeaders(),
//   },
//   data: form,
// });
