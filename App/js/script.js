

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
        trigger: ".header",
        start: "top",
        //   markers: true,
        toggleActions: "restart none reverse reset",
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
