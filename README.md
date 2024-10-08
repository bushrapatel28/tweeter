# Tweeter Project

Tweeter is a simple, single-page AJAX-based Twitter clone that uses jQuery, HTML5 and CSS3. 

## Final Product

!["screenshot of page layout - 1024px wide screen"](https://github.com/bushrapatel28/tweeter/blob/main/docs/Page%20Layout%20in%201024px%20wide%20screen.png)

!["screenshot of page layout - less than 1024px wide screen"](https://github.com/bushrapatel28/tweeter/blob/main/docs/Page%20Layout%20in%20less%20than%201024px%20wide%20screen.png)

!["screenshot of fixed nav bar at the top of the page"](https://github.com/bushrapatel28/tweeter/blob/main/docs/Navbar%20fixed%20to%20the%20top%20of%20the%20page.png)

!["screenshot of counter value change"](https://github.com/bushrapatel28/tweeter/blob/main/docs/Counter%20value%20change%20when%20text%20added%20to%20the%20text-area.png)

!["screenshot of newer tweets show at the top"](https://github.com/bushrapatel28/tweeter/blob/main/docs/Newer%20tweets%20show%20at%20the%20top.png)

!["screenshot of tweet icons highlight upon hover"](https://github.com/bushrapatel28/tweeter/blob/main/docs/Tweet%20icons%20highlight%20upon%20hover.png)

!["screenshot of error when tweet content is empty"](https://github.com/bushrapatel28/tweeter/blob/main/docs/Error%20on%20submit%20when%20tweet%20content%20is%20empty.png)

!["screenshot of error when tweet exceeds character limit"](https://github.com/bushrapatel28/tweeter/blob/main/docs/Error%20when%20tweet%20exceeds%20character%20limit.png)

!["screenshot of error disappears upon successful tweet post"](https://github.com/bushrapatel28/tweeter/blob/main/docs/Error%20disappears%20upon%20successful%20tweet%20post.png)


## Dependencies

- Express
- Node 5.10.x or above
- Body-parser
- Chance
- md5

## Getting Started

1. Install dependencies using the `npm install` command.
2. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
3. Go to <http://localhost:8080/> in your browser.

## Features

- Permits User to create short posts of up to 140 characters and have them append to the main page. 
- Posts are sequential, with the most recent posts appearing at the top of the page.
- Tweeter fetches a list of posts from a simplified ‘server’ (pre-built) and allows users to add posts to this list dynamically. 
- All the requests are made asynchronously, using the jQuery library to make these requests.
- New tweets show on the page as soon as they are posted, without having to refresh the page.

## Additional Features

- Well-structured, maintainable, accessible and semantic HTML/CSS code.
- The navigation bar is fixed to the top of the page.
- Icons of the tweet are highlighted upon mouse hover.
- Responsive Web Design with the help of Media Queries.

## Documentation

### Stylesheets

- [x] `layout.css`
- [x] `nav.css`
- [x] `header.css`
- [x] `new-tweet.css`
- [x] `tweet.css`

### Client Side

#### Index.html

- HTML for web page:
  - `<head>`: Includes meta information, title, external css vendors, external font links, internal css links, external and internal scripts.
  - `<body>`: Includes `<nav>`, `<header>` and `<main>` elements and their child elements for the web page.

#### Scripts

- `composer-char-counter.js`: 
  * Responsible for changing the counter value on keyboard 'input' event: Event is triggered when there is a keyboard character 'input' in the textarea for a new tweet. The event handler then gets the length of the text (using jQuery), after which, the event handler traverses the DOM to get the counter node. The text length is subtracted from the default value of 140 and the result is set as the new value for the counter node.

- `client.js`:
  * Responsible for rendering the new tweet into the web page on form 'submit' event: Event is triggered when the button is clicked to 'submit' a new tweet. The event handler prevents the default behavior of the form submission. Any previous error messages are hidden from the page and an AJAX request is made to post a 'valid' tweet to the server. After a successful post, an AJAX request is made to get the tweet data in JSON format and then the tweet is added to the web page.

#### Helper Functions

- `isTweetValid(tweetText)`: Makes validation checks for the textarea content (tweet content). Displays seperate error messages on the web page if the textarea content is empty/null OR if the text exceeds the max character limit of 140 and returns false. Returns true if textarea content passes the validation checks.

- `loadTweets()`: Makes an AJAX GET request to the `/tweets` route to receive the tweets data in JSON format. The tweets container is emptied upon success and the `renderTweets(response)` function is called by passing the tweet data (response) to it, to load new tweets.

- `renderTweets(tweetObjArr)`: Iterates the array of tweet objects (JSON). The `createTweetElement(element)` function is called by passing the each tweet object to it. The returned value of `createTweetElement(element)` function is then prepended to the tweets container.

- `createTweetElement(tweetObj)`: Retrieves the user data and tweet info from the tweet object. Creates html elements using jQuery and adds the retrieved data to them to create new tweet elements. Cross-site scripting is also prevented using jQuery. Returns the entire newly created tweet element.
