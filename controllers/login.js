const users = require("../data/users").usersDB
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// get config vars
dotenv.config();

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET);
}

module.exports = async (req, res) => {
  try {
    let foundUser = users.find((data) => req.body.email === data.email);
    if(foundUser) {
      // If the user is found assign JWT token and redirect to the welcome page otherwise throw error.
      const doPasswordsMatch = await bcrypt.compare(req.body.password, foundUser.password);
      if(doPasswordsMatch) {
        return res.status(200).send({token: generateAccessToken({user: req.body.email})})
      } else {
        return res.status(401).send({message: "Incorrect Password"});
      }
    } else {
      return res.status(401).send({message: "Incorrect Email"});
    }
  } catch(err) {
    console.log("error: ", err);
    return res.status(500);
  }
}