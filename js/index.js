$(function(){

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
        // $('#search-list').slideDown( "slow" );
        $('#search-list').show();
        $('.pop-movies-container').addClass('blur');
        movies.forEach(movie =>{
            $('#search-list').prepend(getMovieCard(movie));
        });
        
        
        $('.search-item').on('click', (e)=>{
            // e.currentTarget refers to the element to which you attached the eventlistener, in this case <li>
            // e.target is more specific, in this case it can refer to <h3>, <p>, <img> or <li>
            let movieId = e.currentTarget.dataset.id;
            $('#search-list').slideUp();
            console.log(movieId);
            $.ajax({
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=779479719b2b6731a683844365cd9f0c&append_to_response=videos,images,credits`
            }).done(data=>{
                sessionStorage.setItem('data', JSON.stringify(data));
                location.href = 'movie-info.html';
            })
        })  
    })
}

function getMovieCard (item){
    return `<li class="search-item" data-id="${item.id}">
                <img class="search-item-img" src="https://image.tmdb.org/t/p/w500/${item.poster_path}" alt="movie poster">
                <div class="search-item-info">
                     <h3>${item.title}</h3>
                    <p>Release year: ${item.release_date.substring(0, 4)}</p>
                </div>
            </li>`
}


$('html').on('click', (e)=>{
    if (!e.target.classList.contains('search-item') && !e.target.hasAttribute('id', 'search-field')){
        $('#search-list').slideUp();
        $('.pop-movies-container').removeClass('blur');
    }
})

function popMovies (){
    $.ajax({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=779479719b2b6731a683844365cd9f0c'
    }).done(data=>{
        let movies = data.results;
        // let splicedMovies = movies.splice(10, movies.length-1);
        movies.forEach(movie=>{
            $('#popular-movies').prepend(createPopMovieCard(movie));
        })
        $('.container').on('click', (e)=>{
            console.log(e.currentTarget);
            $.ajax({
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/${e.currentTarget.dataset.id}?api_key=779479719b2b6731a683844365cd9f0c&append_to_response=videos,images,credits`
            }).done(data=>{
                sessionStorage.setItem('data', JSON.stringify(data));
                location.href = 'movie-info.html';
            })
        })
    })
}
popMovies();

function createPopMovieCard (movie){
    return `<div class="container" data-id="${movie.id}">
                <div class="img-wrapper"><img src="https://image.tmdb.org/t/p/original/${movie.poster_path}"></div>
                <div class="overlay">
                    <h2>${movie.title}</h2>
                    <p>Released in ${movie.release_date.substring(0, 4)}</p>
                    <p><i class="fas fa-star"></i> ${movie.vote_average}/10</p>
                </div>
            </div>`
}

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
            location.href = 'movie-info.html';
        })
    })
}
function randomNumberGenerator(min, max){
    let randomNum = Math.random() * (max-min) + min;
    return Math.floor(randomNum);
}
function randomArrayItem (arr){
    return arr[randomNumberGenerator(0, arr.length-1)];
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
function mqCode (mq){
    if (mq.matches){
        $(document).on('scroll', function(e) {
            let y = $(document).scrollTop();
            $('.overlay').each(function(){
                let t = $(this).parent().offset().top - 100; //-100
                if (y>=t){
                    $(this).css({'opacity':'1'});
                    $(this).parent().addClass('shadowed-container');
                    $(this).children('h2').addClass('sliding-header');
                    $(this).children('p').addClass('sliding-text');
                    $(this).siblings('.img-wrapper').addClass('grayscaled-img');
                } else{
                    $(this).css({'opacity':'0'})
                    $(this).parent().removeClass('shadowed-container');
                    $(this).children('h2').removeClass('sliding-header');
                    $(this).children('p').removeClass('sliding-text');
                    $(this).siblings('.img-wrapper').removeClass('grayscaled-img');
                }
            })
        })
    }
}
mqCode(mq); //runs on page load
mq.addListener(mqCode); //runs when the page resized to match mq


});