
// navbar
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    if (mobileMenu.classList.contains('hidden')) {
        menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>`;
    } else {
        menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>`;
    }
});
// caroussel
(function () {
    "use stict"
    const slideTimeout = 5000;    
    const $slides = document.querySelectorAll('.slide');
    let $dots;
    let intervalId;
    let currentSlide = 1;
    function slideTo(index) {
        currentSlide = index >= $slides.length || index < 1 ? 0 : index;
        $slides.forEach($elt => $elt.style.transform = `translateX(-${currentSlide * 100}%)`);
        $dots.forEach(($elt, key) => $elt.classList = `dot ${key === currentSlide? 'active': 'inactive'}`);
    }
    function showSlide() {
        slideTo(currentSlide);
        currentSlide++;
    }
    for (let i = 1; i <= $slides.length; i++) {
        let dotClass = i == currentSlide ? 'active' : 'inactive';
        let $dot = `<span data-slidId="${i}" class="dot ${dotClass}"></span>`;
        document.querySelector('.carousel-dots').innerHTML += $dot;
    }
    $dots = document.querySelectorAll('.dot');
    $dots.forEach(($elt, key) => $elt.addEventListener('click', () => slideTo(key)));
    
    intervalId = setInterval(showSlide, slideTimeout)
    $slides.forEach($elt => {
        let startX;
        let endX;
        $elt.addEventListener('mouseover', () => {
            clearInterval(intervalId);
        }, false)
        $elt.addEventListener('mouseout', () => {
            intervalId = setInterval(showSlide, slideTimeout);
        }, false);
        $elt.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
        });
        $elt.addEventListener('touchend', (event) => {
            endX = event.changedTouches[0].clientX;
            if (startX > endX) {
                slideTo(currentSlide + 1);
            } else if (startX < endX) {
                slideTo(currentSlide - 1);
            }
        });
    })
})() ;

// card products Bracelets
const braceletsLink = document.querySelector('a[href="#"]:nth-child(1)'); 
const cardSection = document.querySelector('.cardOfNavbar');

// Ajout des événements de survol sur le lien "Bracelets"
braceletsLink.addEventListener('mouseenter', () => {
  cardSection.classList.add('visible'); 
});

braceletsLink.addEventListener('mouseleave', () => {
  // disparaît pas immédiatement, on attend que la souris quitte aussi la carte
  if (!cardSection.matches(':hover')) {
    cardSection.classList.remove('visible');
  }
});

// Ajout des événements de survol sur la carte
cardSection.addEventListener('mouseenter', () => {
  cardSection.classList.add('visible');
});

cardSection.addEventListener('mouseleave', () => {
  cardSection.classList.remove('visible'); 
});

