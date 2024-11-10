const testimonials = document.querySelectorAll('.testimonial');
const quotes = document.querySelectorAll('.quote');

let currentIndex = 0;
let interval;
let isPaused = false;

// Testimonials animation start
function showTestimonial(index) {
    testimonials.forEach(t => t.classList.remove('active'));
    quotes.forEach(q => q.classList.remove('active'));

    testimonials[index].classList.add('active');
    quotes[index].classList.add('active');
}

function nextTestimonial() {
    if (!isPaused) {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }
}

testimonials.forEach((testimonial, index) => {
    testimonial.addEventListener('mouseenter', () => {
        isPaused = true;
        showTestimonial(index);
    });

    testimonial.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    testimonial.addEventListener('click', () => {
        currentIndex = index;
        showTestimonial(index);
    });
});

interval = setInterval(nextTestimonial, 7000);

window.addEventListener('unload', () => {
    clearInterval(interval);
});

// Testimonials animation ends

