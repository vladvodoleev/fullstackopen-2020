const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.hasOwnProperty("likes")) {
    body.likes = 0;
  }

  if (!body.hasOwnProperty("title") && !body.hasOwnProperty("url")) {
    response.status(400).end();
  } else {
    const blog = await new Blog(body).save();
    response.status(201).json(blog);
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  try {
    const addedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true});
    response.json(addedBlog.toJSON())
  } catch(error) {
    next(error)
  }
  
})

module.exports = blogsRouter;
