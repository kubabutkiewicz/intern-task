const arr = [
  {
    title: "first",
    upvotes: 41395,
    num_comments: 648,
    created: "26.05.2019 13:54"
  },
  {
    title: "second",
    upvotes: 426,
    num_comments: 9,
    created: "24.05.2019 13:54"
  },
  {
    title: "third",
    upvotes: 954,
    num_comments: 20,
    created: "25.05.2019 13:54"
  }
];
const findBestRatio = arr => {
  const sortByRatio = arr.sort((a, b) => {
    if (a["upvotes"] / a["num_comments"] < b["upvotes"] / b["num_comments"]) {
      if (a["created"] < b["created"]) {
        return 1;
      }
    } else {
      return -1;
    }
  });
  return sortByRatio[0].title;
};
it("Should return a post with best ratio upvotes to comments", () => {
  expect(findBestRatio(arr)).toBe("first");
});
