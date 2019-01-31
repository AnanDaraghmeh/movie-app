import $ from 'jquery';
import { createWatchlistMovie } from './modules/watchlistMovie';

$(function(){
    let watchList = [];
    if(localStorage.getItem('watchList') !== null){
        watchList = JSON.parse(localStorage.getItem('watchList'));
        console.log(watchList);
        if(watchList.length > 0){
            $('.watchlist-empty').css({'display':'none'});
            watchList.forEach(item=>{
                $.ajax({
                    method: 'GET',
                    url: `https://api.themoviedb.org/3/movie/${item}?api_key=779479719b2b6731a683844365cd9f0c&append_to_response=videos,images,credits`
                }).done(data=>{
                    $('.watchlist-empty').hide();
                    $('.watchlist').prepend(createWatchlistMovie(data));
                    $('#remove-btn').on('click', (e)=>{
                        let itemToRemove = parseInt(e.target.dataset.movieid);
                        let index = watchList.indexOf(itemToRemove);
                        watchList.splice(index, 1);
                        localStorage.setItem('watchList', JSON.stringify(watchList));
                        e.target.parentElement.parentElement.classList.add('js-remove');
                        e.target.parentElement.parentElement.addEventListener('transitionend', ()=>{
                            e.target.parentElement.parentElement.remove();
                        })
                        if(watchList.length < 1){
                            $('.watchlist-empty').css({'display':'block'});
                        }
                    })
                    $('#show-details').on('click', (e)=>{
                        $.ajax({
                            method: 'GET',
                            url: `https://api.themoviedb.org/3/movie/${e.target.dataset.movieid}?api_key=779479719b2b6731a683844365cd9f0c&append_to_response=videos,images,credits`
                        }).done(data=>{
                            sessionStorage.setItem('data', JSON.stringify(data));
                            location.href = 'movie.html';
                        })
                    })
                })
            })
        }
    }
});