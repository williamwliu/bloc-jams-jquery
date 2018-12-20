class Player {
  constructor () {
    this.currentlyPlaying = album.songs[0];                                 //set to first item in album songs (array)
    this.playState = 'stopped';                                             
    this.volume = 80;
    this.soundObject = new buzz.sound(this.currentlyPlaying.soundFileUrl);  
  }

  getDuration() {
    return this.soundObject.getDuration();
  }

  getTime() {
    return this.soundObject.getTime();
  }
  
  playPause (song = this.currentlyPlaying) {
    if (this.currentlyPlaying !== song) {
      // Stop the currently playing sound file (even if nothing is playing)
      this.soundObject.stop();
      // Clear classes on the song that's currently playing
      this.currentlyPlaying.element.removeClass('playing paused');
      
      // Update our currentlyPlaying and playState properties
      this.currentlyPlaying = song;
      this.playState = 'stopped';
      this.soundObject = new buzz.sound(this.currentlyPlaying.soundFileUrl);
    }
      // If the playstate is paused or stopped, it sets the volume to this.volume, plays soundObject, sets playState to playing,
      // and replaces the currentlyPlaying element from 'paused' to 'playing'
    if (this.playState === 'paused' || this.playState === 'stopped') {
      this.soundObject.setVolume( this.volume );
      this.soundObject.play();
      this.playState = 'playing';
      this.currentlyPlaying.element.removeClass('paused').addClass('playing');
      //if playState is not paused OR stopped, it pauses the sound object, sets playState to paused, 
      //and puts a paused class to the currentlyPlaying element
    } else {
      this.soundObject.pause();
      this.playState = 'paused';
      this.currentlyPlaying.element.removeClass('playing').addClass('paused');
    }
  }
      //accepts one parameter, percent. Sets the time of the soundobject to a time depending on the percentage selected.
      //accepts input when not playing (otherwise returns it)
  skipTo (percent) {
    if (this.playState !== 'playing') { return }
    this.soundObject.setTime( (percent / 100) * this.soundObject.getDuration() );
  }
  //accepts one parameter, perecent. Sets volume to the percent and stores it to the volume property of soundObject
  setVolume (percent) {
    this.volume = percent;
    this.soundObject.setVolume(percent);
  }
}
//establishes a constasnt, player.
const player = new Player();

