/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const footerIcons = $('#footer-icons');
  const article = $('.tweets');

  footerIcons.on('mouseover', function(event) {
    const icon = event.target;
    $(icon).addClass("highlight");

    $(icon).on('mouseleave', function(event) {
      $(this).removeClass("highlight");
    });
  });

  article.on('mouseover', function(event) {
    const box = event.currentTarget;
    $(box).addClass("shadow");

    $(box).on('mouseleave', function(event) {
      $(this).removeClass("shadow");
    });
  });

});