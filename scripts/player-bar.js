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

  }