// alert("Hello");
const playbutton=document.querySelectorAll(".playbutton")
playbutton.forEach((button)=>{button.addEventListener("click",playaudio);})
let ctx=new AudioContext();
let audio;
let duration;
function playaudio(){
    ctx.close();
    ctx=new AudioContext();
    fetch("8 Parche Baani Sandhu 128 Kbps.mp3")
.then((response)=>{
    return response.arrayBuffer();
}).then((buffer)=>{
    return ctx.decodeAudioData(buffer);
}).then((decoded)=>{
    audio=decoded;
    duration=audio.duration;
    const play=ctx.createBufferSource();
    play.buffer=audio;
    play.connect(ctx.destination);
    play.start(ctx.currentTime);
    playbutton.forEach((button)=>{button.removeEventListener("click",playaudio);})
    playbutton.forEach((button)=>{button.addEventListener("click",changestate);})
    checkiffinish();
// //     console.log("done");
})
    
}

function changestate(){
    if(ctx.state==="running")ctx.suspend();
    else ctx.resume();
}
function checkiffinish(){
    setInterval(()=>{
        if(duration<ctx.currentTime){
            clearInterval();
            playaudio();
        }
    },1000);
}
