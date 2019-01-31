import $ from 'jquery';

//toggler
$('#toggler').on('click', (e)=>{
    $('#nav-menu').toggleClass('js-open');
    $('body').toggleClass('js-moveToRight');
    $('.brand').toggleClass('js-invisible');
})

// spinner
$(window).on('load', ()=>{
    $('.spinner').addClass('js-invisible');
    $('.spinner').on('transitionend', (e)=>{
        $('.spinner').css({'display':'none'})
    })
})