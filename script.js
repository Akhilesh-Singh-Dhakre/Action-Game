const gameO = new Audio('./sound/crash.wav');
const move = new Audio('./sound/jump.mp3');
const musico = new Audio('./sound/music.mp3');
score=0;
cross=true;
document.onkeydown=function(e){
    console.log(e.key);
    if(e.key=="ArrowUp"){
        move.play();
        bike=document.querySelector('.bike');
        bike.classList.add('animatebike');
        setTimeout(() => {
           bike.classList.remove('animatebike'); 
        }, 700);
    }
    if(e.key=="ArrowRight"){
        bike=document.querySelector('.bike');
        bikeX=parseInt(window.getComputedStyle(bike, null).getPropertyValue('left'));
        bike.style.left=bikeX+112+"px";    
    }
    if(e.key=="ArrowLeft"){
        bike=document.querySelector('.bike');
        bikeX=parseInt(window.getComputedStyle(bike, null).getPropertyValue('left'));
        bike.style.left=bikeX-112+"px";    
    }
}
setInterval(() => {
    bike=document.querySelector('.bike');
    gameOver=document.querySelector('.gameOver');
    obstacle=document.querySelector('.obstacle');

    bx=parseInt(window.getComputedStyle(bike, null).getPropertyValue('left'));
    by=parseInt(window.getComputedStyle(bike, null).getPropertyValue('top'));

    ox=parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy=parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX=Math.abs(bx-ox);
    offsetY=Math.abs(by-oy);

    if(offsetX<70 && offsetY<70){
        gameO.play();
        gameOver.innerHTML="Game Over - Reload to start"
        obstacle.classList.remove('obstacleAni');
        musico.pause();
    }
    else if(offsetX<100 && cross){
        musico.play();
        score+=1;
        updateScore(score);
        cross=false;
        setTimeout(() => {
            cross=true;
        }, 1000);
        setTimeout(() => {
            aniDur=parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            if(aniDur>3){
                newDur=aniDur-0.1;
                obstacle.style.animationDuration=newDur+'s';
            }
        }, 500);
    }
},  10);
function updateScore(score){
    scoreContainer.innerHTML="Your Score: "+ score;
}