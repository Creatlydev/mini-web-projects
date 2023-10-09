let lastClick = null
// #Elementos
const sidebar = document.getElementById('js-sidebar')
const body = document.querySelector('.js-body')
// const sublists = document.querySelectorAll('.c-sidebar__sublist')

// Seleccionar todos los botones de accordion
const btnAccordions = document.querySelectorAll('.js-accordion-btn')
btnAccordions.forEach((accordionBtn) => {
  accordionBtn.addEventListener('click', () => {
    // Seleccionar el icono de dropdown del boton de accordion (Este icono esta como ultimo hijo)
    const iconDropdown = accordionBtn.lastElementChild

    // Verificar si hay un último clic en un accordionBtn registrado
    if (lastClick) {
      if (lastClick === accordionBtn) {
        // Si se hizo clic en el mismo accordion botón
        if (lastClick.nextElementSibling.style.height === '0px') {
          iconDropdown.classList.add('is-expanded')
        } else {
          iconDropdown.classList.remove('is-expanded')
        }
      } else {
        // Si se hizo clic en un botón diferente
        lastClick.nextElementSibling.style = 'height: 0px;'
        lastClick.lastElementChild.classList.remove('is-expanded')
        iconDropdown.classList.toggle('is-expanded')
      }
    } else {
      // Si no hay un último clic registrado
      iconDropdown.classList.toggle('is-expanded')
    }
    // Asignar el accordionBtn actul como lastClick
    lastClick = accordionBtn

    const sublist = accordionBtn.nextElementSibling
    const height = sublist.clientHeight === 0 ? sublist.scrollHeight : 0
    const marginTop = sublist.clientHeight === 0 ? 0.25 : 0

    // Aplicar estilos al sublist
    sublist.style = `height: ${height}px; margin-top: ${marginTop}rem`

    if (!(sidebar.classList.contains('is-expanded')) && window.innerWidth > 760) {
      sidebar.classList.add('is-expanded')
      body.classList.add('is-translate')
    }
  })
})

// Gestionar estilos al hacer clic en enlaces de la barra lateral
const links = document.querySelectorAll('.c-sidebar__link')
links.forEach((link) => {
  link.addEventListener('click', () => {
    link.classList.add('is-active')
  })
  link.addEventListener('focusout', () => {
    link.classList.remove('is-active')
  })
})

// #ESCUCHAR EL EVENTO RESIZE
window.addEventListener('resize', () => {
  if (window.innerWidth > 760) {
    sidebar.classList.add('is-visible')

    if (sidebar.classList.contains('is-expanded')) {
      sidebar.classList.remove('is-expanded')
      body.classList.remove('is-translate')
    }
  } else {
    sidebar.classList.remove('is-visible')
    body.classList.remove('is-translate')
  }
})

// #Expandir o collapsar Sidebar con el icono controlador
const sidebarIconControl = document.querySelector('.js-sidebar__icon-control')
sidebarIconControl.addEventListener('click', () => {
  sidebar.classList.toggle('is-expanded')
  body.classList.toggle('is-translate')

  btnAccordions.forEach((accordionBtn) => {
    const sublist = accordionBtn.nextElementSibling
    if (sublist.clientHeight !== 0) {
      sublist.style = 'height: 0px; margin-top: 0'

      accordionBtn.lastElementChild.classList.remove('is-expanded')
    }
  })
})

/**
 * ================================
 */
// #Mostrar/ocultar la barra lateral
const menu = document.querySelector('.menu')
menu.addEventListener('click', () => {
  document.querySelector('.c-sidebar').classList.toggle('is-visible')
})
