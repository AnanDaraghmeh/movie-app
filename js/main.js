$(function(){


$('#toggler').on('click', (e)=>{
    $('#nav-menu').toggleClass('open');
    $('body').toggleClass('margin-left');
    $('.brand').toggleClass('invisible');
})

// service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
  
});