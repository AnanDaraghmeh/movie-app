function createSearchListMovieCard (item){
    return `<li class="searchItem" data-id="${item.id}">
                <img class="searchItem_image" src="https://image.tmdb.org/t/p/w500/${item.poster_path}" alt="movie poster">
                <div class="searchItem_content">
                     <h3 class="searchItem_title">${item.title}</h3>
                    <p class="searchItem_text">Release year: ${item.release_date.substring(0, 4)}</p>
                </div>
            </li>`
}

export {createSearchListMovieCard};