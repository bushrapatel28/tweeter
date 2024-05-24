/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  //Hide the error upon form load
  $(".error-message").hide(0);

  //Form 'submit' Event Handler
  $('form').on('submit', function(event) {
    //Prevent the default form submission behaviour
    event.preventDefault();
    const tweetMessage = $(this).children("#tweet-text").val().trim();     //trim() to remove any whitespaces before or after the text in the textarear
    
    //Hide the error upon submission and before validation
    $(".error-message").slideUp(0);
    
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
      //Show the error for Invalid tweets with a slide down animation
      $(".error-message").text("⚠️ Please give words to your Tweet. Tweet content cannot be Empty!").slideDown(500);
      return false;
    }
    if (tweetText.length > 140) {              //Validation for max text length
      //Show the error for Invalid tweets with a slide down animation
      $(".error-message").text("⚠️ Too long. Please be more concise and limit your Tweet to 140 chars.").slideDown(500);
      return false;
    }
    //Hide the error for Valid tweets
    //$(".error-message").hide(0);
    return true;
  }

  //Create new tweet elements
  const createTweetElement = function(tweetObj) {
    const userData = tweetObj.user;
    const tweetContent = tweetObj.content;
    const timeAgo = timeago.format(tweetObj.created_at);      //timeago.format() to display the time passed since a Tweet
    
    //Preventing XSS with Escaping (using .text())
    let $tweet = $("<article class='tweets'>");           //Create article element with class tweets
    let $section = $("<section class='user'>");           //Create section element with class user
    let $aside = $("<aside>").text(userData.handle);      //Create aside element with text which has escaped unsafe characters from the untrusted text (userData.handle)                 
    const img = $("<img alt='Avatars'>").attr('src', userData.avatars);       //Create img element and assign src attribute value which has escaped unsafe characters from the untrusted text (userData.avatars)          
    
    $section.append(img, $("<h3>").text(userData.name));              //Create h3 element with text which has escaped unsafe characters from the untrusted text (userData.name); then append img and h3 elements to the section element
    const $header = $("<header>").append($section, $aside);           //Create header element and append section and aside elements to it
    
    $section = $("<section class='tweet-content'>").text(tweetContent.text);    //Create section element with class tweet-content then add text which has escaped unsafe characters from the untrusted text (tweetContent.text)
    $aside = $("<aside class='footer-icons'>").append($("<i class='fa-solid fa-flag'>"), $("<i class='fa-solid fa-retweet'>"), $("<i class='fa-solid fa-heart'>"));       //Create aside element and append the i elements (footer icons) to it
    const $footer = $("<footer>").append($("<time>").text(timeAgo), $aside);    //Create footer element and append time with text which has escaped unsafe characters from the untrusted text (timeAgo), and aside elements to it
    
    $tweet = $tweet.append($header).append($section).append($footer);           //Append all the chilren to the parent

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
        //Clear the tweets-container to avoid duplicate contents
        $('#tweets-container').empty();
        //Render the JSON data into the page
        renderTweets(response);
      }
    })
  }
  //Load tweets upon page load
  loadTweets();
});