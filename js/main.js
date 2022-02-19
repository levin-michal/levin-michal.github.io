/*! ***********************************************
*************************************************** */

// create a media query list object.

// get this from the css root varialbles. 
var mql = window.matchMedia('(max-width: 820px)'); // Update also the css!
mql.addListener(screenTest);
let IS_TOUCH_DEVICE = isTouchDevice();
$(document).ready(function() {
  
  // Gallery Close
  $('.image-gallery .modal .close-button').click(function(event){
    let $modal = $(this).closest('.modal');
    let activeItem = $modal.data('active-item');
    $(this).closest('.image-gallery')
      .find('.items-container .gallery-item')
      .eq(activeItem)
      .find('.gallery-item-button')
      .focus();
    $modal.hide();
  });
  // Gallry Next
  $('.image-gallery .modal .nav-next').click(function(event){
    var $modal = $(this).closest('.modal');
    var $carouselContent = $modal.find('.carousel-content');
    var numerOfItems = $modal.find('.carousel-content .carousel-item').length;
    var activeItem = $modal.data('active-item');
    $carouselContent.css('transition', '300ms ease-in-out');
   
    if (activeItem < (numerOfItems - 1)) {
      activeItem++;
      $carouselContent.css('transform', `translateX(-${activeItem * 100}%)`);
    } else {
      activeItem = 0;
      $carouselContent.css('transform', '');
    }
    $modal.data('active-item', activeItem);
  });
  
  // Gallery Prev
  $('.image-gallery .modal .nav-prev').click(function(event){
    var $modal = $(this).closest('.modal');
    var $carouselContent = $modal.find('.carousel-content');
    var numerOfItems = $modal.find('.carousel-content .carousel-item').length;
    var activeItem = $modal.data('active-item');
    $carouselContent.css('transition', '300ms ease-in-out');
   
    if (activeItem === 0) {
      activeItem = numerOfItems - 1;
      $carouselContent.css('transform', `translateX(-${(numerOfItems - 1) * 100}%)`);
    } else {
      activeItem--;
      $carouselContent.css('transform', `translateX(-${activeItem * 100}%)`);
    }
    $modal.data('active-item', activeItem);
  });
  
  $('.image-gallery .gallery-item-button').click(function(event){
    // console.log('click');
    let $modal = $(this).closest('.image-gallery').find('.modal');
    let activeItem = $(this).closest('.gallery-item').index();
    $modal.data('active-item', activeItem);
    let $carouselContent = $modal.find('.carousel-content');
    
    $carouselContent.empty();
    
    $(this).closest('.image-gallery')
      .find('.items-container .gallery-item')
      .each(function(index, elem){
        let $elem = $(elem);
        let imgSrc = $elem.find('img').attr('src');
        let caption = $elem.find('.caption').text();
        $carouselContent.append($(`<div class="carousel-item">
                <div class="image" style="background-image: url(${imgSrc});"></div>
                <div class="caption">${caption}</div>
              </div>
        `));
      });
    
    
    
    $carouselContent.css('transition', 'none');
    $carouselContent.css('transform', `translateX(-${activeItem * 100}%)`);
    $modal.show();
    $modal.find('.nav-next').focus();
  });
  
  $('.image-gallery .modal').on('keydown', function(event){
    var $modal = $(this);
    
    if (event.key == 'Escape' || event.key == 'Esc') {
      // $modal.hide();
      $modal.find('.close-button').click();
		} else if(event.key == 'Right' || event.key == 'ArrowRight') {
      $modal.find('.nav-next').click();
		} else if(event.key == 'Left' || event.key == 'ArrowLeft') {
      $modal.find('.nav-prev').click();
    } else if(event.key == "Tab") {
      let ae = document.activeElement;
      if(event.shiftKey) {
        if(ae === $modal.find('.close-button button')[0]) {
          $modal.find('.nav-prev').focus();
          event.preventDefault();
        }
      } else {
        if(ae === $modal.find('.nav-prev')[0]) {
          $modal.find('.close-button button').focus();
          event.preventDefault();
        }
      }
      
    }
  });
  
  
  screenTest(mql);
});
// end of document.ready();

function screenTest(e) {
  var $navMenu = $('#nav-menu');
  $navMenu.removeClass();
  
  if (e.matches) {
    console.log("small screen");
    /* the viewport is 992 pixels wide or less */
    
  } else {
    console.log("big screen")
    /* the viewport is more than than 992 pixels wide */
  }
}

function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
}
