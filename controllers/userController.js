import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * @description Register a user
 * @rout POST /api/users/register
 * @access public
 */

// console.log("USER----------",  User.email);
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registerd");
  }
  // if not find any user that is create user for database
  //   client given a raw password we cant save the raw password in database that is
  //   need to hash your password

  //   how to use bcrypt
  // first we need to create hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hasedpassword-------", hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log("user created-----------", user);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
  res.status(200).json(contacts);
});

/**
 * @description Login user
 * @rout POST /api/users/register
 * @access public
 */

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  // comapre password with haspassword
  if (user && bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SCRET,
      { expiresIn: "20m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
  //   res.status(200).json({ message: "login  user" });
});

/**
 * @description current user info
 * @rout POST /api/users/current
 * @access private
 */

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
  res.status(200).json({ message: "current user info" });
});

// export default registerUser;

export { registerUser, loginUser, currentUser };
