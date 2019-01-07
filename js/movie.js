$(function(){

// back button
$('#back').on('click', ()=>{
    history.back();
})

$(function(){
    let watchList = [];
    if (JSON.parse(localStorage.getItem('watchList')) !== null){
        watchList = JSON.parse(localStorage.getItem('watchList'));
    }
    
    let data = JSON.parse(sessionStorage.getItem('data'));
    $('#details-page').html(getDetailedMovie(data));
    if (watchList.includes(data.id)){
        $('#fav').text('Added to watchlist').attr('disabled','').css('cursor', 'default');
    }
    $('#fav').on('click', (e)=>{
         if (!watchList.includes(data.id)){
             watchList.push(data.id);
             localStorage.setItem('watchList', JSON.stringify(watchList));
         }
         $('#fav').text('Added to watchlist').attr('disabled','').css('cursor', 'default');
         $('.msg-added').show();
    })
    $('.actor').on('click', (e)=>{
        $.ajax({
            method: 'GET',
            url: `https://api.themoviedb.org/3/person/${e.currentTarget.dataset.actorid}?api_key=779479719b2b6731a683844365cd9f0c&append_to_response=movie_credits`
        }).done(actorData=>{
            $('.actor-overlay-wrapper').fadeIn();
            $('#actor-overlay').html(createActorOverlay(actorData));
            $('#close-btn').on('click', ()=>{
                $('.actor-overlay-wrapper').fadeOut();
            })
        })
    })
});


function getDetailedMovie (item){
    
    return `
    <div class="movie-intro">
        <div class="movie-header"><h1 class="movie-title">${item.title}</h1><span class="movie-rating"><i class="fas fa-star"></i> ${item.vote_average}</span><span class="movie-runtime"><i class="fas fa-video"></i> ${item.runtime} minutes</span></div>
        <h2 class="movie-tagline">${item.tagline}</h2>
        <img class="movie-poster" src="https://image.tmdb.org/t/p/original/${item.poster_path}" alt="movie poster">
        <san>${hasYoutubeTrailer(item.videos.results[0])}</san>
    </div>
    <div>
        <p class="movie-overview">${item.overview}</p>
        <p>${getCast(item.credits.cast)}</p>
        <span>${hasDirector(item.credits.crew[0])}</span>
        <p class="movie-genres"><strong>Geners: </strong>${getGenres(item.genres)}</p>
        <p class="movie-date"><strong>Release Date: </strong>${item.release_date}</p>
        <p class="movie-lang"><strong>Languages: </strong> ${getLanguages(item.spoken_languages)}</p>
        <p class="movie-adult">${isAdultRated(item.adult)}</p>
        <p class="movie-homepage">${hasHomepage(item.homepage)}</p>
        <button id="fav">Add to Watchlist</button>
    </div>
    `
}
function getGenres (genres){
    let newGenres = genres.map(genre => '<span> ' + genre.name + '</span>');
    return newGenres;
 }
 function getLanguages (languages){
     let newLang = languages.map(language => '<span> ' + language.name + '</span>');
     return newLang;
  }
 
 function isAdultRated (adult){
     if (adult === true){
         return `<strong>Adult content: </strong>Yes`;
     } else {
         return `<strong>Adult content: </strong>No`;
     }
 }
 
 function hasHomepage (homepage){
     if (homepage !== null){
         return `<a href="${homepage}" target="_blank">To the movie homepage</a>`
     } else {
         return '';
     }
 }
 function hasYoutubeTrailer(arr){
     if (arr != undefined){
         return `<a class="youtube-link" target="_blank" href="https://www.youtube.com/watch?v=${arr.key}">Watch trailer on Youtube <i class="fab fa-youtube"></i></a>`
 
     } else{
         return '';
     }
 }
 
 function hasDirector (arr){
     if (arr != undefined){
         return `<p class="movie-direc"><strong>Director: </strong>${arr.name}</p>`
     } else {
         return `<p class="movie-direc"><strong>Director: </strong>No data available</p>`
     }
 }
 
 function getCast (arr){
     let actor1 = arr[0];
     let actor2 = arr[1];
     let actor3 = arr[2];
     if (actor1 == undefined || actor2 == undefined || actor3 == undefined){
         return '';
     }
     return `<div class="movie-cast-wrapper">
                 <p>Top cast:</p>
                 <div class="movie-cast">
                     <div class="actor" data-actorid="${actor1.id}">
                         <img class="actor-img" src="https://image.tmdb.org/t/p/w500/${actor1.profile_path}" alt="actor poster">
                         <h5>${actor1.name}</h5>
                         <h5><em>"${actor1.character}"</em></h5>
                      </div>
                      <div class="actor" data-actorid="${actor2.id}">
                         <img class="actor-img" src="https://image.tmdb.org/t/p/w500/${actor2.profile_path}" alt="actor poster">
                         <h5>${actor2.name}</h5>
                         <h5><em>"${actor2.character}"</em></h5>
                      </div>
                      <div class="actor" data-actorid="${actor3.id}">
                         <img class="actor-img" src="https://image.tmdb.org/t/p/w500/${actor3.profile_path}" alt="actor poster">
                         <h5>${actor3.name}</h5>
                         <h5><em>"${actor3.character}"</em></h5>
                      </div>
                  </div>
             </div>`
 }
 
 function createActorOverlay (actorData) {
     return `
             <h3>${actorData.name} <span id="close-btn"><i class="fas fa-times-circle"></i></span></h3>
             <p>Date of birth: <strong>${actorData.birthday}</strong></p>
             <p>Place of birth: <strong>${actorData.place_of_birth}</strong></p>
             <div>${createActorTopMovies(actorData.movie_credits.cast)}</div>
     `
 }
 function createActorTopMovies (moviesArr){
   let movie1 = moviesArr[0];
   let movie2 = moviesArr[1];
   let movie3 = moviesArr[2];
   return `<div>
                 <p>Top characters:</p>
                 <div class="top-movies-wrapper">
                     <div class="top-movie">
                         <img class="actor-img" src="https://image.tmdb.org/t/p/w500/${movie1.poster_path}" alt="actor poster">
                         <div>
                             <h5><em>"${movie1.character}"</em></h5>
                             <h5>${movie1.title}</h5>  
                         </div>
                      </div>
                      <div class="top-movie">
                         <img class="actor-img" src="https://image.tmdb.org/t/p/w500/${movie2.poster_path}" alt="actor poster">
                         <div>
                             <h5><em>"${movie2.character}"</em></h5>
                             <h5>${movie2.title}</h5>
                         </div>
                      </div>
                      <div class="top-movie">
                         <img class="actor-img" src="https://image.tmdb.org/t/p/w500/${movie3.poster_path}" alt="actor poster">
                         <div>
                             <h5><em>"${movie3.character}"</em></h5>
                             <h5>${movie3.title}</h5>
                          </div>
                      </div>
                 </div>  
             </div>`
 }


});

// spinner
$(window).on('load', ()=>{
    $('.spinner').addClass('hide');
    $('.spinner').on('transitionend', (e)=>{
        $('.spinner').css({'display':'none'})
    })
})