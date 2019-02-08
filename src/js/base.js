import $ from 'jquery';

//toggler
$('#toggler').on('click', (e)=>{
    $('.sideMenu-wrapper').slideDown();
    $('#nav-menu').addClass('js-open');
    $('.brand').addClass('js-invisible');
});

//closing the side menu
$('.sideMenu-wrapper').on('click', (e)=>{
    if (!e.target.classList.contains('sideMenu')){
        $('.sideMenu-wrapper').slideUp();
        $('.sideMenu').removeClass('js-open');
        $('.brand').removeClass('js-invisible');
    }
    
});

// spinner
$(window).on('load', ()=>{
    $('.spinner').addClass('js-invisible');
    $('.spinner').on('transitionend', (e)=>{
        $('.spinner').css({'display':'none'})
    });
});