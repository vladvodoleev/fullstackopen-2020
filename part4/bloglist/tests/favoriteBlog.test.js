const listHelpers = require("../utils/list_helper");
const helper = require("./test_helper");
const { blogs } = helper;

describe("favourite blog", () => {
  test("return post with most amount of likes", () => {
    expect(listHelpers.favoriteBlog(blogs)).toEqual(blogs[2]);
  });
});
