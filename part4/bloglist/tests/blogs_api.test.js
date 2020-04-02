const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");
const { blogs } = helper;

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = blogs.map(note => new Blog(note));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

test("all blogs are returned as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(response.body).toHaveLength(blogs.length);
});

test("id property of blog exists", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;
  expect(blogs[0].id).toBeDefined();
});

test("a new blog is added to the list", async () => {
  const testBlog = {
    title: "Random stuff",
    author: "Me",
    url: "https://randomstuff.com/",
    likes: 7
  };
  const postResponse = await api.post("/api/blogs").send(testBlog);
  const addedBlog = postResponse.body;

  expect(addedBlog.title).toBe(testBlog.title);
  expect(addedBlog.author).toBe(testBlog.author);
  expect(addedBlog.url).toBe(testBlog.url);
  expect(addedBlog.likes).toBe(testBlog.likes);

  const getResponse = await api.get("/api/blogs");

  expect(getResponse.body.length).toBe(blogs.length + 1);
});

test("if likes are missing from request, default value to 0", async () => {
  const likeslessBlog = {
    title: "Random stuff",
    author: "Me",
    url: "https://randomstuff.com/",
  };

  const postResponse = await api.post("/api/blogs").send(likeslessBlog);
  expect(postResponse.body.likes).toBeDefined();
  expect(postResponse.body.likes).toBe(0);
})

test("returns 400 error code when both url and title are missing", async () => {
  const testBlog = {
    author: "Me"
  };
  const response = await api.post("/api/blogs").send(testBlog);
  expect(response.status).toBe(400);
})

afterAll(() => {
  mongoose.connection.close();
});
