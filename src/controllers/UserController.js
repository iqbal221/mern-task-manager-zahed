const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

// Registration
exports.UserRegistration = (req, res) => {
  let reqBody = req.body;

  UserModel.create(reqBody, (err, data) => {
    if (err) {
      res.status(200).json({ status: "failed", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

// UserLogin
exports.UserLogin = (req, res) => {
  let reqBody = req.body;

  UserModel.aggregate(
    [
      { $match: reqBody },
      {
        $project: {
          _id: 0,
          Email: 1,
          FirstName: 1,
          LastName: 1,
          Mobile: 1,
          Photo: 1,
        },
      },
    ],
    (err, data) => {
      if (err) {
        res.status(400).json({ status: "failed", data: err });
      } else {
        if (data.length > 0) {
          let PayLoad = {
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            data: data[0],
          };
          let token = jwt.sign(PayLoad, "SecretKey123");
          console.log(data);
          res
            .status(200)
            .json({ status: "success", token: token, data: data[0] });
        } else {
          res.status(404).json({ status: "Unauthorized" });
        }
      }
    }
  );
};

// User Profile Update

exports.ProfileUpdate = (req, res) => {
  let Email = req.headers["Email"];
  // let Query = ;
  let reqBody = req.body;

  UserModel.updateOne({ Email: Email }, reqBody, (err, data) => {
    if (err) {
      res.status(400).json({ status: "failed", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

// profile details

exports.ProfileDetails = (req, res) => {
  let Email = req.headers["Email"];
  UserModel.aggregate(
    [
      { $match: { Email: Email } },
      {
        $project: {
          _id: 1,
          Email: 1,
          FirstName: 1,
          LastName: 1,
          Mobile: 1,
          Photo: 1,
          Password: 1,
        },
      },
    ],
    (err, data) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err });
      } else {
        res.status(200).json({ status: "success", data: data });
      }
    }
  );
};
