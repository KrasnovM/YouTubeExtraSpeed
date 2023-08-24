var videoPlayer = document.getElementsByClassName("video-stream html5-main-video")[0] //get video player location
var videoTime = document.getElementsByClassName("ytp-time-duration")[0] // get video duration location (to put current video speed)
//for some reason if inside videoTime variable add .innerHTML video duration won't override, should be called every time in code
var videoTimeDefault = document.getElementsByClassName("ytp-time-duration")[0].innerHTML // save default video duration

videoTime.innerHTML = videoTimeDefault + " x" + videoPlayer.playbackRate // add video speed identifier after video duration

document.addEventListener('keydown', e=>{    //global event listener for 'keydown' events, 'e' is the key pressed
  
    if(e.keyCode === 221 && videoPlayer.playbackRate < 16) {  //key code 221 is for ']' button, 16 is the maximum speed for playbackRate property
      
        javascript:videoPlayer.playbackRate += 0.25  //0.25 is the increment to current speed; 1, 0.5, 0.25, 0.1 work fine; 
                                                     //if sum of increments can't be equal to 1 (2, 0.75, 0.33) they will go beyond 16 or below 0 
                                                     //additional validation will be required (video player won't crash, code just won't be executed)
      
        videoTime.innerHTML = videoTimeDefault + " x" + videoPlayer.playbackRate //change video speed identifier after video duration
      
    } else if (e.keyCode === 219 && videoPlayer.playbackRate > 0) { //key code 219 is for '[' button, 0 is the minimum speed for playbackRate property
      
        javascript:videoPlayer.playbackRate -= 0.25 // same stuff but it's decrement
        videoTime.innerHTML = videoTimeDefault + " x" + videoPlayer.playbackRate    
    }
    
    if(e.keyCode === 190 || e.keyCode === 188 && videoPlayer.playbackRate <= 2 && videoPlayer.playbackRate >= 0.25) { //video speed can be changed by hotkeys in player ('>'(190) and '<'(188)) but only between 0.25 and 2 
                                                                                                                      //it will immediatly override current value
        videoTime.innerHTML = videoTimeDefault + " x" + videoPlayer.playbackRate
    }
})

//some stuff for testing
//javascript:document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = 1;
//2.5
//3
//3.5
//4
//4.5
//5
//+= 0.5
//document.querySelector('video').playbackRate = 1.25
//document.getElementsByClassName("video-stream html5-main-video")[0].setPlaybackRate = 0.25
