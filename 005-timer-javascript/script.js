function getTimeLeft (deadline) {
  const now = new Date()
  // Cuando se crea un setInterval que se ejecuta cada cierto , la primera vez que se ejecuta va a esperar ese tiempo, por
  // se le suma a la resta de Date(deadline) - now + 1000, por que si no iria retresado con un segundo el countdown
  const timeLeft = (new Date(deadline) - now + 1000) / 1000
  const secondsLeft = ('0' + Math.floor(timeLeft % 60)).slice(-2)
  const minutesLeft = ('0' + Math.floor(timeLeft / 60 % 60)).slice(-2)
  const hoursLeft = ('0' + Math.floor(timeLeft / 3600 % 24)).slice(-2)
  const daysLeft = ('0' + Math.floor(timeLeft / (3600 * 24) % 7)).slice(-2)
  const weeksLeft = Math.floor(timeLeft / (3600 * 24 * 7))

  return {
    secondsLeft,
    minutesLeft,
    hoursLeft,
    daysLeft,
    weeksLeft,
    timeLeft
  }
}

function countDown (deadline, elem, finalMessage) {
  elem = document.getElementById(elem)
  const elemWeeks = elem.querySelector('.weeks')
  const elemDays = elem.querySelector('.days')
  const elemHours = elem.querySelector('.hours')
  const elemMinutes = elem.querySelector('.minutes')
  const elemSeconds = elem.querySelector('.seconds')

  const timerUpdate = setInterval(() => {
    const timeLeft = getTimeLeft(deadline)
    elemWeeks.innerHTML = timeLeft.weeksLeft
    elemDays.innerHTML = timeLeft.daysLeft
    elemHours.innerHTML = timeLeft.hoursLeft
    elemMinutes.innerHTML = timeLeft.minutesLeft
    elemSeconds.innerHTML = timeLeft.secondsLeft

    if (Math.floor(timeLeft.timeLeft) === 0) {
      clearInterval(timerUpdate)
      elem.innerHTML(finalMessage)
    }
  }, 1000)
}

countDown(
  'Dec 24 2023 00:00:00 GMT-0500',
  'clock',
  'Feliz Navidad'
)
