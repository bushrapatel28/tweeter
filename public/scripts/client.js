/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  //Create new tweet elements
  const createTweetElement = function(tweetObj) {
    const userData = tweetObj.user;
    const tweetContent = tweetObj.content;
    const date = tweetObj.created_at;
    
    //Create article element with class name of 'tweets'
    const $tweet = $(`<article class="tweets">
                        <header>
                          <section class="user">
                            <img src="${userData.avatars}" alt="Avatar">
                            <h3>${userData.name}</h3>
                          </section>
                          <aside>${userData.handle}</aside>
                        </header>
                        <section class="tweet-content">${tweetContent.text}</section>
                        <footer>
                          <time>${date}</time>
                          <aside class="footer-icons">
                            <i class="fa-solid fa-flag"></i>
                            <i class="fa-solid fa-retweet"></i>
                            <i class="fa-solid fa-heart"></i>
                          </aside>
                        </footer>
                      </article>`);
    return $tweet;
  };
  
  const renderTweets = function(tweetObjArr) {
    for(const element of tweetObjArr) {
      //Tweet Data returned by the function
      const $tweet = createTweetElement(element);
      
      //Add it to the page so we can make sure it's got all the right elements, classes, etc.
      $('#tweets-container').append($tweet);
    }
  }

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },

    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  renderTweets(data);
});