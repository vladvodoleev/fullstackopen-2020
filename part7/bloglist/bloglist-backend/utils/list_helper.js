const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0);
};

const favoriteBlog = blogs => {
  return blogs.reduce((acc, blog) => (blog.likes > acc.likes ? blog : acc));
};

const mostBlogs = blogs => {
  const count = {};
  const result = {
    author: "",
    blogs: 0
  };
  blogs.forEach(blog => {
    const { author } = blog;
    count[author] = count[author] || 0;
    count[author]++;
    if (count[author] > result.blogs) {
      result.author = author;
      result.blogs = count[author];
    }
  });
  return result;
};

const mostLikes = blogs => {
  const count = {};
  const result = {
    author: "",
    likes: 0
  };
  blogs.forEach(blog => {
    const { author, likes } = blog;
    count[author] = count[author] || 0;
    count[author] += likes;
    if (count[author] > result.likes) {
      result.author = author;
      result.likes = count[author];
    }
  });
  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
