

const btnHamburger = document.querySelector('#btnhmb');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const fadeElems = document.querySelectorAll('.has-fade');

btnHamburger.addEventListener('click', () => {

  if(btnHamburger.classList.contains('open')){ // Close Hamburger Menu
    body.classList.remove('noscroll');
    btnHamburger.classList.remove('open');    
    fadeElems.forEach(function(element){
    element.classList.remove('fade-in');
    element.classList.add('fade-out');
    });
    
}
  else { // Open Hamburger Menu
    body.classList.add('noscroll');
    btnHamburger.classList.add('open');
    fadeElems.forEach(function(element){
    element.classList.remove('fade-out');
    element.classList.add('fade-in');
    });

}  
});




gsap.registerPlugin(ScrollTrigger);

const headerTimeline = gsap.timeline({
    defaults: {duration: 0.4},
    scrollTrigger: {
        trigger: ".hero",
        start: "top",
        // markers: true,
        toggleActions: "restart none none reset",
    },
});
headerTimeline.to(".header", {
    backgroundColor: "white",
    boxShadow:"0 0px 10px #5DA3FA",
})
    .to(".white-curve", {
        visibility: "hidden",
    }, 0)
    .to(".header__menu span",{
        backgroundColor: "#383CC1"
    }, 0)
    .to(".header__links a", {
        color: "#383CC1"
    }, 0);


const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);

const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");

const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

prevButton.classList.remove('is-hidden');
var pIndex=0;

// slides[0].style.left = slideWidth * 0 + "px";
// slides[1].style.left = slideWidth * 1 + "px";
// slides[2].style.left = slideWidth * 2 + "px";

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + "px";
}

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = "translateX(-" + targetSlide.style.left + ")";
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

prevButton.addEventListener("click", e => {
    if(pIndex == 0){
        for(let i=0;i<4;i++){
            nextButton.click();
        } 
    }
    else{
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector(".current-slide");
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.findIndex(slide => slide === prevSlide);
        
        pIndex=prevIndex;
        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot); 
    }
    

})

nextButton.addEventListener("click", e => {
    
    if(pIndex+1 == slides.length){
        for(let i=0;i<4;i++){
            prevButton.click();
        } 
    }
    else{
        
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector(".current-slide");
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.findIndex(slide => slide === nextSlide);
        
        pIndex=nextIndex;
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    }
    
})

dotsNav.addEventListener("click", e => {
    const targetDot = e.target.closest("button");

    if (!targetDot) return;

    const currentSlide = track.querySelector(".current-slide");
    const currentDot = dotsNav.querySelector(".current-slide");
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);

    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);

})

function slideShow() {
    nextButton.click();
}
setInterval(slideShow,3000);

