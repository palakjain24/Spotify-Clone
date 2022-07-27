// 

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('assets/songs/Aankhon-Se-Batana.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songName:"Aankhon se ", filePath: "assets/songs/Aankhon-Se-Batana.mp3", coverPath:"assets/covers/Aankhon.jpg"},
    {songName:"Chitta Kukkad", filePath: "assets/songs/Chitta.mp3", coverPath:"assets/covers/chitta.jpg"},
    {songName:"Halka Halka", filePath: "assets/songs/Halka Halka.mp3", coverPath:"assets/covers/halka halka.jpg"},
    {songName:"Kabhi Tumhe", filePath: "assets/songs/Kabhi Tumhe.mp3", coverPath:"assets/covers/kbhi tumhe.jpg"},
    {songName:"Kahani", filePath: "assets/songs/Kahani.mp3", coverPath:"assets/covers/kahani.jpg"},
    {songName:"Mar Jaayen", filePath: "assets/songs/Mar Jaayen.mp3", coverPath:"assets/covers/mar jaayen.jpg"},
    {songName:"Mere Yaara", filePath: "assets/songs/Mere Yaara.mp3", coverPath:"assets/covers/mere yaara.jpg"},
    {songName:"Rait Zara", filePath: "assets/songs/Rait Zara.mp3", coverPath:"assets/covers/rait zara.jpg"},
    {songName:"Wafa Ne Bewafai", filePath: "assets/songs/Wafa Ne Bewafai.mp3", coverPath:"assets/covers/wafa ne bewafai.jpg"},
    {songName:"Yeh Aaina", filePath: "assets/songs/Yeh Aaina.mp3", coverPath:"assets/covers/ye aaina.jpg"}
]

songItems.forEach((element, i)=> { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9) songIndex = 0;
    else songIndex += 1;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0) songIndex = 0
    else songIndex -= 1;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})