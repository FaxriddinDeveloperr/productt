import { User } from "../models/index.js";
export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const [username, password] = Buffer.from(token, "base64")
    .toString()
    .split(":");
  console.log(token);

  const user = await User.findOne({ email: username });

  if (!user) {
    res.status(401).send("User detail wrong.");
  }

  if (
    username &&
    password &&
    user.password === password &&
    user.email === username
  ) {
    req.user = user;
    next();
    return;
  }

  return res.status(404).send("User detail wrong");
};
