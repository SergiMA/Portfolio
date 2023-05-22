// Image sliders
window.onload = function()
{
    const sliderContainer = document.querySelector('.slider-container');
    const slider = document.querySelector('.slider');
    const interval = 3000;
    
    let slides = document.querySelectorAll('.slide');
    let index = 1;
    let slideId;
    
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    
    firstClone.id = 'first-clone';
    lastClone.id = 'last-clone';
    
    slider.append(firstClone);
    slider.prepend(lastClone);
    
    if (slides[index] == null || slides[index] == undefined) return;

    const slideWidth = slides[index].clientWidth;
    
    slider.style.transform = `translateX(${-slideWidth * index}px)`;
    
    const startSlide = () => {
        slideId = setInterval(() => {
            moveToNextSlide();
        }, interval);
    };

    slider.addEventListener('transitionend', () => {
        let slides = getSlides();
        if (slides[index].id === firstClone.id) {
            slider.style.transition = 'none';
            index = 1;
            slider.style.transform = `translateX(${-slideWidth * index}px)`;
        }

        if (slides[index].id === lastClone.id) {
            slider.style.transition = 'none';
            index = slides.length - 2;
            slider.style.transform = `translateX(${-slideWidth * index}px)`;
        }
    });

    const getSlides = () => document.querySelectorAll('.slide');

    const moveToNextSlide = () => {
        let slides = getSlides();
        if(index >= slides.length - 1) return;

        index++;
        slider.style.transform = `translateX(${-slideWidth * index}px)`;
        slider.style.transition = '.7s';
    }

    const moveToPreviousSlide = () => {
        if (index <= 0) return;

        index--;
        slider.style.transform = `translateX(${-slideWidth * index}px)`;
        slider.style.transition = '.7s';
    }

    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideId);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        clearInterval(slideId);
        startSlide();
    });

    startSlide();
}