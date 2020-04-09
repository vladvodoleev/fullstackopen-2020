const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!request.token) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  if (!body.hasOwnProperty("likes")) {
    body.likes = 0;
  }

  if (!body.title && !body.url) {
    return response.status(400).json({ error: "title and url are missing"});
  } else {
    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    };
    const savedBlog = await new Blog(newBlog).save();
    const populatedBlog = await savedBlog.populate("user", { username: 1, name: 1 }).execPopulate();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(populatedBlog);
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    return response.status(401).json({ error: "token missing or invalid" });
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const body = request.body;

  try {
    const addedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
      new: true,
    }).populate("user", { username: 1, name: 1 });
    return response.json(addedBlog.toJSON());
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
