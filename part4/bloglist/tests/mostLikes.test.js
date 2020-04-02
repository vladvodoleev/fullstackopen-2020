const listHelpers = require("../utils/list_helper");
const helper = require("./test_helper");
const { blogs } = helper;

describe("most blogs", () => {
  test("return author of most likes and amount of likes", () => {
    const expectedResult = {
      author: "Edsger W. Dijkstra",
      likes: 17
    };
    expect(listHelpers.mostLikes(blogs)).toEqual(expectedResult);
  });
});
