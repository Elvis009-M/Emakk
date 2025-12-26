



/*  -----            MODE TOGGLER         ------  */
document.querySelector('#mode-toggler').addEventListener('click', () => {
    document.body.classList.toggle('darkmode');
    if(document.body.classList.contains('darkmode')) {
     document.querySelector('#mode-toggler').style.backgroundImage="url('images/sun.jpg')";
    }
    else document.querySelector('#mode-toggler').style.backgroundImage="url('images/moon.jpg')";
})



/* -------    FUNCTION FOR RESPONSIVE NAVIGATION ON DEVICES WITH SMALL WIDTH   ------------ */
const navSlide = () => {
   const burger = document.querySelector('.burger') ;
   const nav = document.querySelector('nav ul') ;
   const navLinks = document.querySelectorAll('nav ul li') ;

   burger.addEventListener('click', ()=> {
// Toggle Nav
	nav.classList.toggle('nav-active') ;
  // Animate Links
   navLinks.forEach((link, index) =>{
	if(link.style.animation) {
	    link.style.animation = '' ;
	}
	else {
	link.style.animation=`navLinkFade 0.5s ease forwards ${index/7 + 0.3}s` ;
	}
   });
   // Burger Animation
    burger.classList.toggle('toggle') ;
   });

}


navSlide() ;


