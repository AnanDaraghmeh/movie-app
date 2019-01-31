import $ from 'jquery';
import { getDetailedMovie, createActorOverlay } from './modules/detailedMovie';

// back button
$('#back').on('click', ()=>{
    history.back();
})

//detailed movie page
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
    $('.movieCast_item').on('click', (e)=>{
        $.ajax({
            method: 'GET',
            url: `https://api.themoviedb.org/3/person/${e.currentTarget.dataset.actorid}?api_key=779479719b2b6731a683844365cd9f0c&append_to_response=movie_credits`
        }).done(actorData=>{
            $('.actorOverlay').fadeIn();
            $('#actor-overlay').html(createActorOverlay(actorData));
            $('#close-btn').on('click', ()=>{
                $('.actorOverlay').fadeOut();
            })
        })
    })
});
