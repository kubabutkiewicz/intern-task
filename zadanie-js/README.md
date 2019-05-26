# Recuriment task

Open file index.html and use buttons

## Buttons functions

* Sort by upvotes - sort posts list by upvotes
* Sort by number of comments - sort posts by number of comments
* Sort by score - sort posts by score
* Sort by creation date - sort by creation date
* Show best post title - returns post title that have best upvotes to number of comments ratio
* Show posts from last 24h - it will show posts from last 24h

## Other functions

When page is loaded app fetch data from https://www.reddit.com/r/funny.json , after that it will convert the data to this structure:

```
{
"posts": [
    {
        "title": "put title here",
        "upvotes": 1234,
        "score": 1000,
        "num_comments": 100,
        "created": "16.05.2019 12:12",
    },
    ...
],
"count": 10
}
```

and will store data in state variable

## Test

To run test type in terminal

```
npm run test

```

## Technologies

* JS
* HTML
* SASS
* JEST
