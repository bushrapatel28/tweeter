$(document).ready(function() {
  const footerIcons = $('.footer-icons');
  const article = $('.tweets');

  footerIcons.on('mouseover', function(event) {
    const icon = event.target;
    $(icon).addClass("highlight");

    $(this).removeClass("highlight"); //Incase event.target is .footer-icons class (aside element)
    
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