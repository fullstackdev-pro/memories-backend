const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {

      const token = req.headers.authorization.split(" ")[1];

      let decodedData;

      if (token) {
        decodedData = jwt.verify(token, "test");

        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.verify(token);

        req.userId = decodedData?.sub;
      }

      next();
    }
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

module.exports = auth;
