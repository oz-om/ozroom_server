const { updateProfile } = require("../models/user_model");
exports.updateProfile = (req, res) => {
  const updates = {
    id: req.userInfo.id,
    ...req.body,
  };

  updateProfile(updates)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
