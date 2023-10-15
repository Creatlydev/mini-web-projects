const hr = document.getElementById('hr')
const mn = document.getElementById('mn')
const sc = document.getElementById('sc')

const elemHours = document.querySelector('.hours')
const elemMinutes = document.querySelector('.minutes')
const elemSeconds = document.querySelector('.seconds')
const elemTimePeriod = document.querySelector('.time-period')

function getCurrentTime () {
  const now = new Date()
  const hours = now.getHours() * 30
  const minutes = now.getMinutes() * 6
  const seconds = now.getSeconds() * 6

  hr.style.transform = `rotate(${hours + (minutes / 12)}deg)`
  mn.style.transform = `rotate(${minutes}deg)`
  sc.style.transform = `rotate(${seconds}deg)`
  return [now.getHours(), now.getMinutes(), now.getSeconds()]
}

function setCurrentTime (hours, minutes, seconds, timePeriod) {
  elemHours.innerHTML = ('0' + hours).slice(-2)
  elemMinutes.innerHTML = ('0' + minutes).slice(-2)
  elemSeconds.innerHTML = ('0' + seconds).slice(-2)
  elemTimePeriod.innerHTML = timePeriod
}

setInterval(() => {
  const [hours, minutes, seconds] = getCurrentTime()
  const timePeriod = hours >= 12 ? 'PM' : 'AM'
  setCurrentTime(
    hours % 12 || 12,
    minutes,
    seconds,
    timePeriod
  )
}, 1000)
