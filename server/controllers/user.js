import User from "../models/user.js";

export const register = async (req, res) => {
  // check if the user exists
  const user = await User.findOne({ username: req.body.username });
  console.log(user);
  if (user) {
    res.status(422).send("Username already taken");
  } else {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    return res.status(200).json(user);
  }
};

export const login = async (req, res) => {
  try {
    // check if the user exists
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      //check if password matches
      const result = req.body.password === user.password;
      if (result) {
        res.send("Logged in");
      } else {
        res.status(400).json({ error: "Please enter correct password" });
      }
    } else {
      res.status(400).json({ error: "Username doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default { register, login };
