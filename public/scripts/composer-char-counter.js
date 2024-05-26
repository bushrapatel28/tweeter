$(document).ready(function() {
  const textArea = $('#tweet-text');

  textArea.on('input', function(event) {
    const length = $(this).val().length;        //Same as (textArea.val().length);

    //Traverse up the DOM tree to get the parent 'form' then locate child 'class="button-counter"' then look for its child 'class="counter"'
    const counterClass = $(this).parents('form').children('.button-counter').children('.counter');
    //Counter decreases for each char as it is added to the textarea input
    const counter = 140 - length;
    //counterClass updating with the value.
    counterClass.val(counter);

    //Add a new class to .counter for styling negative counter values.
    if (counter < 0) {
      $(counterClass).addClass("negative");
    } else {
      $(counterClass).removeClass("negative");
    }
  });
});