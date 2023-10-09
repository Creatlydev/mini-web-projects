const btnCreateTask = document.querySelector('.js-btn-create-task')
const tasksWrapper = document.querySelector('.tasks-wrapper')
const formToDo = document.querySelector('.js-to-do-form')
const inputNewTask = document.querySelector('.js-input-new-task')

inputNewTask.addEventListener('input', () => {
  inputNewTask.classList.remove('is-invalid')
})

function createTask (event) {
  event.preventDefault()

  if (tasksWrapper.children[0].className === 'empty-state') {
    tasksWrapper.children[0].remove()
  }

  const [isValid, newTaskValue] = isTaskValid()

  if (isValid) {
    tasksWrapper.insertAdjacentHTML(
      'afterbegin',
            `
            <li class="c-task  js-task">
                <span class="c-task__text  u-truncate">${newTaskValue}</span>
                <button class="c-task__icon">
                    <svg width="20" height="20">
                        <use xlink:href="./public/icons.svg#delete" />
                    </svg>
                </button>
            </li>
            `
    )
    formToDo.reset()
    saveInLocalStorage()
  }
}

function isTaskValid () {
  const newTaskValue = inputNewTask.value.trim()
  if (newTaskValue.length > 1) return [true, newTaskValue]
  inputNewTask.classList.add('is-invalid')
  return [false, undefined]
}

function saveInLocalStorage () {
  window.localStorage.setItem(
    'tasks',
    tasksWrapper.innerHTML
  )
}

function isEmptyState () {
  if (tasksWrapper.children.length === 0) {
    tasksWrapper.insertAdjacentHTML(
      'afterbegin',
            `
            <img class='empty-state' src='./public/empty-state.png' alt='Empty state'/>
            `
    )
  }
}

function loadDataLocalStorage () {
  tasksWrapper.insertAdjacentHTML(
    'afterbegin',
    window.localStorage.getItem('tasks')
  )
}

loadDataLocalStorage()

isEmptyState()

btnCreateTask.addEventListener('click', createTask)

// Aplicando event delegation
tasksWrapper.addEventListener('click', (e) => {
  if (e.target.matches('.c-task')) {
    e.target.classList.toggle('is-done')
    saveInLocalStorage()
  } else if (e.target.matches('.c-task__icon')) {
    e.target.parentElement.remove()
    saveInLocalStorage()
    isEmptyState()
  }
})
