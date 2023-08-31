var videoPlayer = document.getElementsByClassName("video-stream html5-main-video")[0] //get video player location
var videoTime = document.getElementsByClassName("ytp-time-duration")[0] // get video duration location (to put current video speed)
//for some reason if inside videoTime variable add .innerHTML video duration won't override, should be called every time in code
var videoTimeDefault = document.getElementsByClassName("ytp-time-duration")[0].innerHTML // save default video duration

videoPlayer.addEventListener('playing', e=>{ //add video speed identifier after duration when video starts playing
    var videoTimeDefaultTmp = document.getElementsByClassName("ytp-time-duration")[0].innerHTML
    if(!videoTimeDefaultTmp.includes("x")) { //TODO: may be change innerHTML every time on playing? (but old code from interval works)
        videoTimeDefault = videoTimeDefaultTmp
        videoTime.innerHTML = videoTimeDefault + " x" + videoPlayer.playbackRate
    }
})

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
//document.querySelector('video').playbackRate = 1.25
//document.getElementsByClassName("video-stream html5-main-video")[0].setPlaybackRate = 0.25

/*
videoTime.innerHTML = videoTimeDefault + " x" + videoPlayer.playbackRate // add video speed identifier after video duration 

setInterval(function() {  //if you click on another video without reloading page videoTimeDefault won't update, identifier will be added only after speed change
                          // periodic function will check every 20 seconds for changes
    var videoTimeDefaultTmp = document.getElementsByClassName("ytp-time-duration")[0].innerHTML
    if(!videoTimeDefaultTmp.includes("x")) {
        videoTimeDefault = videoTimeDefaultTmp
        videoTime.innerHTML = videoTimeDefault + " x" + videoPlayer.playbackRate
    }
}, 20000); // 20000 milliseconds
*/

//________________________________________________________________________________________________

//css code to force 4 videos in a row and remove shorts (extention to run css code required)

//number of rows
/*
.style-scope.ytd-rich-grid-renderer{--ytd-rich-grid-items-per-row: 4;}
#contents > ytd-rich-grid-row,#contents > ytd-rich-grid-row > #contents {
display: contents;}
*/

//remove shorts
/*
#items.ytd-grid-renderer>ytd-grid-video-renderer:has(ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]) {
display: none;}
*/


