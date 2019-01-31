function getDetailedMovie (item){
    return `
    <div class="spinner"></div>
    <div class="detailedMovie_intro">
        <div class="detailedMovie_header"><h1 class="detailedMovie_title">${item.title}</h1><span class="detailedMovie_rating"><i class="fas fa-star"></i> ${item.vote_average}</span><span class="detailedMovie_runtime"><i class="fas fa-video"></i> ${item.runtime} minutes</span></div>
        <h2 class="detailedMovie_tagline">${item.tagline}</h2>
        <img class="detailedMovie_poster" src="https://image.tmdb.org/t/p/original/${item.poster_path}" alt="movie poster">
        <span>${hasYoutubeTrailer(item.videos.results[0])}</span>
    </div>
    <div>
        <p class="detailedMovie_overview">${item.overview}</p>
        <p>${getCast(item.credits.cast)}</p>
        <span>${hasDirector(item.credits.crew[0])}</span>
        <p class="detailedMovie_genres"><strong>Geners: </strong>${getGenres(item.genres)}</p>
        <p class="detailedMovie_releaseDate"><strong>Release Date: </strong>${item.release_date}</p>
        <p class="detailedMovie_languages"><strong>Languages: </strong> ${getLanguages(item.spoken_languages)}</p>
        <p class="detailedMovie_adultContent">${isAdultRated(item.adult)}</p>
        <p class="detailedMovie_homepage">${hasHomepage(item.homepage)}</p>
        <button class="detailedMovie_addToWatchListButton" id="fav">Add to Watchlist</button>
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
         return `<a class="detailedMovie_homepageLink" href="${homepage}" target="_blank">To the movie homepage</a>`
     } else {
         return '';
     }
 }
 function hasYoutubeTrailer(arr){
     if (arr != undefined){
         return `<a class="detailedMovie_youtubeLink" target="_blank" href="https://www.youtube.com/watch?v=${arr.key}">Watch trailer on Youtube <i class="fab fa-youtube"></i></a>`
 
     } else{
         return '';
     }
 }
 
 function hasDirector (arr){
     if (arr != undefined){
         return `<p class="detailedMovie_director"><strong>Director: </strong>${arr.name}</p>`
     } else {
         return `<p class="detailedMovie_director"><strong>Director: </strong>No data available</p>`
     }
 }
 
 function getCast (arr){
     let actor1 = arr[0];
     let actor2 = arr[1];
     let actor3 = arr[2];
     if (actor1 == undefined || actor2 == undefined || actor3 == undefined){
         return '';
     }
     return `<div class="movieCast">
                 <p>Top cast:</p>
                 <div class="movieCast_wrapper">
                     <div class="movieCast_item" data-actorid="${actor1.id}">
                         <img class="movieCast_image" src="https://image.tmdb.org/t/p/w500/${actor1.profile_path}" alt="actor poster">
                         <h5>${actor1.name}</h5>
                         <h5><em>"${actor1.character}"</em></h5>
                      </div>
                      <div class="movieCast_item" data-actorid="${actor2.id}">
                         <img class="movieCast_image" src="https://image.tmdb.org/t/p/w500/${actor2.profile_path}" alt="actor poster">
                         <h5>${actor2.name}</h5>
                         <h5><em>"${actor2.character}"</em></h5>
                      </div>
                      <div class="movieCast_item" data-actorid="${actor3.id}">
                         <img class="movieCast_image" src="https://image.tmdb.org/t/p/w500/${actor3.profile_path}" alt="actor poster">
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
   return `<div class="actorTopMovies">
                 <p>Top characters:</p>
                 <div class="actorTopMovies_wrapper">
                     <div class="actorTopMovies_item">
                         <img class="actorTopMovies_image" src="https://image.tmdb.org/t/p/w500/${movie1.poster_path}" alt="actor poster">
                         <div>
                             <h5><em>"${movie1.character}"</em></h5>
                             <h5>${movie1.title}</h5>  
                         </div>
                      </div>
                      <div class="actorTopMovies_item">
                         <img class="actorTopMovies_image" src="https://image.tmdb.org/t/p/w500/${movie2.poster_path}" alt="actor poster">
                         <div>
                             <h5><em>"${movie2.character}"</em></h5>
                             <h5>${movie2.title}</h5>
                         </div>
                      </div>
                      <div class="actorTopMovies_item">
                         <img class="actorTopMovies_image" src="https://image.tmdb.org/t/p/w500/${movie3.poster_path}" alt="actor poster">
                         <div>
                             <h5><em>"${movie3.character}"</em></h5>
                             <h5>${movie3.title}</h5>
                          </div>
                      </div>
                 </div>  
             </div>`
 }

 export {getDetailedMovie, createActorOverlay};