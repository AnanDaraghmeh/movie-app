function createWatchlistMovie (movie){
    return `<div class="watchlistMovie" data-movieid="${movie.id}">
                <img class="watchlistMovie_image" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                <div>
                    <h2 class="watchlistMovie_title">${movie.title}</h2>
                    <button data-movieid="${movie.id}" id="remove-btn">Remove from list</button>
                    <button data-movieid="${movie.id}" id="show-details">Show Movie details</button>
                </div>
            </div>`
}

export {createWatchlistMovie};