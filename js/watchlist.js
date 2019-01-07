$(function(){


function watchlistMovies (){
    if(localStorage.getItem('watchList') !== null){
        watchList = JSON.parse(localStorage.getItem('watchList'));
        if(watchList.length > 0){
            $('.empty-msg').css({'display':'none'});
            watchList.forEach(item=>{
                $.ajax({
                    method: 'GET',
                    url: `https://api.themoviedb.org/3/movie/${item}?api_key=779479719b2b6731a683844365cd9f0c&append_to_response=videos,images,credits`
                }).done(data=>{
                    $('.empty-msg').hide();
                    $('.watchlist').prepend(createWatchlistMovie(data));
                    $('#remove-btn').on('click', (e)=>{
                        let itemToRemove = parseInt(e.target.dataset.movieid);
                        let index = watchList.indexOf(itemToRemove);
                        watchList.splice(index, 1);
                        localStorage.setItem('watchList', JSON.stringify(watchList));
                        e.target.parentElement.parentElement.classList.add('remove');
                        e.target.parentElement.parentElement.addEventListener('transitionend', ()=>{
                            e.target.parentElement.parentElement.remove();
                        })
                        if(watchList.length < 1){
                            $('.empty-msg').css({'display':'block'});
                        }
                    })
                    $('#show-details').on('click', (e)=>{
                        $.ajax({
                            method: 'GET',
                            url: `https://api.themoviedb.org/3/movie/${e.target.dataset.movieid}?api_key=779479719b2b6731a683844365cd9f0c&append_to_response=videos,images,credits`
                        }).done(data=>{
                            let el = document.createElement('div');
                            el.setAttribute('id', 'details-page');
                            el.classList.add('watchlist-details-page');
                            el.innerHTML = getDetailedMovieInWatchlist(data);
                            $(e.target.parentElement.parentElement).after(el);
                            $('#close-btn').on('click',(e)=>{
                                $('.watchlist-details-page').addClass('remove');
                                $('.watchlist-details-page').on('transitionend', ()=>{
                                    $('.watchlist-details-page').remove();
                                })
                            })
                        })
                    })
                })
            })
        }
       
        

    }
    
}
watchlistMovies();

function createWatchlistMovie (movie){
    return `<div class="watch-card" data-movieid="${movie.id}">
                <img class="watch-img" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                <div>
                    <h2 class="watch-title">${movie.title}</h2>
                    <button data-movieid="${movie.id}" id="remove-btn">Remove from list</button>
                    <button data-movieid="${movie.id}" id="show-details">Show Movie details</button>
                </div>
            </div>`
}

function getDetailedMovieInWatchlist (item){
    
    return `
    <div class="movie-intro">
        <div class="movie-header"><h1 class="movie-title">${item.title}</h1><span class="movie-rating"><i class="fas fa-star"></i> ${item.vote_average}</span><span class="movie-runtime"><i class="fas fa-video"></i> ${item.runtime} minutes</span><span id="close-btn"><i class="fas fa-times-circle"></i></span></div>
        <h2 class="movie-tagline">${item.tagline}</h2>
        <img class="movie-poster" src="https://image.tmdb.org/t/p/original/${item.poster_path}" alt="movie poster">
        <span>${hasYoutubeTrailer(item.videos.results[0])}</span>
    </div>
    <div>
        <p class="movie-overview">${item.overview}</p>
        <p>${getCast(item.credits.cast)}</p>
        <span>${hasDirector(item.credits.crew[0])}</span>
        <p class="movie-genres"><strong>Geners: </strong>${getGenres(item.genres)}</p>
        <p class="movie-date"><strong>Release Date: </strong>${item.release_date}</p>
        <p class="movie-lang"><strong>Language: </strong> ${getLanguages(item.spoken_languages)}</p>
        <p class="movie-adult">${isAdultRated(item.adult)}</p>
        <p class="movie-homepage">${hasHomepage(item.homepage)}</p>
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

});
 