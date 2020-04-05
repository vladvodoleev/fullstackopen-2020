const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response, next) => {
  const body = request.body;

  if (body.password.length < 3) {
    return response
      .status(400)
      .json({ error: "password should have 3 or more characters" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.json(savedUser);
  } catch(error) {
    next(error)
  }
   
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users.map((u) => u.toJSON()));
});

module.exports = usersRouter;
