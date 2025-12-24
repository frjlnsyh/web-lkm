const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');

let index = 0;
const intervalTime = 5000;
let autoSlide;

// === Create dots ===
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);

    dot.addEventListener('click', () => {
        index = i;
        showSlide();
        resetAutoSlide();
    });
});

const dots = document.querySelectorAll('.dot');

function showSlide() {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// === Buttons ===
nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    showSlide();
    resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide();
    resetAutoSlide();
});

// === Auto Slide ===
function startAutoSlide() {
    autoSlide = setInterval(() => {
        index = (index + 1) % slides.length;
        showSlide();
    }, intervalTime);
}

function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

startAutoSlide();
