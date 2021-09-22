var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
// get config vars
dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if(token) {
    try {
      const parse = jwt.verify(token, process.env.TOKEN_SECRET)
      if(parse) {
        return next();
      } else {
        throw new Error('Failed token');
      }
    } catch {
      return res.status(401).redirect("/")
    }
  }
  return res.status(401).redirect("/")
}

/* GET welcome page. */
router.get('/', 
  verifyToken,
  function(req, res, next) {
    res.render('welcome');
  }
);

module.exports = router;