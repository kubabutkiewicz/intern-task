const API_URL = "https://www.reddit.com/r/funny.json";
import {
  currentDateAndTime,
  convertToDateTime,
  convertToTimestamp
} from "./dateTimeManipulation.js";
let state = {
  posts: [],
  count: null
};
const sortByUpvotesBtn = document.getElementById("upvotes-btn");
const sortByNumCommentsBtn = document.getElementById("num-comments-btn");
const sortByScoreBtn = document.getElementById("score-btn");
const sortByCreatedBtn = document.getElementById("created-btn");
const sortByBestRatio = document.getElementById("best-ratio");
const lastDayBtn = document.getElementById("last-day");

const fetchData = async () => {
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
};

const structureData = async () => {
  const data = await fetchData();
  const dataArray = await data.data.children.map(item => {
    const timestampToDate = convertToDateTime(item.data.created_utc);
    const itemObj = {
      title: item.data.title,
      upvotes: item.data.ups,
      score: item.data.score,
      num_comments: item.data.num_comments,
      created: timestampToDate
    };
    return itemObj;
  });
  state = {
    posts: dataArray,
    count: dataArray.length
  };
  return {
    posts: dataArray,
    count: dataArray.length
  };
};

const sortArray = (sortPointer, arr) => {
  const sortedArr = arr.sort((a, b) => {
    if (a[sortPointer] < b[sortPointer]) {
      return 1;
    } else {
      return -1;
    }
  });

  return sortedArr;
};

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
const findPostsFromLastDay = arr => {
  const filterPosts = arr.filter(post => {
    const timestamp =
      (convertToTimestamp(currentDateAndTime()) -
        convertToTimestamp(post.created)) *
      1000;
    const timestampToHours = timestamp / 3600000;
    return timestampToHours <= 24;
  });
  return filterPosts;
};

const createList = arr => {
  const list = document.getElementById("list");
  arr.map(post => {
    const li = document.createElement("li");
    li.classList.add("list__post");
    for (let prop in post) {
      if (post.hasOwnProperty(prop)) {
        const p = document.createElement("p");
        p.textContent = `${prop}: ${post[prop]}`;
        li.appendChild(p);
      }
    }
    list.appendChild(li);
  });
};

const clearList = () => {
  const list = document.getElementById("list");
  list.innerHTML = "";
};

window.addEventListener("DOMContentLoaded", () => {
  structureData().then(data => createList(data.posts));
});

sortByUpvotesBtn.addEventListener("click", () => {
  clearList();
  createList(sortArray("upvotes", state.posts));
});
sortByNumCommentsBtn.addEventListener("click", () => {
  clearList();
  createList(sortArray("num_comments", state.posts));
});

sortByScoreBtn.addEventListener("click", () => {
  clearList();
  createList(sortArray("score", state.posts));
});

sortByCreatedBtn.addEventListener("click", () => {
  clearList();
  createList(sortArray("created", state.posts));
});

sortByBestRatio.addEventListener("click", () => {
  clearList();
  const bestRatioTitle = findBestRatio(state.posts);
  const h1 = document.createElement("h1");
  h1.classList.add("best-title");
  h1.textContent = bestRatioTitle;
  list.appendChild(h1);
});

lastDayBtn.addEventListener("click", () => {
  clearList();
  createList(findPostsFromLastDay(state.posts));
});
