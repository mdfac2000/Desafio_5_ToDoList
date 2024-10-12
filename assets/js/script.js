const input = document.querySelector('#new-task-input')
const btnAdd = document.querySelector('#new-task-submit')
const lista = document.querySelector('#task-list')
const totalTasks = document.querySelector('#total-count')
const finishedTasks = document.querySelector('#completed-count')

const tasks = []
btnAdd.addEventListener("click", () => {
    const newTask = input.value
    const taskId = Math.floor(Date.now()/1000)%100
    tasks.push({
        id: taskId,
        text: newTask,
        completed: false
    }) 
    input.value = ""

    let html = ""
    for (let task of tasks) {
        html += `<li>
                    <span class="task-id">${task.id}</span>
                    <span class="task-text">${task.text}</span>
                    <input type="checkbox">
                    <button class="delete-btn">✕</button>
                 </li>` 
    }
    lista.innerHTML = html 
    updateTaskCount()
   
})

lista.addEventListener('click', (e) => {
    if (e.target.type === 'checkbox') {
        const taskId = parseInt(e.target.closest('li').querySelector('.task-id').textContent)
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.completed = e.target.checked
            updateTaskCount()
        }
    } else if (e.target.classList.contains('delete-btn')) {
        const taskId = parseInt(e.target.closest('li').querySelector('.task-id').textContent)
        const index = tasks.findIndex(t => t.id === taskId)
        if (index !== -1) {
            tasks.splice(index, 1)
            e.target.closest('li').remove()
            updateTaskCount()
        }
    }
})

function updateTaskCount() {
    totalTasks.textContent = tasks.length
    finishedTasks.textContent = tasks.filter(task => task.completed).length
}