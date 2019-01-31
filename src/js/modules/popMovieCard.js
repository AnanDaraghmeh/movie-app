function createPopMovieCard (movie){
    return `<div class="popMovieCard" data-id="${movie.id}">
                <div class="popMovieCard_imageWrapper"><img class="popMovieCard_image" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"></div>
                <div class="popMovieCard_overlay">
                    <h2>${movie.title}</h2>
                    <p>Released in ${movie.release_date.substring(0, 4)}</p>
                    <p><i class="fas fa-star"></i> ${movie.vote_average}/10</p>
                </div>
            </div>`
}

export { createPopMovieCard };