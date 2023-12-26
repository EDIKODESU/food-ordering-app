const jwt = require('jsonwebtoken');

const { StatusCodes } = require("http-status-codes");

const db = require("../models/db.js");
const config = require("../config.json");

const generateAccessToken = (id, clientname, email) => {
  const payload = {
    clientname,
    id,
    email,
    nanoIot: new Date().getMilliseconds(),
  };
  return jwt.sign(payload, config.jwt_secret_key, {
    expiresIn: config.jwt_access_token_life,
  });
};

const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwt_secret_key);
    return {
      decoded: decoded,
      error: null,
    };
  } catch (err) {
    return {
      decoded: null,
      error: err,
    };
  }
};

async function verifyToken(access_token, res) {
  let decodedAccess = decodeToken(access_token);
  if (decodedAccess.error) {
    if (decodedAccess.error.message !== "jwt expired") {
      console.log(
        `something strange with token ${decodedAccess.error.message}`
      );
      return null;
    }

    console.log("token is expired", { access_token});

    let accessToken = generateAccessToken(
      decodedRefresh.decoded.id,
      decodedRefresh.decoded.clientname,
      decodedRefresh.decoded.email
    );

    //kostyl not to use it in normal project)))
    res.cookie("access_token", accessToken);
  }

  console.log({decodedAccess: decodedAccess.decoded});
  let client = await db.client.findByPk(decodedAccess.decoded.id);
  if (client === null) {
    console.log("no client with such id");
    return null;
  }

  return client;
}
async function jwtMiddleware(req, res, next) {
  try {
    if (
      !req.get("Authorization") &&
      !req.cookies.access_token
    ) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "client is not authorized (empty header or cookies)",
      });
    }

    const token =
      req.get("Authorization")?.split(" ")[1] || req.cookies.access_token;

    let client = await verifyToken(token, res);
    if (client == null) {
      clearAuthCookies(res);
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Token is invalid",
      });
    }

    req.user = client;
    next();
  } catch (err) {
    console.log("jwt middleware", err);
    clearAuthCookies(res);
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "client is not authorized",
    });
  }
}

function clearAuthCookies(res) {
  res.clearCookie("access_token");
}

module.exports = {
  generateAccessToken,
  verifyToken,
  jwtMiddleware,
  decodeToken,
};