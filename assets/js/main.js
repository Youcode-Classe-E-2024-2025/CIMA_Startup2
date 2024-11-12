
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
        $dots.forEach(($elt, key) => $elt.classList = `dot ${key === currentSlide ? 'active' : 'inactive'}`);
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
})();


// Sélectionner les liens et sections
const navbarLinks = document.querySelectorAll('.navbar-link');
const sections = document.querySelectorAll('.elementOfNavbar > div');

// Masquer toutes les sections
function hideAllSections() {
    sections.forEach(section => {
        section.classList.remove('visible');
    });
}

// Fonction pour afficher une section spécifique
function showSection(index) {
    hideAllSections();
    sections[index].classList.add('visible');
}

// Événements pour montrer/masquer les sections
navbarLinks.forEach((link, index) => {
    link.addEventListener('mouseenter', () => showSection(index));
});
document.querySelector('.elementOfNavbar').addEventListener('mouseleave', hideAllSections);


// Script pour la gestion du formulaire et des animations

document.addEventListener('DOMContentLoaded', function() {
  // Animation pour faire apparaître les éléments au scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100');
        entry.target.classList.remove('opacity-0');
      }
    });
  }, observerOptions);

  // Observer les éléments avec animation
  document.querySelectorAll('.animate-fadeIn').forEach(el => {
    observer.observe(el);
  });

  // Gestion du formulaire newsletter
  const form = document.getElementById('newsletterForm');
  const confirmationMessage = document.getElementById('confirmationMessage');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = form.email.value;
    
    // Simulation d'envoi (remplacer par votre logique d'envoi réelle)
    setTimeout(() => {
      form.reset();
      form.style.display = 'none';
      confirmationMessage.classList.remove('hidden');
      
      // Réinitialiser après 5 secondes
      setTimeout(() => {
        form.style.display = 'flex';
        confirmationMessage.classList.add('hidden');
      }, 5000);
    }, 1000);
  });
});

