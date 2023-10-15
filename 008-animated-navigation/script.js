const iconToggle = document.getElementById('toggle-icon')
const nav = document.getElementById('nav')

iconToggle.addEventListener('click', () => {
  nav.classList.toggle('active')
})
