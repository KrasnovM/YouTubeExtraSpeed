var videoPlayer //get video player location
var videoTime // get video duration location (to put current video speed)
//for some reason if inside videoTime variable add .innerHTML video duration won't override, should be called every time in code
var videoTimeDefault // save default video duration

const eventPause = new Event('pause'); //pause video event
const eventPlaying = new Event('playing'); //play video event
//event are used because that's the only way i found to summon overlay

document.addEventListener('mouseup', e=>{ //add video info and speedometer after click on document
    videoPlayer = document.getElementsByClassName("video-stream html5-main-video")[0]
    videoTime = document.getElementsByClassName("ytp-time-duration")[0]
    
    setTimeout(()=> { //setTimeout makes speedometer appear on next click (if you choose next video)
        var videoTimeDefaultTmp = document.getElementsByClassName("ytp-time-duration")[0].innerHTML
        if(!videoTimeDefaultTmp.includes("x")) {
            videoTimeDefault = videoTimeDefaultTmp
            videoTime.innerHTML = videoTimeDefault + " x" + videoPlayer.playbackRate // add video speedometer after video duration
        }
    }, 1000) // 1000 milliseconds = 1 second, i prefer 700
})

document.addEventListener('keydown', e=>{    //global event listener for 'keydown' events, 'e' is the key pressed
    
    if(e.keyCode === 221 && videoPlayer.playbackRate < 16) {  //key code 221 is for ']' button, 16 is the maximum speed for playbackRate property
        
        javascript:videoPlayer.playbackRate += 0.25  //0.25 is the increment to current speed; 1, 0.5, 0.25, 0.1 work fine; 
                                                     //if sum of increments can't be equal to 1 (2, 0.75, 0.33) they will go beyond 16 or below 0 
                                                     //additional validation will be required (video player won't crash, code just won't be executed)
        
        videoTime.innerHTML = videoTimeDefault + " x" + videoPlayer.playbackRate //change video speedometer after video duration

        videoPlayer.dispatchEvent(eventPause) //pause event makes overlay show up
        setTimeout(()=> {
            videoPlayer.dispatchEvent(eventPlaying)
        }, 600) //after 600 milliseconds playing event makes overlay hide
        
    } else if (e.keyCode === 219 && videoPlayer.playbackRate > 0) { //key code 219 is for '[' button, 0 is the minimum speed for playbackRate property
        javascript:videoPlayer.playbackRate -= 0.25 // same stuff but it's decrement
        videoTime.innerHTML = videoTimeDefault + " x" + videoPlayer.playbackRate
        videoPlayer.dispatchEvent(eventPause)
        setTimeout(()=> {
            videoPlayer.dispatchEvent(eventPlaying)
        }, 600)
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

/*
setInterval(function() {  //if you click on another video without reloading page videoTimeDefault won't update, speedometer will be added only after speed change
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


