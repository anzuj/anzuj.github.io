/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */

particlesJS.load('particles-js', 'assets/particles.json', function () {
  console.log('callback - particles.js config loaded');
});



// $(".menu-toggler").hover(function() {
//   $(".bar").css("background-color", "#9d33b");
// }, function() {
//   $(".bar").css("background-color", "rgb(107, 184, 180)");
// });


$(document).ready(function () {

  // unsure why showing extra text does not work :(
  $(".expandDetails").on("click", function () {

   $(".portfolio-long").slideToggle(500);
    // $(".portfolio-long").toggle();
    $(".arrowDown").toggle();
    $(".arrowUp").toggle();
    
  });
  

  $('.menu-toggler').hover(function(){$(".bar").toggleClass('bar-hover');});

  $(".menu-toggler").on("click", function () {
    $(this).toggleClass("open");
    $(".top-nav").toggleClass("open");
  });

  $(".top-nav .nav-link").on("click", function () {
    $(".menu-toggler").removeClass("open");
    $(".top-nav").removeClass("open");
  });

  $('nav a[href*="#"]', "#landingBtn a").on("click", function () {
 $("html, body").animate({
scrollTop: $($(this).attr("href")).offset().top
 }, 1000);
  });

  $("#up").on("click", function () {
    $("html, body").animate({
      scrollTop: 0
       }, 1000); 
  });

  AOS.init({
    easing: "ease",
    duration: 1400,
    once: true
  })


});









// type effect source from: https://codepen.io/bradtraversy/pen/jeNjwP
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 150;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 150;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}


// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}
