const listHelpers = require("../utils/list_helper");
const helper = require("./test_helper");
const { blogs } = helper;

describe("total likes", () => {
  test("of empty list is zero", () => {
    expect(listHelpers.totalLikes([])).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    expect(listHelpers.totalLikes([blogs[0]])).toBe(7);
  });

  test("of a bigger list calculated right", () => {
    expect(listHelpers.totalLikes(blogs)).toBe(36);
  });
});
