$(function(){


$('#toggler').on('click', (e)=>{
    $('#nav-menu').toggleClass('open');
    $('body').toggleClass('margin-left');
    $('.brand').toggleClass('invisible');
})

// service worker
if (navigator.serviceWorker.controller) {
    console.log('active service worker found, no need to register')
  } else {
    navigator.serviceWorker.register('../sw.js', {
      scope: './'
    }).then(function(reg) {
      console.log('Service worker has been registered for scope:'+ reg.scope);
    });
  }
  

});