import $ from 'jquery';
import { createSearchListMovieCard } from './modules/searchListMovieCard';
import { createPopMovieCard } from './modules/popMovieCard';
import { randomNumberGenerator, randomArrayItem } from './modules/randomNumber';

$('#search-field').on('keyup', (e)=>{
    e.preventDefault();
    let userInput = e.target.value;
    userInput = userInput.trim();
    userInput = userInput.replace(/\s\s+/g, ' ');
    generateSearchList(userInput);
})
$('#search-field').on('keypress', (e)=>{
    
    if (e.which === 13){
        e.preventDefault();
        let userInput = e.target.value;
        userInput = userInput.trim();
        userInput = userInput.replace(/\s\s+/g, ' ');
        generateSearchList(userInput);
    }
})
$('#search-field').on('focus', (e)=>{
    let userInput = e.target.value;
    userInput = userInput.trim();
    userInput = userInput.replace(/\s\s+/g, ' ');
    generateSearchList(userInput);
})

function generateSearchList(userInput){
    console.log(userInput);
    $('#search-list').html("");
    let request = $.ajax({
    method: "GET",
    url: `https://api.themoviedb.org/3/search/movie?api_key=779479719b2b6731a683844365cd9f0c&query=${userInput}&sort_by=popularity.desc`,
    });
    request.done(data => {
    console.log(data)  
    const movies = data.results;
    $('#search-list').show();
    $('.popMoviesSection').addClass('js-blur');
    movies.forEach(movie =>{
        $('#search-list').prepend(createSearchListMovieCard(movie));
    });
    
    
    $('.searchItem').on('click', (e)=>{
        let movieId = e.currentTarget.dataset.id;
        $('#search-list').slideUp();
        console.log(movieId);
        $.ajax({
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=779479719b2b6731a683844365cd9f0c&append_to_response=videos,images,credits`
        }).done(data=>{
            sessionStorage.setItem('data', JSON.stringify(data));
            location.href = 'movie.html';
        })
    })  
})
}

$('html').on('click', (e)=>{
    if (!e.target.classList.contains('searchItem') && !e.target.hasAttribute('id', 'search-field')){
        $('#search-list').slideUp();
        $('.popMoviesSection').removeClass('js-blur');
    }
})

$(function(){
    
    $.ajax({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=779479719b2b6731a683844365cd9f0c'
    }).done(data=>{
        $('#popular-movies').html(`<div class="spinner"></div>`);
        let movies = data.results;
        movies.forEach(movie=>{
            $('#popular-movies').prepend(createPopMovieCard(movie));
        })
        $('.popMovieCard').on('click', (e)=>{
            console.log(e.currentTarget);
            $.ajax({
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/${e.currentTarget.dataset.id}?api_key=779479719b2b6731a683844365cd9f0c&append_to_response=videos,images,credits`
            }).done(data=>{
                sessionStorage.setItem('data', JSON.stringify(data));
                location.href = 'movie.html';
            })
        })
    })
})


// get random movie
function getRandomMovie (){
    $.ajax({
        method: 'GET',
        url: `https://api.themoviedb.org/3/discover/movie?vote_average.gte=5.0&page=${randomNumberGenerator(1, 1000)}&api_key=779479719b2b6731a683844365cd9f0c`
    }).done(data=>{
        let randomMovie = randomArrayItem(data.results);
        $.ajax({
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${randomMovie.id}?api_key=779479719b2b6731a683844365cd9f0c&append_to_response=videos,images,credits`
        }).done(data=>{
            sessionStorage.setItem('data', JSON.stringify(data));
            location.href = 'movie.html';
        })
    })
}


// show the random movie div after certain time
function showRandomMovieDiv(){
    $('#random-movie').css('display', 'block');
}
setTimeout(showRandomMovieDiv, 15000);

// attach event handeler to the div
$('#random-movie').on('click', getRandomMovie);








// media query to show the movie overlay on scroll on smaller screens
const mq = window.matchMedia( "(max-width: 767px)" );
function mqHandeler (mq){
    if (mq.matches){
        $(document).on('scroll', function(e) {
            let y = $(document).scrollTop();
            $('.popMovieCard_overlay').each(function(){
                let t = $(this).parent().offset().top - 100;
                if (y>=t){
                    $(this).css({'opacity':'1'});
                    $(this).parent().addClass('js-shadowedCard');
                    $(this).children('h2').addClass('js-slidingTitle');
                    $(this).children('p').addClass('js-slidingText');
                    $(this).siblings('.popMovieCard_imageWrapper').addClass('js-grayscaledImage');
                } else{
                    $(this).css({'opacity':'0'})
                    $(this).parent().removeClass('js-shadowedCard');
                    $(this).children('h2').removeClass('js-slidingTitle');
                    $(this).children('p').removeClass('js-slidingText');
                    $(this).siblings('.popMovieCard_imageWrapper').removeClass('js-grayscaledImage');
                }
            })
        })
    }
}
mqHandeler(mq); //runs on page load
mq.addListener(mqHandeler); //runs when the page resized to match mq