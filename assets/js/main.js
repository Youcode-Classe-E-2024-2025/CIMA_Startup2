
// navbar
// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menuButton');
  const mobileMenu = document.getElementById('mobileMenu');

  menuButton.addEventListener('click', () => {
    // Toggle mobile menu visibility
    mobileMenu.classList.toggle('hidden');
    
    // Optional: Add slide animation
    if (!mobileMenu.classList.contains('hidden')) {
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
    } else {
      mobileMenu.style.maxHeight = '0';
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!menuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
      mobileMenu.classList.add('hidden');
      mobileMenu.style.maxHeight = '0';
    }
  });
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

document.addEventListener('DOMContentLoaded', function () {
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
// -----------------------------------------------------------------
// Chargement des données depuis le fichier JSON
fetch('./assets/Data/products.json')
  .then(response => response.json())
  .then(data => {
    // Appeler la fonction pour créer les cartes
    createProductCards(data);
  })
  .catch(error => {
    console.error('Erreur lors du chargement des données :', error);
  });

// Fonction pour créer les cartes des produits
function createProductCards(products) {
  const cardContainer = document.getElementById('card-container');

  products.forEach(product => {
    if (product.bestsellers) {
      const card = document.createElement('div');
      card.classList.add('product-card', 'bg-white', 'p-4', 'sm:p-6', 'rounded-lg', 'shadow-lg', 'hover:shadow-xl', 'transition-shadow', 'duration-300');

      const cardImage = document.createElement('div');
      cardImage.classList.add('h-[200px]', 'sm:h-full');

      const img = document.createElement('img');
      img.src = product.imageUrl;
      img.alt = product.name;
      img.classList.add('w-full', 'h-full', 'object-cover', 'rounded-lg');

      cardImage.appendChild(img);
      card.appendChild(cardImage);
      cardContainer.appendChild(card);
    }
  });
}

// ---------------- best sellers ----------------------
class CategoryGallery {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.categories = ['Watches', 'Bracelets', 'Rings', 'Necklaces']; // Vos catégories
    this.products = {};  // Stockage des produits par catégorie
    this.intervals = {}; // Stockage des intervalles pour chaque catégorie
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const response = await fetch('assets/Data/products.json');
      if (!response.ok) throw new Error('Loading products faliled');

      const data = await response.json();
      const productsArray = Object.values(data).flat();
      data.products.forEach(product => {
        if (product.images && Array.isArray(product.images)) {
          product.images = product.images.map(imagePath => {
            return imagePath.replace(/^\.{2}/, 'assets');
          });
        }
      });
      // Grouper les produits par catégorie
      this.categories.forEach(category => {
        this.products[category] = productsArray.filter(p =>
          p && p.category === category && p.images && p.images.length > 0
        );
      });

      this.renderCategories();
    } catch (error) {
      console.error('Erreur:', error);
      this.container.innerHTML = `
              <div class="col-span-full text-red-500 p-4">
                  Load failed
              </div>
          `;
    }
  }

  renderCategories() {
    this.container.innerHTML = ''; // Nettoyer le conteneur

    this.categories.forEach(category => {
      const card = this.createCategoryCard(category);
      this.container.appendChild(card);
    });
  }

  createCategoryCard(category) {
    const card = document.createElement('div');
    card.className = 'relative h-64 overflow-hidden rounded-lg shadow-lg';


    // Créer l'image
    const img = document.createElement('img');
    img.className = 'w-full h-full object-cover transition-all duration-500';

    // Si nous avons des produits pour cette catégorie
    if (this.products[category] && this.products[category].length > 0) {
      let currentIndex = 0;
      const categoryProducts = this.products[category];

      // Définir la première image
      img.src = categoryProducts[0].images[0];
      card.appendChild(img);

      // Créer le diaporama automatique
      this.intervals[category] = setInterval(() => {
        currentIndex = (currentIndex + 1) % categoryProducts.length;
        img.style.opacity = '0';

        setTimeout(() => {
          img.src = categoryProducts[currentIndex].images[0];
          img.style.opacity = '1';
        }, 200);
      }, 2000);
    }

    return card;
  }

  // Nettoyer les intervalles lors de la destruction
  destroy() {
    Object.values(this.intervals).forEach(interval => clearInterval(interval));
  }
}

// Style pour la transition des images
const style = document.createElement('style');
style.textContent = `
  img {
      transition: opacity 0.2s ease-in-out;
  }
`;
document.head.appendChild(style);

// Initialiser la galerie
document.addEventListener('DOMContentLoaded', () => {
  new CategoryGallery('card-container');
});

// Nettoyer les intervalles lors du rechargement/fermeture de la page
window.addEventListener('beforeunload', () => {
  if (window.gallery) {
    window.gallery.destroy();
  }
});

// ------------------------------------------
async function loadProducts() {
  try {
    const response = await fetch('assets/Data/products.json');
    if (!response.ok) throw new Error('Loading products failed');

    const data = await response.json();
    const productsArray = Object.values(data).flat();

    // Catégories de produits
    const categories = ['bracelets', 'necklaces', 'rings', 'watches'];

    categories.forEach(category => {
      // Filtrer les produits pour chaque catégorie
      const categoryProducts = productsArray.filter(product => product.category && product.category.toLowerCase() === category);

      // Limiter à 4 produits seulement
      const top4CategoryProducts = categoryProducts.slice(0, 4);

      // Récupérer le conteneur de chaque catégorie
      const container = document.querySelector(`#${category}-container .product-list`);
      container.innerHTML = ''; // Vider le conteneur avant d'ajouter les nouveaux produits

      // Ajouter chaque produit à la grille
      top4CategoryProducts.forEach(product => {
        if (product.images && Array.isArray(product.images)) {
          product.images = product.images.slice(0, 1).map(imagePath => imagePath.replace(/^\.{2}/, 'assets')); // Prendre seulement la première image
        }

        // Créer la carte de produit
        const productCard = document.createElement('div');
        productCard.classList.add('product-card', 'bg-white', 'p-6', 'rounded-lg', 'shadow-lg', 'hover:shadow-xl', 'transition-shadow', 'duration-300', 'flex', 'flex-col', 'items-center');

        // Ajouter l'image du produit
        const productImage = document.createElement('img');
        productImage.src = product.images[0];
        productImage.alt = product.name;
        //productImage.classList.add('w-full', 'h-full', 'object-cover', 'rounded-lg', 'mt-4');
        productImage.classList.add('product-image');

        // Ajouter le titre du produit
        const productTitle = document.createElement('h3');
        productTitle.classList.add('font-inria', 'text-xl', 'text-center', 'mt-4');
        productTitle.textContent = product.name;

        // Ajouter un lien vers la page de détails
        const productLink = document.createElement('a');
        productLink.href = `assets/html/Descri_page.html?id=${product.id}`; // Lien dynamique avec l'ID du produit
        productLink.classList.add('w-full');
        
        // Ajouter les éléments au produit
        productCard.appendChild(productImage);
        productCard.appendChild(productTitle);
        productLink.appendChild(productCard);

        // Ajouter la carte de produit au conteneur
        container.appendChild(productLink);
      });
    });
  } catch (error) {
    console.error('Erreur lors du chargement des produits:', error);

    return card;
  }

  // Nettoyer les intervalles lors de la destruction
  destroy() {
    Object.values(this.intervals).forEach(interval => clearInterval(interval));
  }
}

// Style pour la transition des images
const style = document.createElement('style');
style.textContent = `
  img {
      transition: opacity 0.2s ease-in-out;
  }
`;
document.head.appendChild(style);

// Initialiser la galerie
document.addEventListener('DOMContentLoaded', () => {
  new CategoryGallery('card-container');
});

// Nettoyer les intervalles lors du rechargement/fermeture de la page
window.addEventListener('beforeunload', () => {
  if (window.gallery) {
    window.gallery.destroy();
  }
}

// Appeler la fonction pour charger les produits dès que la page est prête
document.addEventListener('DOMContentLoaded', loadProducts);
