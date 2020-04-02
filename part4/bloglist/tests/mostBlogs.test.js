const listHelpers = require("../utils/list_helper");
const helper = require("./test_helper");
const { blogs } = helper;

describe("most blogs", () => {
  test("return author of most blogs and amount of blogs", () => {
    const expectedResult = {
      author: "Robert C. Martin",
      blogs: 3
    };
    expect(listHelpers.mostBlogs(blogs)).toEqual(expectedResult);
  });
});
