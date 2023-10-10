const numsWrapper = document.querySelector('.nums')
const counter = document.querySelector('.counter')
const finalMessage = document.querySelector('.final')
const replay = document.querySelector('#replay')
const btnStartCountdown = document.querySelector('.btn-start-countdown')
const inputValueForCountdown = document.querySelector('.input')

function createNumsForCountdown (n = 10) {
  const nodosNums = numsWrapper.querySelectorAll('span')
  if (nodosNums.length > 0) {
    nodosNums.forEach((nodo) => {
      nodo.remove()
    })
  }
  //
  for (let i = 0; i <= n; i++) {
    const span = document.createElement('span')
    span.textContent = i
    numsWrapper.insertAdjacentElement(
      'afterbegin',
      span
    )
  }

  numsWrapper.children[0].classList.add('in')
}

function resetDOM () {
  counter.classList.remove('hide')
  finalMessage.classList.remove('show')

  nums.forEach((num) => {
    num.classList.value = ''
  })

  nums[0].classList.add('in')
}

function runAnimation () {
  nums.forEach((num, idx) => {
    const nextToLast = nums.length - 1

    num.addEventListener('animationend', (e) => {
      if (e.animationName === 'goIn' && idx !== nextToLast) {
        num.classList.remove('in')
        num.classList.add('out')
      } else if (e.animationName === 'goOut' && num.nextElementSibling) {
        num.nextElementSibling.classList.add('in')
      } else {
        counter.classList.add('hide')
        finalMessage.classList.add('show')
      }
    })
  })
}

createNumsForCountdown()
let nums = numsWrapper.querySelectorAll('span')

runAnimation()

btnStartCountdown.addEventListener('click', () => {
  startCustomCountDown()
}
)

inputValueForCountdown.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    startCustomCountDown()
  }
})

function startCustomCountDown () {
  const value = inputValueForCountdown.value
  if (value && parseInt(value) >= 3 && parseInt(value) <= 1000) {
    createNumsForCountdown(parseInt(value))
    nums = numsWrapper.querySelectorAll('span')

    runAnimation()
  }
}

replay.addEventListener('click', () => {
  resetDOM()
  runAnimation()
})
