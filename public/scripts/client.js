/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  //Form 'submit' Event Handler
  $('form').on('submit', function(event) {
    //Prevent the default form submission behaviour
    event.preventDefault();
    const tweetMessage = $(this).children("#tweet-text").val().trim();     //trim() to remove any whitespaces before or after the text in the textarear
    
    if(isTweetValid(tweetMessage)) {
      //Convert (serialize) the form data into jQuery String
      const serData = $(this).serialize();
      //jQuery AJAX Post Request (xhr); same as $.post("/tweets", serData);
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: serData,       //serialized data sent to server
        success: function(response) {
          loadTweets();             //Load the newly added tweet
          event.target.reset();     //Clear form after successful submit
        }
      });
    }
  });

  //Validation checks
  const isTweetValid = function(tweetText) {
    if (tweetText === "" || tweetText === null) {     //Validation for empty or null text value
      alert("Tweet content Cannot be Empty!");
      return false;
    }
    
    if (tweetText.length > 140) {              //Validation for max text length
      alert("Tweet content is too long!");
      return false;
    }
    return true;
  }

  //Create new tweet elements
  const createTweetElement = function(tweetObj) {
    const userData = tweetObj.user;
    const tweetContent = tweetObj.content;
    const timeAgo = timeago.format(tweetObj.created_at);      //timeago.format() to display the time passed since a Tweet

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
                          <time>${timeAgo}</time>
                          <aside class="footer-icons">
                            <i class="fa-solid fa-flag"></i>
                            <i class="fa-solid fa-retweet"></i>
                            <i class="fa-solid fa-heart"></i>
                          </aside>
                        </footer>
                      </article>`);
    return $tweet;
  };

  //Calls createTweetElement for each tweet and takes its return value then appends the value to the tweets container
  const renderTweets = function(tweetObjArr) {
    for (const element of tweetObjArr) {
      //Tweet Data returned by the function
      const $tweet = createTweetElement(element);

      //Add it to the page so we can make sure it's got all the right elements, classes, etc.
      $('#tweets-container').prepend($tweet);
    }
  }

  //Makes a jQuery Ajax Get request to load the tweets as JSON
  const loadTweets = function() {
    //jQuery AJAX Get Request (xhr); same as $.get("/tweets", function(response) { renderTweets(response); });
    $.ajax({
      url: '/tweets',
      type: 'GET',
      dataType: 'json',
      //Success Callback to call renderTweets by passing the response from the AJAX request``
      success: function(response) {
        //Render the JSON data into the page
        renderTweets(response);
      }
    })
  }
  //Load tweets upon page load
  loadTweets();
});