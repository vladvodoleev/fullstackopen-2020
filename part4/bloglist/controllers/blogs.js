const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const users = await User.find({});
  const firstUser = users[0];

  if (!body.hasOwnProperty("likes")) {
    body.likes = 0;
  }

  if (!body.hasOwnProperty("title") && !body.hasOwnProperty("url")) {
    response.status(400).end();
  } else {
    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: firstUser._id,
    };
    const savedBlog = await new Blog(newBlog).save();
    firstUser.blogs = firstUser.blogs.concat(savedBlog._id);
    await firstUser.save();

    response.status(201).json(savedBlog);
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  try {
    const addedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
      new: true,
    });
    response.json(addedBlog.toJSON());
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
