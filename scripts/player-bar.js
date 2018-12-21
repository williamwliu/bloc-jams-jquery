{
    $('button#play-pause').on('click', function() {
      player.playPause();
      $(this).attr('playState', player.playState);
    });

  $('button#next').on('click', function() {
    //only works if playstate = playing
    if (player.playState !== 'playing') { return; }
    //grabs the value of index of next song
    const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
    const nextSongIndex = currentSongIndex + 1;
    //prevents the button from doing anything if on last song
     if (nextSongIndex >= album.songs.length) { return; }
    //assigns the next song based on the nextsongIndex to a variable
    const nextSong = album.songs[nextSongIndex];
    //call players to play that song
    player.playPause(nextSong);
  });

  $('button#previous').on('click', function() {
    //only works if playstate = playing
    if (player.playState !== 'playing') { return; }
    //grabs the value of index of previous song
    const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
    const prevSongIndex = currentSongIndex - 1;
    //prevents the button from doing anything if on first song
    if (currentSongIndex == 0) { return; }
    //assigns the next song based on the nextsongIndex to a variable
    const prevSong = album.songs[prevSongIndex];
    //call players to play that song
    player.playPause(prevSong);
  });

  
  //makes slider change current position of song playing
  $('#time-control input').on('input', function (event) {
    player.skipTo(event.target.value);
  });

  $('#volume-control input').on('input',function (event) {
    player.setVolume(event.target.value);
  });
  
  //Moves slider according to song playing
  setInterval( () => {
    if (player.playState !== 'playing') { return; }  //doesnt do anything if song is not playing  
    const currentTime = player.getTime();             //sets current time
    const duration = player.getDuration();            //setss duration of song
    const percent = (currentTime / duration) * 100;   //sets percent of song played 
    $('#time-control .current-time').text( currentTime );  //sets current-time to currentTime variable
    $('#time-control input').val(percent);            //sets input value
    $('#time-control .total-time').text( duration );  //sets total-time to duration variable
  }, 1000); //refreshes every 1000 milliseconds
}