const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let Token = req.headers["token"];

  jwt.verify(Token, "SecretKey123", (err, decoded) => {
    if (err) {
      res.status(401).json({ status: "Invalid Token", data: err });
    } else {
      let Email = decoded['data']['Email'];
      console.log(Email)
      req.headers.Email = Email;
      next();
    }
  });
};

