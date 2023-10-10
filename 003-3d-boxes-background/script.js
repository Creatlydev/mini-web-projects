/* eslint-disable no-undef */
const boxesContainer = document.getElementById('boxes')
const btn = document.getElementById('btn')

let boxSize = getComputedStyle(boxesContainer).getPropertyValue('--box-size')
boxSize = parseInt(boxSize.slice(0, boxSize.length - 2))

btn.addEventListener('click', () => boxesContainer.classList.toggle('big'))

function createBoxes () {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const box = document.createElement('div')
      box.classList.add('box')
      box.style.backgroundPosition = `${-j * boxSize}px ${-i * boxSize}px`
      boxesContainer.appendChild(box)
    }
  }
}

createBoxes()
