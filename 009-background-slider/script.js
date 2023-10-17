const btnRight = document.getElementById('right')
const btnLeft = document.getElementById('left')
const slides = document.querySelectorAll('.slide')
const slidesLength = slides.length

let slideActive = 0

btnLeft.addEventListener('click', () => {
  slideActive - 1 < 0 ? (slideActive = slidesLength - 1) : slideActive--
  changeSlideActive()
  setBodyImageBackground()
})

btnRight.addEventListener('click', () => {
  slideActive + 1 > slidesLength - 1 ? (slideActive = 0) : slideActive++
  changeSlideActive()
  setBodyImageBackground()
})

function setBodyImageBackground () {
  document.body.style.backgroundImage = slides[slideActive].style.backgroundImage
}

function changeSlideActive () {
  slides.forEach((slide) => slide.classList.remove('active'))
  slides[slideActive].classList.add('active')
}

setBodyImageBackground()
