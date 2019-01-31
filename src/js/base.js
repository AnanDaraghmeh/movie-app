import $ from 'jquery';

//toggler
$('#toggler').on('click', (e)=>{
    $('#nav-menu').toggleClass('js-open');
    $('.brand').toggleClass('js-invisible');
});

//closing the side menu
$('html').on('click', (e)=>{
    if (!e.target.classList.contains('toggler') && !e.target.classList.contains('sideMenu') && !e.target.classList.contains('sideMenu_link')){
        $('.sideMenu').removeClass('js-open');
        $('.brand').toggleClass('js-invisible');
    }
});

// spinner
$(window).on('load', ()=>{
    $('.spinner').addClass('js-invisible');
    $('.spinner').on('transitionend', (e)=>{
        $('.spinner').css({'display':'none'})
    });
});